/**
 * HTML5 示例集合 - 主应用模块
 * 使用 ES6 模块化架构
 */

// 导入菜单数据
import { menuData } from './menudata.js';
import { Utils } from './utils.js';

/*****************************************************************
 * 应用主类
 *****************************************************************/
export class App {
    constructor() {
        this.currentFile = 'about.html';
        this.menuTree = null;
        this.mainSplitPanel = null;
        this.contentTabPanel = null;
        this.init();
    }
    
    /**
     * 初始化应用
     */
    init() {
        // 延迟初始化，等待 SplitPanel 组件渲染完成
        setTimeout(async () => {
            this.initElements();
            await this.renderMenuTree();
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
    }
    
    /**渲染菜单目录树*/
    async renderMenuTree() {
        if (!this.menuTree || !menuData) {
            console.error('菜单树容器或菜单数据未找到');
            return;
        }
        
        // 等待 tree-view 自定义元素注册完成
        await customElements.whenDefined('tree-view');
        
        // 确保控件已完全初始化
        if (typeof this.menuTree.setData !== 'function') {
            console.error('TreeView控件未正确初始化');
            return;
        }
        
        // 使用新的 tree-view 控件
        this.menuTree.setData(menuData);
        this.menuTree.setOnNodeClick((nodeInfo) => {
            this.setActiveNode(nodeInfo.node);
            this.loadFile(nodeInfo.path);
        });
    }
    

    
    /**加载默认内容*/
    async loadDefaultContent() {
        await this.loadFile('about.html');
    }
    
    /**绑定事件*/
    bindEvents() {
        // 窗口大小改变时重新调整布局
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    

    
    /**设置活动节点*/
    setActiveNode(node) {
        // tree-view 控件会自动管理活动状态
        // 这里可以添加额外的逻辑，如果需要的话
        console.log('活动节点已设置:', node);
    }
    
    /** 加载文件*/
    async loadFile(filePath) {
        try {
            this.currentFile = filePath;
            var pageUrl = filePath;
            var codeUrl = `code.html?file=${encodeURIComponent(filePath)}`;
            this.contentTabPanel.items[0].setIframeUrl(pageUrl);
            this.contentTabPanel.items[1].setIframeUrl(codeUrl);
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



// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

