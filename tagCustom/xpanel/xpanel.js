/**
 * XPanel - 通用面板组件
 * 支持普通HTML内容和iframe显示
 */
class XPanel extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.iframe = null;
        this.toggleBtn = null;
        this.options = {
            title: 'XPanel',
            width: '100%',
            height: '400px',
            border: '1px solid #ddd',
            radius: '8px',
            expandable: false,
            expand: true,
            iframeurl: ''
        };
    }

    connectedCallback() {
        this.initOptions();
        this.render();
        this.setupEvents();
    }

    /**初始化配置选项 */
    initOptions() {
        this.options.title = this.getAttribute('title') || 'XPanel';
        this.options.width = this.getAttribute('width') || '100%';
        this.options.height = this.getAttribute('height') || '400px';
        this.options.border = this.getAttribute('border') || '1px solid #ddd';
        this.options.radius = this.getAttribute('radius') || '8px';
        this.options.expandable = this.hasAttribute('expandable');
        this.options.expand = this.getAttribute('expand') !== 'false';
        this.options.iframeurl = this.getAttribute('iframeurl') || '';
    }

    static get observedAttributes() {
        return ['title', 'width', 'height', 'border', 'radius', 'expandable', 'expand', 'iframeurl'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.initOptions();
            this.render();
            this.setupEvents();
        }
    }

    /**渲染组件 */
    render() {
        const hasIframe = this.options.iframeurl;
        this.shadow.innerHTML = `
            <div class="xpanel" style="width: ${this.options.width}; border: ${this.options.border}; border-radius: ${this.options.radius}; height: ${this.options.height};">
                <div class="xpanel-header" style='border-radius: ${this.options.radius}  ${this.options.radius} 0 0;'>
                    <h3 class="xpanel-title">${this.options.title}</h3>
                    ${this.options.expandable ? `
                        <button class="xpanel-toggle ${this.options.expand ? 'expanded' : 'collapsed'}">
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    ` : ''}
                </div>
                <div class="xpanel-content ${this.options.expandable && !this.options.expand ? 'collapsed' : ''}">
                    ${hasIframe ? 
                        `<iframe src="${this.options.iframeurl}" frameborder="0"></iframe>` :
                        `<div class="xpanel-body"><slot></slot></div>`
                    }
                </div>
            </div>
        `;
        
        if (hasIframe) {
            this.iframe = this.shadow.querySelector('iframe');
        }
        
        this.toggleBtn = this.shadow.querySelector('.xpanel-toggle');
        
        const panel = this.shadow.querySelector('.xpanel');
        const header = this.shadow.querySelector('.xpanel-header');
        const content = this.shadow.querySelector('.xpanel-content');
        const headerHeight = header.offsetHeight;
        
        if (this.options.expand) {
            panel.style.height = `calc(${this.options.height} + ${headerHeight}px)`;
            content.style.maxHeight = '100%';
        } else {
            panel.style.height = `${headerHeight}px`;
            content.style.maxHeight = '0px';
        }
        
        this.addStyles();
    }

    addStyles() {
        if (this.shadow.querySelector('#xpanel-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'xpanel-styles';
        style.textContent = `
            .xpanel {
                background: white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                transition: all 0.3s ease;
            }
            
            .xpanel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid #eee;
                background: #f8f9fa;
                flex-shrink: 0;
            }
            
            .xpanel-title {
                margin: 0;
                color: #333;
                font-size: 16px;
                font-weight: 600;
            }
            
            .xpanel-toggle {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                color: #666;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .xpanel-toggle:hover {
                background: #e9ecef;
                color: #333;
            }
            
            .xpanel-toggle svg {
                transition: transform 0.3s ease;
            }
            
            .xpanel-toggle.collapsed svg {
                transform: rotate(-90deg);
            }
            
            .xpanel-content {
                flex: 1;
                overflow: hidden;
                transition: max-height 0.3s ease;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                min-height: 0;
                max-height: 100%;
            }
            
            .xpanel-content.collapsed {
                max-height: 0;
                overflow: hidden;
            }
            
            .xpanel-body {
                padding: 16px;
                overflow: auto;
                box-sizing: border-box;
                flex: 1;
                min-height: 0;
            }
            
            .xpanel iframe {
                width: 100%;
                border: none;
                display: block;
                flex: 1;
                min-height: 0;
            }
        `;
        this.shadow.appendChild(style);
    }

    setupEvents() {
        if (!this.options.expandable) return;
        
        if (this.toggleBtn) {
            // 移除旧的事件监听器以防止重复
            this.toggleBtn.removeEventListener('click', this.toggleBound);
        }
        
        this.toggleBound = this.toggle.bind(this);
        this.toggleBtn.addEventListener('click', this.toggleBound);
    }

    toggle() {
        this.options.expand = !this.options.expand;
        this.setAttribute('expand', this.options.expand ? 'true' : 'false');
        
        const content = this.shadow.querySelector('.xpanel-content');
        const panel = this.shadow.querySelector('.xpanel');
        const header = this.shadow.querySelector('.xpanel-header');
        const headerHeight = header.offsetHeight;
        const fullHeight = `calc(${this.options.height} + ${headerHeight}px)`;
        
        if (this.toggleBtn) {
            this.toggleBtn.className = `xpanel-toggle ${this.options.expand ? 'expanded' : 'collapsed'}`;
        }
        
        if (content && panel) {
            if (this.options.expand) {
                content.classList.remove('collapsed');
                content.style.maxHeight = '0px';
                panel.style.height = `${headerHeight}px`;
                content.offsetHeight; // force reflow
                
                const performExpand = () => {
                    const targetMaxHeight = content.scrollHeight + 'px';
                    content.style.maxHeight = targetMaxHeight;
                    panel.style.height = fullHeight;
                    setTimeout(() => {
                        content.style.maxHeight = '100%';
                        panel.style.height = fullHeight;
                    }, 300);
                };
                
                if (this.iframe && !this.iframe.complete) {
                    this.iframe.addEventListener('load', performExpand, {once: true});
                } else {
                    setTimeout(performExpand, 10);
                }
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                panel.style.height = panel.offsetHeight + 'px';
                content.offsetHeight; // force reflow
                setTimeout(() => {
                    content.style.maxHeight = '0px';
                    panel.style.height = `${headerHeight}px`;
                    content.classList.add('collapsed');
                }, 10);
            }
        }
        
        // 触发事件
        this.dispatchEvent(new CustomEvent('toggle', {
            detail: { expanded: this.options.expand }
        }));
    }

    //------------------------------------------------------
    // 公共方法
    //------------------------------------------------------
    /**设置选项 */
    setOptions(options) {
        Object.assign(this.options, options);
        Object.keys(options).forEach(key => {
            if (options[key] !== undefined) {
                this.setAttribute(key, options[key]);
            }
        });
    }
    
    /**获取选项 */
    getOptions() {
        return { ...this.options };
    }
    
    /**设置内容 */
    setContent(html) {
        this.options.iframeurl = '';
        this.removeAttribute('iframeurl');
        this.innerHTML = html;
    }
    
    /**设置iframe URL */
    setIframeUrl(url) {
        this.options.iframeurl = url;
        this.setAttribute('iframeurl', url);
        this.render();
    }
    
    /**刷新iframe */
    refreshIframe() {
        if (this.iframe) {
            this.iframe.src = this.iframe.src;
        }
    }
}

// 注册自定义元素
customElements.define('x-panel', XPanel);

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = XPanel;
}