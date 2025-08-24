/**
 * TreeView 自定义Web组件
 * 基于原index.html中的树结构实现
 */
export class TreeView extends HTMLElement {
    constructor() {
        super();
        this.data = [];
        this.selectedNode = null;
        this.onNodeClick = null;
        this.onNodeToggle = null;
    }

    connectedCallback() {
        this.render();
        this.bindEvents();
    }

    /**
     * 设置树数据
     */
    setData(data) {
        this.data = data;
        this.render();
    }

    /**
     * 获取树数据
     */
    getData() {
        return this.data;
    }

    /**
     * 设置节点点击回调
     */
    setOnNodeClick(callback) {
        this.onNodeClick = callback;
    }

    /**
     * 设置节点切换回调
     */
    setOnNodeToggle(callback) {
        this.onNodeToggle = callback;
    }

    /**
     * 渲染树结构
     */
    render() {
        this.innerHTML = `
            <style>
                .tree {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                .tree-item {
                    margin: 2px 0;
                }
                
                .tree-node {
                    display: flex;
                    align-items: center;
                    padding: 6px 8px;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: background-color 0.2s;
                    user-select: none;
                }
                
                .tree-node:hover {
                    background-color: #f0f0f0;
                }
                
                .tree-node.active {
                    background-color: #e3f2fd;
                    color: #1976d2;
                }
                
                .tree-icon {
                    margin-right: 6px;
                    font-size: 14px;
                    width: 16px;
                    text-align: center;
                }
                
                .tree-label {
                    flex: 1;
                    font-size: 14px;
                }
                
                .tree-children {
                    margin-left: 20px;
                    display: none;
                }
                
                .tree-item.expanded > .tree-children {
                    display: block;
                }
                
                .folder .tree-icon:not(.custom-icon)::before {
                    content: '📁';
                }
                
                .folder.expanded .tree-icon:not(.custom-icon)::before {
                    content: '📂';
                }
                
                .file .tree-icon:not(.custom-icon)::before {
                    content: '📄';
                }
                
                .tree-icon.custom-icon {
                    font-size: 16px;
                }
            </style>
            <div class="tree">
                ${this.buildTreeHtml(this.data)}
            </div>
        `;
    }

    /**
     * 构建树HTML结构
     */
    buildTreeHtml(items, level = 0) {
        if (!items || !Array.isArray(items)) {
            return '';
        }

        return items.map(item => {
            const isFolder = item.children && item.children.length > 0;
            const itemClass = isFolder ? 'folder' : 'file';
            const hasChildren = isFolder ? 'has-children' : '';
            const isExpanded = item.open === true || item.open === 'true';
            const expandedClass = isExpanded ? 'expanded' : '';
            
            // 使用自定义图标或默认图标
            const iconContent = item.icon || (isFolder ? (isExpanded ? '📂' : '📁') : '📄');
            
            let html = `
                <div class="tree-item ${hasChildren} ${expandedClass}" data-level="${level}">
                    <div class="tree-node ${itemClass}" data-path="${item.url || ''}" data-name="${item.name}">
                        <span class="tree-icon custom-icon">${iconContent}</span>
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

    /**
     * 绑定事件
     */
    bindEvents() {
        this.addEventListener('click', (e) => {
            const treeNode = e.target.closest('.tree-node');
            if (!treeNode) return;
            
            const isFolder = treeNode.classList.contains('folder');
            const filePath = treeNode.dataset.path;
            const nodeName = treeNode.dataset.name;
            
            if (isFolder) {
                this.toggleFolder(treeNode.parentElement);
                if (this.onNodeToggle) {
                    this.onNodeToggle({
                        node: treeNode,
                        name: nodeName,
                        path: filePath,
                        expanded: treeNode.parentElement.classList.contains('expanded')
                    });
                }
            } else if (filePath) {
                this.setActiveNode(treeNode);
                if (this.onNodeClick) {
                    this.onNodeClick({
                        node: treeNode,
                        name: nodeName,
                        path: filePath
                    });
                }
            }
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
        this.querySelectorAll('.tree-node.active').forEach(n => {
            n.classList.remove('active');
        });
        
        // 设置当前节点为活动状态
        node.classList.add('active');
        this.selectedNode = node;
    }

    /**
     * 获取当前选中的节点
     */
    getSelectedNode() {
        return this.selectedNode;
    }

    /**
     * 展开所有节点
     */
    expandAll() {
        this.querySelectorAll('.tree-item.has-children').forEach(item => {
            item.classList.add('expanded');
        });
    }

    /**
     * 收起所有节点
     */
    collapseAll() {
        this.querySelectorAll('.tree-item.has-children').forEach(item => {
            item.classList.remove('expanded');
        });
    }

    /**
     * 展开第一个文件夹
     */
    expandFirst() {
        const firstFolder = this.querySelector('.folder');
        if (firstFolder) {
            this.toggleFolder(firstFolder.parentElement);
        }
    }
}

// 注册自定义元素
customElements.define('tree-view', TreeView);