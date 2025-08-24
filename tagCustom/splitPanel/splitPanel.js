
/**
 * SplitPanel 自定义容器标签
 * 支持可拖拽的分隔条，动态调整子元素大小
 * 作者：surfsky.github.io
 * Last Update: 2025-08-21
 */
class SplitPanel extends HTMLElement {
    option = {
        direction: 'horizontal',
        splitterSize: 4,
        splitterColor: '#dddddda0',
        splitterHoverColor: '#017BFF',
        width: '100%',
        height: '100%',
        resizable: true,
        sizes: '',
    };

    /**支持的属性列表 */
    static get observedAttributes() {
        return ['direction', 'splitter-color', 'splitter-hover-color', 'width', 'height', 'sizes', 'resizable'];
    }

    //------------------------------------------------------
    // 生命周期
    //------------------------------------------------------
    /**构造函数 */
    constructor() {
        super();
        this.option.direction          = this.getAttribute('direction') ?? this.option.direction;
        this.option.splitterSize       = this.getAttribute('splitter-size') ?? this.option.splitterSize;
        this.option.splitterColor      = this.getAttribute('splitter-color') ?? this.option.splitterColor;
        this.option.splitterHoverColor = this.getAttribute('splitter-hover-color') ?? this.option.splitterHoverColor;
        this.option.width              = this.getAttribute('width') ?? this.option.width;
        this.option.height             = this.getAttribute('height') ?? this.option.height;
        this.option.resizable          = this.getAttribute('resizable') ?? this.option.resizable;
        this.option.sizes              = this.getAttribute('sizes') ?? this.option.sizes;
        
        // 拖拽状态
        this.isDragging = false;
        this.currentSplitter = null;
        this.startPos = 0;
        this.startSizes = [];
        
        // 绑定事件处理函数
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp   = this.handleMouseUp.bind(this);
        this.handleResize    = this.handleResize.bind(this);
    }
    
    /**当元素被添加到文档时调用 */
    connectedCallback() {
        console.debug(`render ${this.tagName} when connected`);
        this.render();
        this.setupEventListeners();
    }
    
    /**当元素从文档中移除时调用 */
    disconnectedCallback() {
        this.removeEventListeners();
    }
    
    
    //------------------------------------------------------
    // 尺寸相关
    //------------------------------------------------------
    /**获取尺寸数组 */
    getSizes() {
        const sizesAttr = this.option.sizes;
        return sizesAttr ? sizesAttr.split(',').map(size => size.trim()) : [];
    }

    
    /**获取所有子元素的当前实际像素大小 */
    getItemSizes() {
        const items = this.querySelectorAll('.split-panel-item');
        const isHorizontal = this.option.direction === 'horizontal';
        
        return Array.from(items).map(item => {
            return isHorizontal ? item.offsetWidth : item.offsetHeight;
        });
    }

    /**获取指定索引的子元素大小 */
    getItemSize(index){
        var sizes = this.getItemSizes();
        return sizes[index];
    }


    /**Set item sizes
     * @param {string} sizes - 子元素大小，逗号分隔
     */ 
    setSizes(sizes) {
        this.option.sizes = sizes;
        this.render();
    }

    /**Set resizable
     * @param {boolean} resizable - 是否可调整大小
     */
    setResizable(resizable) {
        this.option.resizable = resizable;
        //this.render();

        // 遍历所有分隔条，设置是否可调整大小
        const splitters = this.querySelectorAll('.splitter');
        splitters.forEach(splitter => {
            splitter.style.cursor = resizable ? 'col-resize' : 'default';
        });
    }

    /**设置分隔条颜色
     * @param {number} size - 分隔条大小
     * @param {string} color - 分隔条颜色
     * @param {string} hoverColor - 分隔条悬停颜色
     */
    setSplitterStyle(size, color, hoverColor) {
        this.option.splitterSize = size;
        this.option.splitterColor = color;
        this.option.splitterHoverColor = hoverColor;
        this.render();
    }

    
    //------------------------------------------------------
    // 渲染方法
    //------------------------------------------------------
    /**渲染元素 */
    render() {
        const isHorizontal = this.option.direction === 'horizontal';
        const flexDirection = isHorizontal ? 'row' : 'column';

        // 设置容器样式
        this.style.display = 'flex';
        this.style.flexDirection = flexDirection;
        this.style.width = this.option.width;
        this.style.height = this.option.height;
        this.style.boxSizing = 'border-box';
        this.style.overflow = 'hidden';
        
        // 添加样式标签控制子元素、渲染子元素
        this.renderStyleTag();
        this.renderChildren();
    }
    
    /**添加子元素样式标签 */
    renderStyleTag() {
        // 检查是否已经添加了样式
        if (document.getElementById('split-panel-styles')) return;
        
        // 子元素样式
        const style = document.createElement('style');
        style.id = 'split-panel-styles';
        style.textContent = `
            split-panel {
                display: flex;
                width: 100%;
                height: 100%;
            }
            
            .split-panel-item {
                flex: 1;
                min-width: 50px;
                min-height: 50px;
                overflow: auto;
                box-sizing: border-box;
            }
            
            .split-panel-item.with-animation {
                transition: width 0.3s ease, height 0.3s ease;
            }

            .splitter           {background: ${this.option.splitterColor};}
            .splitter:hover     {background: ${this.option.splitterHoverColor};}
            .splitter.dragging  {background: ${this.option.splitterHoverColor};}
                        
            /* 水平分隔条样式 */
            .splitter.horizontal {
                cursor: col-resize;
                position: relative;
                transition: background-color 0.2s;
                flex-shrink: 0;
                width: ${this.option.splitterSize}px;
                min-width: 0px;
            }
            
            /* 垂直分隔条样式 */
            .splitter.vertical {
                cursor: row-resize;
                position: relative;
                transition: background-color 0.2s;
                flex-shrink: 0;
                height: ${this.option.splitterSize}px;
                min-height: 0px;
                width: 100%;
            }
            
            /* 响应式设计 */
            @media (max-width: 768px) {
                split-panel {
                    flex-direction: column !important;
                }
                .splitter {
                    cursor: row-resize !important;
                    width: 100% !important;
                    height: ${this.option.splitterSize}px !important;
                    min-height: ${this.option.splitterSize}px !important;
                }
                .splitter::after {
                    width: 20px !important;
                    height: 2px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    /**渲染子元素 */
    renderChildren() {
        const isHorizontal = this.option.direction === 'horizontal';
        const showSplitters = this.option.resizable;

        // 清除现有的包装元素和分隔条, 将子元素移回原位置
        const existingElements = this.querySelectorAll('.split-panel-item, .splitter');
        existingElements.forEach(el => {
            if (el.classList.contains('split-panel-item') && el.firstChild) {
                this.appendChild(el.firstChild);
            }
            el.remove();
        });

        // 重新获取子元素（排除包装元素、分隔条和所有非元素节点）
        const realChildren = Array.from(this.children).filter(child => {
            if (child.nodeName == 'STYLE') return false;
            if (child.nodeType !== Node.ELEMENT_NODE) return false;
            return !child.classList.contains('split-panel-item') && !child.classList.contains('splitter');
        });
        
        // 渲染子元素
        realChildren.forEach((child, index) => {
            // 创建子包装容器（是否有必要？）
            const wrapper = document.createElement('div');
            wrapper.className = 'split-panel-item';
            wrapper.appendChild(child);  // 直接移动原始元素而不是克隆，避免重复加载
            this.appendChild(wrapper);
            
            // 添加分隔条
            if (showSplitters && index < realChildren.length - 1) {
                const splitter = document.createElement('div');
                splitter.className = `splitter ${isHorizontal ? 'horizontal' : 'vertical'}`;
                splitter.dataset.index = index;
                
                // 添加点击事件监听器
                const clickHandler = (e) => {
                    if (!this.isDragging) {
                        const event = new CustomEvent('splitterClick', {
                            detail: {
                                splitterIndex: index,
                                leftPanelIndex: index,
                                rightPanelIndex: index + 1,
                                splitterElement: splitter
                            },
                            bubbles: true
                        });
                        this.dispatchEvent(event);
                    }
                };
                splitter.addEventListener('click', clickHandler.bind(this));
                this.appendChild(splitter);
            }
        });

        this.setChildrenSizes();
    }
    
    
    //------------------------------------------------------
    // 事件处理
    //------------------------------------------------------
    /**设置事件监听器 */
    setupEventListeners() {
        this.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('resize', this.handleResize);
    }

    /**移除事件监听器 */
    removeEventListeners() {
        this.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('resize', this.handleResize);
    }
    
    /**处理鼠标按下事件 */
    handleMouseDown(e) {
        if (!e.target.classList.contains('splitter') || !this.option.resizable) return;
        
        e.preventDefault();
        const isHorizontal = this.option.direction === 'horizontal';
        this.isDragging = false; // 初始化拖拽标志
        this.currentSplitter = e.target;
        this.currentSplitter.classList.add('dragging');        
        this.startPos = isHorizontal ? e.clientX : e.clientY;
        
        // 记录当前所有子元素的大小
        this.recordCurrentSizes();
        
        // 禁用文本选择
        document.body.style.userSelect = 'none';
        document.body.classList.add('no-select');
    }
    
    handleMouseMove(e) {
        if (!this.currentSplitter) return;
        this.isDragging = true; // 标记正在拖拽
        e.preventDefault();
        
        const isHorizontal = this.option.direction === 'horizontal';
        const currentPos = isHorizontal ? e.clientX : e.clientY;
        const delta = currentPos - this.startPos;
        this.updateSizes(delta);
    }
    
    handleMouseUp(e) {
        if (!this.currentSplitter) return;
        if (this.currentSplitter) {
            this.currentSplitter.classList.remove('dragging');
            this.currentSplitter = null;
        }
        
        // 恢复文本选择
        document.body.style.userSelect = '';
        document.body.classList.remove('no-select');
        
        // 延迟重置拖拽标志，避免立即触发点击事件
        setTimeout(() => {
            this.isDragging = false;
        }, 10);
    }
    
    handleResize() {
        // 响应式处理：在小屏幕上强制垂直布局
        if (window.innerWidth <= 768) {
            this.style.flexDirection = 'column';
        } else {
            this.style.flexDirection = this.option.direction === 'horizontal' ? 'row' : 'column';
        }
    }
    
    //------------------------------------------------------
    // 大小调整逻辑
    //------------------------------------------------------
    /**记录当前所有子元素的大小 */
    recordCurrentSizes() {
        const items = this.querySelectorAll('.split-panel-item');
        const isHorizontal = this.option.direction === 'horizontal';
        this.startSizes = Array.from(items).map(item => {
            return isHorizontal ? item.offsetWidth : item.offsetHeight;
        });
    }
    
    /**更新子元素大小 */
    updateSizes(delta) {
        const splitterIndex = parseInt(this.currentSplitter.dataset.index);
        const items = this.querySelectorAll('.split-panel-item');
        const isHorizontal = this.option.direction === 'horizontal';
        
        if (splitterIndex >= 0 && splitterIndex < items.length - 1) {
            const leftItem = items[splitterIndex];
            const rightItem = items[splitterIndex + 1];            
            const leftStartSize = this.startSizes[splitterIndex];
            const rightStartSize = this.startSizes[splitterIndex + 1];            
            let newLeftSize = leftStartSize + delta;
            let newRightSize = rightStartSize - delta;

            // 应用新尺寸
            if (isHorizontal) {
                leftItem.style.width = newLeftSize + 'px';
                rightItem.style.width = newRightSize + 'px';
                leftItem.style.flex = 'none';
                rightItem.style.flex = 'none';
            } else {
                leftItem.style.height = newLeftSize + 'px';
                rightItem.style.height = newRightSize + 'px';
                leftItem.style.flex = 'none';
                rightItem.style.flex = 'none';
            }
        }
    }
    
    /**初始化子元素大小 */
    setChildrenSizes() {
        // 选取当前节点下直接挂着的 .split-panel-item 元素
        var items = Array.from(this.children).filter(child => child.classList.contains('split-panel-item'));
        if (items.length === 0) return;
        
        const isHorizontal = this.option.direction === 'horizontal';
        let containerSize = isHorizontal ? this.offsetWidth : this.offsetHeight;
        const splitterCount = items.length - 1;
        const splitterSize = this.option.splitterSize;
        const availableSize = containerSize - (splitterCount * splitterSize);
        const customSizes = this.getSizes();
        
        if (customSizes && customSizes.length === items.length) {
            // 使用自定义大小
            let totalPercentage = 0;
            const pixelSizes = [];
            
            // 先处理固定尺寸（px）和百分比（%），计算剩余空间给fr单位
            let remainingSize = availableSize;
            let totalFrUnits = 0;
            const frIndices = [];
            
            // 第一遍：处理px和%单位，统计fr单位
            customSizes.forEach((size, index) => {
                if (size.endsWith('%')) {
                    const percentage = parseFloat(size);
                    totalPercentage += percentage;
                    pixelSizes[index] = Math.floor(availableSize * percentage / 100);
                    remainingSize -= pixelSizes[index];
                } else if (size.endsWith('px')) {
                    pixelSizes[index] = parseInt(size);
                    remainingSize -= pixelSizes[index];
                } else if (size.endsWith('fr')) {
                    const frValue = parseFloat(size);
                    totalFrUnits += frValue;
                    frIndices.push({ index, frValue });
                } else {
                    // 默认当作像素处理
                    pixelSizes[index] = parseInt(size) || Math.floor(availableSize / items.length);
                    remainingSize -= pixelSizes[index];
                }
            });
            
            // 第二遍：处理fr单位，按比例分配剩余空间
            if (totalFrUnits > 0 && remainingSize > 0) {
                const frUnitSize = remainingSize / totalFrUnits;
                frIndices.forEach(({ index, frValue }) => {
                    pixelSizes[index] = Math.floor(frUnitSize * frValue);
                });
            }
            
            // 如果总百分比不是100%，按比例调整
            if (totalPercentage > 0 && totalPercentage !== 100) {
                const adjustRatio = 100 / totalPercentage;
                customSizes.forEach((size, index) => {
                    if (size.endsWith('%')) {
                        const percentage = parseFloat(size) * adjustRatio;
                        pixelSizes[index] = Math.floor(availableSize * percentage / 100);
                    }
                });
            }
            
            // 应用自定义大小（考虑最小尺寸限制）
            items.forEach((item, index) => {
                let itemSize = pixelSizes[index];
                if (isHorizontal) {
                    item.style.width = itemSize + 'px';
                    item.style.flex = 'none';
                } else {
                    item.style.height = itemSize + 'px';
                    item.style.flex = 'none';
                }
            });
        } else {
            // 使用相等大小（默认行为，考虑最小尺寸限制）
            const itemSize = Math.floor(availableSize / items.length);
            items.forEach((item, index) => {
                if (isHorizontal) {
                    item.style.width = itemSize + 'px';
                    item.style.flex = 'none';
                } else {
                    item.style.height = itemSize + 'px';
                    item.style.flex = 'none';
                }
            });
        }
    }
    
    //------------------------------------------------------
    // 公共API方法
    //------------------------------------------------------
    /**重置所有子元素为相等大小 */
    equalSizes() {
        const items = this.querySelectorAll('.split-panel-item');
        if (items.length === 0) return;

        // 计算均分面板尺寸
        const isHorizontal = this.option.direction === 'horizontal';
        const containerSize = isHorizontal ? this.offsetWidth : this.offsetHeight;
        const splitterCount = items.length - 1;
        const splitterSize = 4;
        const availableSize = containerSize - (splitterCount * splitterSize);
        const itemSize = Math.floor(availableSize / items.length);
        
        // 调整面板尺寸
        items.forEach(item => {
            item.classList.add('with-animation');
            if (isHorizontal) {
                item.style.width = itemSize + 'px';
                item.style.height = '';
            } else {
                item.style.height = itemSize + 'px';
                item.style.width = '';
            }
            item.style.flex = 'none';
        });
        
        // 动画完成后移除 with-animation 类
        setTimeout(() => {items.forEach(item => item.classList.remove('with-animation'));}, 300);
    }
    
    /**设置指定子元素的大小 
     * @param {number} index 子元素索引
     * @param {string} size 大小值，支持px、%、fr单位
    */
    setItemSize(index, size) {
        const items = this.querySelectorAll('.split-panel-item');

        if (index >= 0 && index < items.length) {
            const item = items[index];
            const isHorizontal = this.option.direction === 'horizontal';
            
            // 解析大小值
            let sizeValue;
            if (typeof size === 'string' && size.endsWith('px')) {
                sizeValue = parseInt(size);
            } else if (typeof size === 'string' && size.endsWith('%')) {
                const containerSize = isHorizontal ? this.offsetWidth : this.offsetHeight;
                const splitterCount = items.length - 1;
                const splitterSize = 4;
                const availableSize = containerSize - (splitterCount * splitterSize);
                sizeValue = Math.floor(availableSize * parseFloat(size) / 100);
            } else {
                sizeValue = parseInt(size);
            }
            
            items.forEach(item => item.classList.add('with-animation'));

            // 设置指定面板的大小
            if (isHorizontal) {
                item.style.width = sizeValue + 'px';
            } else {
                item.style.height = sizeValue + 'px';
            }
            item.style.flex = 'none';
            
            // 重新计算其他面板的大小
            this.recalculateOtherPanels(index, sizeValue, true);
            
            // 动画完成后移除 with-animation 类
            setTimeout(() => {items.forEach(item => item.classList.remove('with-animation'));}, 300);
        }
    }
    
    /**重新计算其他面板的大小 */
    recalculateOtherPanels(fixedIndex, fixedSize, animated = true) {
        const items = this.querySelectorAll('.split-panel-item');
        if (items.length <= 1) return;
        
        const isHorizontal = this.option.direction === 'horizontal';
        const containerSize = isHorizontal ? this.offsetWidth : this.offsetHeight;
        const splitterCount = items.length - 1;
        const splitterSize = 4;
        const availableSize = containerSize - (splitterCount * splitterSize);
        
        // 计算剩余空间
        let remainingSize = availableSize - fixedSize;
        const flexibleItems = [];
        
        // 找出其他固定大小的面板
        items.forEach((item, index) => {
            if (index !== fixedIndex) {
                const currentSize = isHorizontal ? item.offsetWidth : item.offsetHeight;
                if (item.style.flex === 'none' && currentSize > 0) {
                    remainingSize -= currentSize;
                } else {
                    flexibleItems.push({ item, index });
                }
            }
        });
        
        // 为灵活面板分配剩余空间
        if (flexibleItems.length > 0 && remainingSize > 0) {
            // 先计算灵活面板的最小尺寸总和
            let totalMinSize = 0;
            flexibleItems.forEach(({ index }) => {
                totalMinSize += 50;
            });
            
            // 确保剩余空间足够分配最小尺寸
            if (remainingSize < totalMinSize) {
                remainingSize = totalMinSize;
            }
            
            const flexSize = Math.floor(remainingSize / flexibleItems.length);
            flexibleItems.forEach(({ item, index }) => {
                const minSize = 50;
                const finalSize = Math.max(flexSize, minSize);
                
                if (isHorizontal) {
                    item.style.width = finalSize + 'px';
                } else {
                    item.style.height = finalSize + 'px';
                }
                item.style.flex = 'none';
            });
        }
    }
    
}

// 注册自定义元素
customElements.define('split-panel', SplitPanel);

// 导出类（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SplitPanel;
}