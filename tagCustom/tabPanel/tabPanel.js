/**
 * TabPanel 自定义标签面板组件
 * 支持多标签页切换，可自定义样式和行为
 * 作者：surfsky.github.io
 * Last Update: 2025-01-21
 */
class TabPanel extends HTMLElement {
    option = {
        activeIndex: 0,
        tabPosition: 'top',
        tabColor: '#f5f5f5',
        tabTextColor: '#333',
        activeTabColor: '#017BFF',
        activeTabTextColor: '#fff',
        width: '100%',
        height: '500px',
        closable: false,
        scrollable: true,
        padding: '16px'
    };

    /**支持的属性列表 */
    static get observedAttributes() {
        return ['active-index', 'tab-position', 'tab-color', 'active-tab-color', 'tab-text-color', 'active-tab-text-color', 'width', 'height', 'closable', 'scrollable', 'padding'];
    }

    //------------------------------------------------------
    // 生命周期
    //------------------------------------------------------
    /**构造函数 */
    constructor() {
        super();
        this.option.activeIndex = parseInt(this.getAttribute('active-index')) || this.option.activeIndex;
        this.option.tabPosition = this.getAttribute('tab-position') || this.option.tabPosition;
        this.option.tabColor = this.getAttribute('tab-color') || this.option.tabColor;
        this.option.activeTabColor = this.getAttribute('active-tab-color') || this.option.activeTabColor;
        this.option.tabTextColor = this.getAttribute('tab-text-color') || this.option.tabTextColor;
        this.option.activeTabTextColor = this.getAttribute('active-tab-text-color') || this.option.activeTabTextColor;
        this.option.width = this.getAttribute('width') || this.option.width;
        this.option.height = this.getAttribute('height') || this.option.height;
        this.option.closable = this.getAttribute('closable') === 'true';
        this.option.scrollable = this.getAttribute('scrollable') !== 'false';
        this.option.padding = this.getAttribute('padding') || this.option.padding;
        
        // 绑定事件处理函数
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleTabClose = this.handleTabClose.bind(this);
    }
    
    /**当元素被添加到文档时调用 */
    connectedCallback() {
        console.debug(`render ${this.tagName} when connected`);
        // 延迟渲染，确保DOM完全准备就绪
        setTimeout(() => {
            this.render();
            this.setupEventListeners();
            // 延迟加载激活标签页的内容
            setTimeout(() => {
                this.loadActiveTabContent();
            }, 200);
        }, 50);
    }
    
    /**当元素从文档中移除时调用 */
    disconnectedCallback() {
        this.removeEventListeners();
    }
    
    /**当属性变化时调用 */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateOption(name, newValue);
            if (this.isConnected) {
                this.render();
            }
        }
    }
    
    //------------------------------------------------------
    // 标签页管理
    //------------------------------------------------------
    /**获取所有标签页 */
    getTabs() {
        return Array.from(this.querySelectorAll('tab-item'));
    }

    /**获取当前激活的标签页索引 */
    getActiveIndex() {
        return this.option.activeIndex;
    }

    /**设置激活的标签页 */
    setActiveIndex(index) {
        const tabs = this.getTabs();
        if (index >= 0 && index < tabs.length) {
            this.option.activeIndex = index;
            this.updateTabsDisplay();
            this.dispatchTabChangeEvent(index);
        }
    }

    /**加载激活标签页的内容 */
    loadActiveTabContent() {
        const contents = this.querySelectorAll('.tab-content');
        const activeContent = contents[this.option.activeIndex];
        if (activeContent && activeContent.dataset.lazyContent) {
            activeContent.innerHTML = activeContent.dataset.lazyContent;
            delete activeContent.dataset.lazyContent;
        }
    }

    /**添加新标签页 */
    addTab(title, content, index = -1) {
        const tabItem = document.createElement('tab-item');
        tabItem.setAttribute('title', title);
        tabItem.innerHTML = content;
        
        if (index >= 0 && index < this.children.length) {
            this.insertBefore(tabItem, this.children[index]);
        } else {
            this.appendChild(tabItem);
        }
        
        this.render();
        return tabItem;
    }

    /**移除标签页 */
    removeTab(index) {
        const tabs = this.getTabs();
        if (index >= 0 && index < tabs.length) {
            const tabToRemove = tabs[index];
            
            // 触发关闭事件
            const closeEvent = new CustomEvent('tabClose', {
                detail: { index, tabElement: tabToRemove },
                bubbles: true,
                cancelable: true
            });
            
            if (this.dispatchEvent(closeEvent)) {
                tabToRemove.remove();
                
                // 调整激活索引
                if (this.option.activeIndex >= index) {
                    this.option.activeIndex = Math.max(0, this.option.activeIndex - 1);
                }
                
                this.render();
                return true;
            }
        }
        return false;
    }
    
    //------------------------------------------------------
    // 渲染方法
    //------------------------------------------------------
    /**渲染元素 */
    render() {
        // 设置容器样式
        this.style.display = 'flex';
        this.style.flexDirection = this.getFlexDirection();
        this.style.width = this.option.width;
        this.style.height = this.option.height;
        this.style.boxSizing = 'border-box';
        this.style.overflow = 'hidden';
        
        // 添加样式标签
        this.addStyleTag();
        
        // 渲染标签头和内容
        this.renderTabHeaders();
        this.renderTabContents();
        
        // 更新显示状态
        this.updateTabsDisplay();
    }
    
    /**添加样式标签 */
    addStyleTag() {
        // 检查是否已经添加了样式
        if (document.getElementById('tab-panel-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'tab-panel-styles';
        style.textContent = `
            tab-panel {
                display: flex;
                flex-direction: ${this.getFlexDirection()};
                width: 100%;
                height: 100%;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            /* 隐藏原始的 tab-item 元素 */
            tab-item {
                display: none !important;
            }
            
            .tab-headers {
                display: flex;
                flex-shrink: 0;
                background: ${this.option.tabColor};
                border-bottom: 1px solid #ddd;
                overflow-x: ${this.option.scrollable ? 'auto' : 'hidden'};
                overflow-y: hidden;
            }
            
            .tab-headers.position-top,
            .tab-headers.position-bottom {
                flex-direction: row;
                width: 100%;
            }
            
            .tab-headers.position-bottom {
                border-bottom: none;
                border-top: 1px solid #ddd;
                order: 2;
            }
            
            .tab-headers.position-left {
                flex-direction: column;
                height: 100%;
                border-bottom: none;
                border-right: 1px solid #ddd;
            }
            
            .tab-headers.position-right {
                flex-direction: column;
                height: 100%;
                border-bottom: none;
                border-left: 1px solid #ddd;
                order: 2;
            }
            
            .tab-header {
                padding: 12px 16px;
                cursor: pointer;
                background: ${this.option.tabColor};
                color: ${this.option.tabTextColor};
                border: none;
                border-bottom: 2px solid transparent;
                transition: all 0.2s ease;
                white-space: nowrap;
                display: flex;
                align-items: center;
                gap: 8px;
                min-width: 80px;
                justify-content: center;
            }
            
            .tab-header:hover {
                background: ${this.lightenColor(this.option.activeTabColor, 0.1)};
                color: ${this.option.activeTabTextColor};
            }
            
            .tab-header.active {
                background: ${this.option.activeTabColor};
                color: ${this.option.activeTabTextColor};
                border-bottom-color: ${this.option.activeTabColor};
            }
            
            .tab-close {
                margin-left: 8px;
                padding: 2px 6px;
                border-radius: 50%;
                background: transparent;
                border: none;
                cursor: pointer;
                font-size: 12px;
                opacity: 0.7;
                transition: all 0.2s ease;
            }
            
            .tab-close:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.2);
            }
            
            .tab-contents {
                flex: 1;
                position: relative;
                overflow: hidden;
                height: 100%;
                min-height: 0;
                order: 1;
            }
            
            .tab-contents.position-bottom,
            .tab-contents.position-right {
                order: 1;
            }
            
            .tab-content {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                padding: ${this.option.padding};
                box-sizing: border-box;
                overflow: ${this.option.scrollable ? 'auto' : 'hidden'};
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.2s ease;
            }
            
            .tab-content.active {
                opacity: 1;
                visibility: visible;
            }
            
            /* 响应式设计 */
            @media (max-width: 768px) {
                .tab-header {
                    padding: 8px 12px;
                    min-width: 60px;
                    font-size: 14px;
                }
                
                .tab-content {
                    padding: ${this.option.padding};
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    /**渲染标签头 */
    renderTabHeaders() {
        // 移除现有的标签头容器
        const existingHeaders = this.querySelector('.tab-headers');
        if (existingHeaders) {
            existingHeaders.remove();
        }
        
        const tabs = this.getTabs();
        if (tabs.length === 0) return;
        
        const headersContainer = document.createElement('div');
        headersContainer.className = `tab-headers position-${this.option.tabPosition}`;
        
        tabs.forEach((tab, index) => {
            const header = document.createElement('button');
            header.className = 'tab-header';
            header.textContent = tab.getAttribute('title') || `Tab ${index + 1}`;
            header.dataset.index = index;
            
            // 添加关闭按钮
            if (this.option.closable) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'tab-close';
                closeBtn.innerHTML = '×';
                closeBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.handleTabClose(index);
                };
                header.appendChild(closeBtn);
            }
            
            headersContainer.appendChild(header);
        });
        
        // 根据位置插入标签头
        if (this.option.tabPosition === 'bottom') {
            this.appendChild(headersContainer);
        } else {
            this.insertBefore(headersContainer, this.firstChild);
        }
    }
    
    /**渲染标签内容 */
    renderTabContents() {
        // 移除现有的内容容器
        const existingContents = this.querySelector('.tab-contents');
        if (existingContents) {
            existingContents.remove();
        }
        
        const tabs = this.getTabs();
        if (tabs.length === 0) return;
        
        const contentsContainer = document.createElement('div');
        contentsContainer.className = `tab-contents position-${this.option.tabPosition}`;
        
        tabs.forEach((tab, index) => {
            const content = document.createElement('div');
            content.className = 'tab-content';
            // 获取tab-item的padding属性，如果没有则使用默认值
            const tabPadding = tab.getAttribute('padding') || this.option.padding;
            content.style.padding = tabPadding;
            
            // 检查是否包含iframe，如果是则延迟设置src
            if (tab.innerHTML.includes('<iframe')) {
                // 先设置iframe结构但不设置src
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = tab.innerHTML;
                const iframe = tempDiv.querySelector('iframe');
                if (iframe) {
                    const originalSrc = iframe.getAttribute('src'); // 使用getAttribute获取原始src
                    iframe.removeAttribute('src'); // 移除src属性
                    content.innerHTML = tempDiv.innerHTML;
                    
                    // 延迟设置src，确保DOM准备就绪
                    setTimeout(() => {
                        const newIframe = content.querySelector('iframe');
                        if (newIframe && originalSrc) {
                            newIframe.src = originalSrc;
                        }
                    }, 200); // 增加延迟时间
                } else {
                    content.innerHTML = tab.innerHTML;
                }
            } else {
                // 非iframe内容直接加载
                content.innerHTML = tab.innerHTML;
            }
            
            contentsContainer.appendChild(content);
        });
        
        this.appendChild(contentsContainer);
    }
    
    //------------------------------------------------------
    // 事件处理
    //------------------------------------------------------
    /**设置事件监听器 */
    setupEventListeners() {
        this.addEventListener('click', this.handleTabClick);
    }

    /**移除事件监听器 */
    removeEventListeners() {
        this.removeEventListener('click', this.handleTabClick);
    }
    
    /**处理标签点击事件 */
    handleTabClick(e) {
        const tabHeader = e.target.closest('.tab-header');
        if (tabHeader && !e.target.classList.contains('tab-close')) {
            const index = parseInt(tabHeader.dataset.index);
            this.setActiveIndex(index);
        }
    }
    
    /**处理标签关闭事件 */
    handleTabClose(index) {
        this.removeTab(index);
    }
    
    //------------------------------------------------------
    // 辅助方法
    //------------------------------------------------------
    /**更新选项 */
    updateOption(name, value) {
        const optionMap = {
            'active-index': 'activeIndex',
            'tab-position': 'tabPosition',
            'tab-color': 'tabColor',
            'active-tab-color': 'activeTabColor',
            'tab-text-color': 'tabTextColor',
            'active-tab-text-color': 'activeTabTextColor',
            'padding': 'padding'
        };
        
        const optionKey = optionMap[name] || name;
        if (name === 'active-index') {
            this.option[optionKey] = parseInt(value) || 0;
        } else if (name === 'closable' || name === 'scrollable') {
            this.option[optionKey] = value === 'true';
        } else {
            this.option[optionKey] = value;
        }
    }
    
    /**获取弹性布局方向 */
    getFlexDirection() {
        switch (this.option.tabPosition) {
            case 'top':
            case 'bottom':
                return 'column';
            case 'left':
            case 'right':
                return 'row';
            default:
                return 'column';
        }
    }
    
    /**更新标签页显示状态 */
    updateTabsDisplay() {
        const headers = this.querySelectorAll('.tab-header');
        const contents = this.querySelectorAll('.tab-content');
        
        headers.forEach((header, index) => {
            header.classList.toggle('active', index === this.option.activeIndex);
        });
        
        contents.forEach((content, index) => {
            const isActive = index === this.option.activeIndex;
            content.classList.toggle('active', isActive);
            
            // 如果标签页被激活且有延迟内容，则加载它
            if (isActive && content.dataset.lazyContent) {
                // 使用setTimeout确保DOM更新完成后再加载iframe
                setTimeout(() => {
                    content.innerHTML = content.dataset.lazyContent;
                    delete content.dataset.lazyContent;
                }, 100);
            }
        });
    }
    
    /**触发标签页切换事件 */
    dispatchTabChangeEvent(index) {
        const event = new CustomEvent('tabChange', {
            detail: {
                activeIndex: index,
                previousIndex: this.option.activeIndex,
                tabElement: this.getTabs()[index]
            },
            bubbles: true
        });
        this.dispatchEvent(event);
    }
    
    /**颜色变亮 */
    lightenColor(color, amount) {
        const usePound = color[0] === '#';
        const col = usePound ? color.slice(1) : color;
        const num = parseInt(col, 16);
        let r = (num >> 16) + amount * 255;
        let g = (num >> 8 & 0x00FF) + amount * 255;
        let b = (num & 0x0000FF) + amount * 255;
        r = r > 255 ? 255 : r < 0 ? 0 : r;
        g = g > 255 ? 255 : g < 0 ? 0 : g;
        b = b > 255 ? 255 : b < 0 ? 0 : b;
        return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    }
}

// 注册自定义元素
customElements.define('tab-panel', TabPanel);

// 支持模块导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TabPanel;
}