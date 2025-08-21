/**
 * HTML5 示例集合 - 主应用模块
 * 使用 ES6 模块化架构
 */

// 导入菜单数据
import { menuData } from './menudata.js';

/*****************************************************************
 * 应用主类
 *****************************************************************/
class App {
    constructor() {
        this.currentFile = 'about.html';
        this.pageFrame = null;
        this.menuTree = null;
        this.mainSplitPanel = null;
        this.contentTabPanel = null;
        this.codeFrame = null;        
        this.init();
    }
    
    /**
     * 初始化应用
     */
    init() {
        // 延迟初始化，等待 SplitPanel 组件渲染完成
        setTimeout(() => {
            this.initElements();
            this.renderMenuTree();
            this.loadDefaultContent();
            this.bindEvents();
            console.log('🚀 HTML5示例集合已加载');
        }, 100);
    }
    
    /**初始化DOM元素引用*/
    initElements() {
        this.mainSplitPanel = document.getElementById('mainSplitPanel');
        this.contentTabPanel = document.getElementById('contentTabPanel');
        this.menuTree  = document.getElementById('menuTree');
        this.pageFrame = document.getElementById('pageFrame');
        this.codeFrame = document.getElementById('codeFrame');
    }
    
    /**渲染菜单目录树*/
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
    
    /**构建目录树HTML*/
    buildTreeHtml(items, level = 0) {
        return items.map(item => {
            const isFolder = item.children && item.children.length > 0;
            const itemClass = isFolder ? 'folder' : 'file';
            const hasChildren = isFolder ? 'has-children' : '';
            
            let html = `
                <div class="tree-item ${hasChildren}" data-level="${level}">
                    <div class="tree-node ${itemClass}" data-path="${item.url || ''}" data-name="${item.name}">
                        <span class="tree-icon"></span>
                        <span class="tree-label">${item.text || item.name}</span>
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
    
    /**加载默认内容*/
    async loadDefaultContent() {
        await this.loadFile('about.html');
    }
    
    /**绑定事件*/
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
                this.setActiveNode(treeNode);
                this.loadFile(filePath);  //
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
    
    /**切换文件夹展开/收起状态*/
    toggleFolder(folderItem) {
        if (!folderItem.classList.contains('has-children')) return;
        const isExpanded = folderItem.classList.contains('expanded');
        if (isExpanded) {
            folderItem.classList.remove('expanded');
        } else {
            folderItem.classList.add('expanded');
        }
    }
    
    /**设置活动节点*/
    setActiveNode(node) {
        // 移除所有活动状态
        this.menuTree.querySelectorAll('.tree-node.active').forEach(n => {
            n.classList.remove('active');
        });
        
        // 设置当前节点为活动状态
        node.classList.add('active');
    }
    
    /** 加载文件*/
    async loadFile(filePath) {
        try {
            this.currentFile = filePath;

            // 如果codeFrame、pageFrame放在tabPanel中，死活无法刷新页面。
            this.pageFrame.src = `${filePath}?r=${Utils.getRandomInt(1, 1000000)}`;
            this.codeFrame.src = `code.html?file=${encodeURIComponent(filePath)}&r=${Utils.getRandomInt(1, 1000000)}`;
            console.log(`加载文件: ${this.pageFrame.src}`);
            console.log(`加载文件: ${this.codeFrame.src}`);
        } catch (error) {
            console.error('加载文件失败:', error);
            this.showError('加载文件失败: ' + error.message);
        }
    }
    
    /**获取文件名*/
    getFileName(filePath) {
        return filePath.split('/').pop() || filePath;
    }
    
    /*** 显示错误信息*/
    showError(message) {
        this.codeContent.innerHTML = `<div style="color: #f44336; padding: 16px;">${message}</div>`;
    }
    
    /**处理窗口大小改变*/
    handleResize() {
        // 可以在这里添加响应式处理逻辑
        console.log('窗口大小已改变');
    }
    
    /**获取项目统计信息*/
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

/*****************************************************************
 * 工具函数
 *****************************************************************/
class Utils {
    /**随机数 */
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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