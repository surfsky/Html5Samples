/**
 * HTML5 示例集合 - 主应用模块
 * 使用 ES6 模块化架构
 */

// 导入菜单数据
import { menuData } from './menu.js';

/**
 * 应用主类
 */
class App {
    constructor() {
        this.currentFile = 'about.html';
        this.pageFrame = null;
        this.codeContent = null;
        this.codeFileName = null;
        this.menuTree = null;
        this.mainSplitPanel = null;
        this.contentSplitPanel = null;
        
        this.init();
    }
    
    /**
     * 初始化应用
     */
    init() {
        // 延迟初始化，等待 SplitPanel 组件渲染完成
        setTimeout(() => {
            this.initElements();
            this.initSplitPanels();
            this.renderMenuTree();
            this.loadDefaultContent();
            this.bindEvents();
            
            console.log('🚀 HTML5示例集合已加载');
        }, 100);
    }
    
    /**
     * 初始化DOM元素引用
     */
    initElements() {
        // 获取 SplitPanel 组件
        this.mainSplitPanel = document.getElementById('mainSplitPanel');
        this.contentSplitPanel = document.getElementById('contentSplitPanel');
        
        // 在整个文档中查找元素（包括 Shadow DOM）
        this.pageFrame = this.findElementById('pageFrame');
        this.codeContent = this.findElementById('codeContent');
        this.codeFileName = this.findElementById('codeFileName');
        this.menuTree = this.findElementById('menuTree');
    }
    
    /**
     * 在文档中查找元素（包括 Shadow DOM）
     */
    findElementById(id) {
        // 先在普通 DOM 中查找
        let element = document.getElementById(id);
        if (element) return element;
        
        // 在 SplitPanel 的 Shadow DOM 中查找
        const splitPanels = document.querySelectorAll('split-panel');
        for (const panel of splitPanels) {
            if (panel.shadowRoot) {
                // 在 Shadow DOM 中查找
                element = panel.shadowRoot.querySelector(`#${id}`);
                if (element) return element;
                
                // 在 split-panel-item 容器中递归查找
                const items = panel.shadowRoot.querySelectorAll('.split-panel-item');
                for (const item of items) {
                    element = item.querySelector(`#${id}`);
                    if (element) return element;
                    
                    // 递归查找嵌套的 SplitPanel
                    const nestedPanels = item.querySelectorAll('split-panel');
                    for (const nestedPanel of nestedPanels) {
                        if (nestedPanel.shadowRoot) {
                            element = nestedPanel.shadowRoot.querySelector(`#${id}`);
                            if (element) return element;
                            
                            const nestedItems = nestedPanel.shadowRoot.querySelectorAll('.split-panel-item');
                            for (const nestedItem of nestedItems) {
                                element = nestedItem.querySelector(`#${id}`);
                                if (element) return element;
                            }
                        }
                    }
                }
            }
        }
        
        return null;
    }
    
    /**
     * 初始化SplitPanel组件
     */
    initSplitPanels() {
        // 设置主分隔面板初始大小
        if (this.mainSplitPanel) {
            // 左侧目录树初始宽度300px
            setTimeout(() => {
                this.mainSplitPanel.setItemSize(0, '300px');
            }, 100);
        }
        
        // 设置内容分隔面板初始大小
        if (this.contentSplitPanel) {
            // 上方页面区域初始占65%
            setTimeout(() => {
                this.contentSplitPanel.setItemSize(0, '65%');
            }, 100);
        }
    }
    
    /**
     * 渲染菜单目录树
     */
    renderMenuTree() {
        if (!this.menuTree || !menuData) {
            console.error('菜单树容器或菜单数据未找到');
            return;
        }
        
        const treeHtml = this.buildTreeHtml(menuData);
        this.menuTree.innerHTML = treeHtml;
        
        // 默认展开第一个文件夹
        setTimeout(() => {
            const firstFolder = this.menuTree.querySelector('.folder');
            if (firstFolder) {
                this.toggleFolder(firstFolder);
            }
        }, 100);
    }
    
    /**
     * 构建目录树HTML
     */
    buildTreeHtml(items, level = 0) {
        return items.map(item => {
            const isFolder = item.children && item.children.length > 0;
            const itemClass = isFolder ? 'folder' : 'file';
            const hasChildren = isFolder ? 'has-children' : '';
            
            let html = `
                <div class="tree-item ${hasChildren}" data-level="${level}">
                    <div class="tree-node ${itemClass}" data-path="${item.path || ''}" data-name="${item.name}">
                        <span class="tree-icon"></span>
                        <span class="tree-label">${item.name}</span>
                    </div>
            `;
            
            if (isFolder && item.children) {
                html += `
                    <div class="tree-children">
                        ${this.buildTreeHtml(item.children, level + 1)}
                    </div>
                `;
            }
            
            html += '</div>';
            return html;
        }).join('');
    }
    
    /**
     * 加载默认内容
     */
    async loadDefaultContent() {
        await this.loadFile('about.html');
    }
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 目录树点击事件
        this.menuTree.addEventListener('click', (e) => {
            const treeNode = e.target.closest('.tree-node');
            if (!treeNode) return;
            
            const isFolder = treeNode.classList.contains('folder');
            const filePath = treeNode.dataset.path;
            
            if (isFolder) {
                this.toggleFolder(treeNode.parentElement);
            } else if (filePath) {
                this.loadFile(filePath);
                this.setActiveNode(treeNode);
            }
        });
        
        // 监听iframe加载完成事件
        this.pageFrame.addEventListener('load', () => {
            console.log(`页面已加载: ${this.currentFile}`);
        });
        
        // 窗口大小改变时重新调整布局
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    /**
     * 切换文件夹展开/收起状态
     */
    toggleFolder(folderItem) {
        if (!folderItem.classList.contains('has-children')) return;
        
        const isExpanded = folderItem.classList.contains('expanded');
        
        if (isExpanded) {
            folderItem.classList.remove('expanded');
        } else {
            folderItem.classList.add('expanded');
        }
    }
    
    /**
     * 设置活动节点
     */
    setActiveNode(node) {
        // 移除所有活动状态
        this.menuTree.querySelectorAll('.tree-node.active').forEach(n => {
            n.classList.remove('active');
        });
        
        // 设置当前节点为活动状态
        node.classList.add('active');
    }
    
    /**
     * 加载文件
     */
    async loadFile(filePath) {
        try {
            this.currentFile = filePath;
            
            // 更新页面显示
            this.pageFrame.src = filePath;
            
            // 更新代码显示
            await this.loadSourceCode(filePath);
            
            // 更新文件名显示
            this.codeFileName.textContent = this.getFileName(filePath);
            
        } catch (error) {
            console.error('加载文件失败:', error);
            this.showError('加载文件失败: ' + error.message);
        }
    }
    
    /**
     * 加载源代码
     */
    async loadSourceCode(filePath) {
        try {
            this.codeContent.innerHTML = '<div class="loading">加载源代码中...</div>';
            
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const sourceCode = await response.text();
            this.displaySourceCode(sourceCode);
            
        } catch (error) {
            console.error('加载源代码失败:', error);
            this.codeContent.innerHTML = `<div style="color: #f44336; padding: 16px;">加载源代码失败: ${error.message}</div>`;
        }
    }
    
    /**
     * 显示源代码
     */
    displaySourceCode(code) {
        // 简单的HTML转义
        const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        
        this.codeContent.innerHTML = escapedCode;
    }
    
    /**
     * 获取文件名
     */
    getFileName(filePath) {
        return filePath.split('/').pop() || filePath;
    }
    
    /**
     * 显示错误信息
     */
    showError(message) {
        this.codeContent.innerHTML = `<div style="color: #f44336; padding: 16px;">${message}</div>`;
    }
    
    /**
     * 处理窗口大小改变
     */
    handleResize() {
        // 可以在这里添加响应式处理逻辑
        console.log('窗口大小已改变');
    }
    
    /**
     * 获取项目统计信息
     */
    getProjectStats() {
        const countItems = (items) => {
            let folders = 0;
            let files = 0;
            
            items.forEach(item => {
                if (item.children && item.children.length > 0) {
                    folders++;
                    const childStats = countItems(item.children);
                    folders += childStats.folders;
                    files += childStats.files;
                } else {
                    files++;
                }
            });
            
            return { folders, files };
        };
        
        return countItems(menuData || []);
    }
}

/**
 * 工具函数
 */
class Utils {
    /**
     * 防抖函数
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * 节流函数
     */
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

// 导出供其他模块使用
export { App, Utils };