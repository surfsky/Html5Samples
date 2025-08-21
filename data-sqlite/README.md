# SQLite WebAssembly 示例

本目录包含了SQLite WebAssembly的示例代码，演示如何在浏览器中使用SQLite数据库。

## 功能特性

### 基本功能
- ✅ 数据库初始化
- ✅ 创建数据表
- ✅ 插入数据（INSERT）
- ✅ 查询数据（SELECT）
- ✅ 更新数据（UPDATE）
- ✅ 删除数据（DELETE）

### 高级功能
- ✅ 复杂SQL查询
- ✅ 表关联查询（JOIN）
- ✅ 数据统计和聚合
- ✅ 表结构查看
- ✅ 示例数据加载

### 用户界面
- ✅ 响应式设计
- ✅ 表单验证
- ✅ 数据表格显示
- ✅ 实时统计信息
- ✅ SQL查询工具
- ✅ 将sqlite数据库整体保存到indexeddb
- ✅ 从indexeddb加载sqlite数据库

## 使用方法

1. 在项目根目录启动本地服务器
2. 访问 `http://localhost:port/eg-sqlite/sqlite-wasm.html`


## 文件说明

### 2. sqlite-wasm.html
**完整WebAssembly示例**
- 使用真实的SQLite WebAssembly库
- 需要网络连接加载CDN资源
- 包含完整的数据库功能
- 支持复杂的SQL查询和事务操作

### 3. sqliteDb.js
**数据库操作类**
- 封装了SQLite WebAssembly的初始化和操作
- 提供了完整的CRUD操作接口
- 包含用户管理和文章管理功能
- 支持自定义SQL查询执行
- 提供了将sqlite数据库整体保存到indexeddb的方法
- 提供了从indexeddb加载sqlite数据库的方法


## 示例操作

### 1. 用户管理
```sql
-- 添加用户
INSERT INTO users (name, email, age) VALUES ('张三', 'zhangsan@example.com', 25);

-- 查询用户
SELECT * FROM users WHERE age > 20;

-- 更新用户
UPDATE users SET age = 26 WHERE name = '张三';

-- 删除用户
DELETE FROM users WHERE id = 1;
```

### 2. 数据统计
```sql
-- 用户总数
SELECT COUNT(*) FROM users;

-- 平均年龄
SELECT AVG(age) FROM users WHERE age IS NOT NULL;

-- 按年龄分组
SELECT age, COUNT(*) as count FROM users GROUP BY age;
```

### 3. 表结构查询
```sql
-- 查看表结构（SQLite特有）
PRAGMA table_info(users);

-- 查看所有表
SELECT name FROM sqlite_master WHERE type='table';
```

## 技术说明

### SQLite WebAssembly
- **优势**：完整的SQL支持、高性能、无需服务器
- **限制**：数据存储在内存中，刷新页面后数据丢失
- **适用场景**：客户端数据处理、离线应用、原型开发

### 浏览器兼容性
- Chrome 57+
- Firefox 52+
- Safari 11+
- Edge 16+

### 性能考虑
- WebAssembly文件大小约1-2MB
- 首次加载需要下载和编译时间
- 内存使用量取决于数据量大小
- 适合中小型数据集（< 100MB）

## 相关资源

- [SQLite官方文档](https://www.sqlite.org/docs.html)
- [SQLite WebAssembly](https://sqlite.org/wasm/doc/trunk/index.md)
- [WebAssembly MDN文档](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [SQL语法参考](https://www.w3schools.com/sql/)