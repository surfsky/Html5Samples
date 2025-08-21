/**
 * SQLite WebAssembly Database Manager
 * 提供SQLite数据库的初始化和CRUD操作
 */
class SqliteDb {
    constructor() {
        this.db = null;
        this.sqlite3 = null;
        this.isReady = false;
    }

    /**初始化SQLite WebAssembly */
    async init() {
        try {
            // 动态导入SQLite WebAssembly模块
            const sqlite3InitModule = (await import('https://unpkg.com/@sqlite.org/sqlite-wasm')).default;
            this.sqlite3 = await sqlite3InitModule();
            
            // 尝试从IndexedDB加载数据库
            const savedDb = await this.loadFromIndexedDB();
            
            if (savedDb) {
                // 从保存的数据创建数据库
                this.db = new this.sqlite3.oo1.DB();
                const p = this.sqlite3.wasm.allocFromTypedArray(savedDb);
                const rc = this.sqlite3.capi.sqlite3_deserialize(
                    this.db.pointer, 'main', p, savedDb.length, savedDb.length,
                    this.sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE
                );
                this.db.checkRc(rc);
                console.log('Database loaded from IndexedDB');
            } else {
                // 创建新的内存数据库
                this.db = new this.sqlite3.oo1.DB();
                // 创建示例表
                this.createTables();
                console.log('New database created');
            }
            
            this.isReady = true;
            console.log('SQLite WebAssembly initialized successfully');
            return true;
        } catch (error) {
            console.error('Failed to initialize SQLite:', error);
            return false;
        }
    }

    /**创建数据表 */
    createTables() {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                age INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        this.db.exec(sql);
    }

    /**插入用户 */
    insertUser(name, email, age) {
        if (!this.isReady) throw new Error('Database not initialized');
        

        
        const stmt = this.db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)');
        
        try {
            // 使用数组形式绑定参数
            stmt.bind([name, email, age]);
            
            const result = stmt.step();
            
            // 对于INSERT语句，step()返回false表示操作完成（正常情况）
            if (result === false) {
                return this.db.changes();
            } else {
                throw new Error(`Failed to insert user: ${result}`);
            }
        } catch (error) {
            throw new Error(`插入用户失败: ${error.message}`);
        } finally {
            stmt.finalize();
        }
    }

    /**获取所有用户 */
    getUsers() {
        if (!this.isReady) throw new Error('Database not initialized');
        
        const users = [];
        this.db.exec({
            sql: 'SELECT * FROM users ORDER BY created_at DESC',
            callback: (row) => {
                users.push({
                    id: row[0],
                    name: row[1],
                    email: row[2],
                    age: row[3],
                    created_at: row[4]
                });
            }
        });
        
        return users;
    }

    /**根据ID获取用户 */
    getUserById(id) {
        if (!this.isReady) throw new Error('Database not initialized');
        
        const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
        const result = stmt.get(id);
        stmt.finalize();
        
        return result ? {
            id: result[0],
            name: result[1],
            email: result[2],
            age: result[3],
            created_at: result[4]
        } : null;
    }

    /**更新用户 */
    updateUser(id, name, email, age) {
        if (!this.isReady) throw new Error('Database not initialized');
        
        const stmt = this.db.prepare('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?');
        stmt.bind([name, email, age, id]);
        const result = stmt.step();
        stmt.finalize();
        
        if (result !== this.sqlite3.SQLITE_DONE) {
            throw new Error('Failed to update user');
        }
        
        return this.db.changes();
    }

    /**删除用户 */
    deleteUser(id) {
        if (!this.isReady) throw new Error('Database not initialized');
        
        const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
        stmt.bind([id]);
        const result = stmt.step();
        stmt.finalize();
        
        if (result !== this.sqlite3.SQLITE_DONE) {
            throw new Error('Failed to delete user');
        }
        
        return this.db.changes();
    }





    /**执行自定义SQL查询 */
    executeQuery(sql, params = []) {
        if (!this.isReady) throw new Error('Database not initialized');
        
        const results = [];
        
        if (params.length > 0) {
            const stmt = this.db.prepare(sql);
            while (stmt.step()) {
                results.push(stmt.get());
            }
            stmt.finalize();
        } else {
            this.db.exec({
                sql: sql,
                callback: (row) => {
                    results.push(row);
                }
            });
        }
        
        return results;
    }

    /**获取数据库统计信息 */
    getStats() {
        if (!this.isReady) throw new Error('Database not initialized');
        
        const userCount = this.db.selectValue('SELECT COUNT(*) FROM users');
        
        return {
            users: userCount
        };
    }

    /**保存数据库到IndexedDB */
    async saveToIndexedDB() {
        if (!this.isReady) throw new Error('Database not initialized');
        
        try {
            // 获取数据库的二进制数据
            const dbData = this.sqlite3.capi.sqlite3_js_db_export(this.db);
            
            // 打开IndexedDB
            const db = await this.openIndexedDB();
            const transaction = db.transaction(['databases'], 'readwrite');
            const store = transaction.objectStore('databases');
            
            // 保存数据库数据
            await new Promise((resolve, reject) => {
                const request = store.put({
                    id: 'sqlite_db',
                    data: dbData,
                    timestamp: Date.now()
                });
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
            
            console.log('Database saved to IndexedDB');
            return true;
        } catch (error) {
            console.error('Failed to save database to IndexedDB:', error);
            return false;
        }
    }
    
    /**从IndexedDB加载数据库 */
    async loadFromIndexedDB() {
        try {
            const db = await this.openIndexedDB();
            const transaction = db.transaction(['databases'], 'readonly');
            const store = transaction.objectStore('databases');
            
            return new Promise((resolve, reject) => {
                const request = store.get('sqlite_db');
                request.onsuccess = () => {
                    const result = request.result;
                    if (result && result.data) {
                        resolve(result.data);
                    } else {
                        resolve(null);
                    }
                };
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Failed to load database from IndexedDB:', error);
            return null;
        }
    }
    
    /**打开IndexedDB连接 */
    async openIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('SQLiteDB', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('databases')) {
                    db.createObjectStore('databases', { keyPath: 'id' });
                }
            };
        });
    }
    
    /**关闭数据库连接 */
    close() {
        if (this.db) {
            this.db.close();
            this.db = null;
            this.isReady = false;
        }
    }
}

// 导出类
window.SqliteDb = SqliteDb;