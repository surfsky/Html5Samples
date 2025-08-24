/**
 * SimplePanel - 简单的面板组件，支持内置iframe
 */
class SimplePanel extends HTMLElement {
    constructor() {
        super();
        this.iframe = null;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    /**渲染组件 */
    render() {
        this.innerHTML = `
            <div class="simple-panel">
                <div class="panel-header">
                    <h3>Simple Panel with iFrame</h3>
                    <div class="controls">
                        <button id="btn-demo1">加载Demo1</button>
                        <button id="btn-demo2">加载Demo2</button>
                        <button id="btn-about">加载About</button>
                    </div>
                </div>
                <div class="panel-content">
                    <iframe id="panel-iframe" src="demo1.html" frameborder="0" width="100%" height="400px" style="border: 1px solid #ccc;"></iframe>
                </div>
            </div>
        `;
        
        this.iframe = this.querySelector('#panel-iframe');
        this.addStyles();
    }

    /**添加样式 */
    addStyles() {
        if (document.querySelector('#simple-panel-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'simple-panel-styles';
        style.textContent = `
            .simple-panel {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 16px;
                background: white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            
            .panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid #eee;
            }
            
            .panel-header h3 {
                margin: 0;
                color: #333;
            }
            
            .controls button {
                background: #007bff;
                color: white;
                border: none;
                padding: 8px 16px;
                margin: 0 4px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s;
            }
            
            .controls button:hover {
                background: #0056b3;
            }
            
            .controls button:active {
                background: #004085;
            }
            
            .panel-content {
                position: relative;
            }
            
            #panel-iframe {
                display: block;
                width: 100%;
                min-height: 400px;
            }
        `;
        document.head.appendChild(style);
    }

    /**设置事件监听器 */
    setupEventListeners() {
        const btnDemo1 = this.querySelector('#btn-demo1');
        const btnDemo2 = this.querySelector('#btn-demo2');
        const btnAbout = this.querySelector('#btn-about');
        
        if (btnDemo1) {
            btnDemo1.addEventListener('click', () => this.changeIframeUrl('demo1.html'));
        }
        
        if (btnDemo2) {
            btnDemo2.addEventListener('click', () => this.changeIframeUrl('demo2.html'));
        }
        
        if (btnAbout) {
            btnAbout.addEventListener('click', () => this.changeIframeUrl('../../../about.html'));
        }
    }

    /**修改iframe的URL */
    changeIframeUrl(url) {
        if (this.iframe) {
            console.log('修改iframe URL到:', url);
            this.iframe.src = url;
            console.log('iframe元素:', this.iframe);
            console.log('当前src:', this.iframe.src);
        } else {
            console.error('未找到iframe元素');
        }
    }

    /**获取当前iframe的URL */
    getCurrentUrl() {
        return this.iframe ? this.iframe.src : null;
    }
}

// 注册自定义元素
customElements.define('simple-panel', SimplePanel);

// 导出模块（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimplePanel;
}