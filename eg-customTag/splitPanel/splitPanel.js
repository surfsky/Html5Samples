
/**
 * SplitPanel 自定义容器标签
 * 支持可拖拽的分隔条，动态调整子元素大小
 * 作者：surfsky.github.io
 */
class SplitPanel extends HTMLElement {
    option = {
        direction: 'horizontal',
        splitterColor: '#ddd',
        splitterHoverColor: '#bbb',
        width: '100%',
        height: '100%',
        resizable: true,
        sizes: '',
        minSizes: '',
    };


    constructor() {
        super();
        this.option.direction = this.getAttribute('direction') ?? 'horizontal';
        this.option.splitterColor = this.getAttribute('splitter-color') ?? '#ddd';
        this.option.splitterHoverColor = this.getAttribute('splitter-hover-color') ?? '#bbb';
        this.option.width = this.getAttribute('width') ?? '100%';
        this.option.height = this.getAttribute('height') ?? '100%';
        this.option.resizable = this.getAttribute('resizable') ?? true;
        this.option.sizes = this.getAttribute('sizes') ?? '';
        this.option.minSizes = this.getAttribute('min-sizes') ?? '';
        
        // 拖拽状态
        this.isDragging = false;
        this.currentSplitter = null;
        this.startPos = 0;
        this.startSizes = [];
        
        // 绑定事件处理函数
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }
    
    //------------------------------------------------------
    // 生命周期方法
    //------------------------------------------------------
    
    connectedCallback() {
        console.debug(`render ${this.tagName} when connected`);
        this.render();
        this.setupEventListeners();        
        // 初始化子元素大小
        this.initChildrenSizes();
    }
    
    disconnectedCallback() {
        this.removeEventListeners();
    }
    
    static get observedAttributes() {
        return ['direction', 'splitter-color', 'splitter-hover-color', 'width', 'height', 'sizes', 'resizable', 'min-sizes'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'splitter-color' || name === 'splitter-hover-color') {
                // 只更新分隔条样式，不需要重新渲染整个组件
                this.applySplitterStyle();
            } else {
                // 延迟渲染，确保DOM已更新
                //setTimeout(() => {
                //    console.debug(`render ${this.tagName} by ${name}`);
                //    this.render();
                //}, 0);
            }
        }
    }
    
    //------------------------------------------------------
    // 属性获取器
    //------------------------------------------------------    
    get direction() { return this.option.direction;}
    get splitterColor() {return this.option.splitterColor;}
    get splitterHoverColor() {return this.option.splitterHoverColor;}
    get containerWidth() {return this.option.width;}
    get containerHeight() { return this.option.height;}
    get resizable() {return this.option.resizable;}
    get sizes() {
        const sizesAttr = this.option.sizes;
        return sizesAttr.split(',').map(size => size.trim());
    }    
    get minSizes() {
        const minSizesAttr = this.option.minSizes;
        return minSizesAttr.split(',').map(size => size.trim());
    }
    

    /**获取指定索引的子元素大小 */
    getItemSize(index){
        var sizes = this.getSizes();
        return sizes[index];
    }

    /**获取所有子元素的当前大小 */
    getSizes() {
        const items = this.querySelectorAll('.split-panel-item');
        const isHorizontal = this.direction === 'horizontal';
        
        return Array.from(items).map(item => {
            return isHorizontal ? item.offsetWidth : item.offsetHeight;
        });
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
        this.render();
    }

    
    //------------------------------------------------------
    // 渲染方法
    //------------------------------------------------------
    
    render() {
        const isHorizontal = this.direction === 'horizontal';
        const flexDirection = isHorizontal ? 'row' : 'column';
        
        // 添加样式到页面头部（如果还没有添加）
        this.addStyles();
        
        // 设置容器样式
        this.style.display = 'flex';
        this.style.flexDirection = flexDirection;
        this.style.width = this.containerWidth;
        this.style.height = this.containerHeight;
        this.style.boxSizing = 'border-box';
        this.style.overflow = 'hidden';
        
        this.renderChildren();
    }
    
    addStyles() {
        // 检查是否已经添加了样式
        if (document.getElementById('split-panel-styles')) return;
        
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
            
            /* 水平分隔条样式 */
            .splitter.horizontal {
                background: #e0e0e0;
                cursor: col-resize;
                position: relative;
                transition: background-color 0.2s;
                flex-shrink: 0;
                width: 4px;
                min-width: 4px;
            }
            
            /* 垂直分隔条样式 */
            .splitter.vertical {
                background: #e0e0e0;
                cursor: row-resize;
                position: relative;
                transition: background-color 0.2s;
                flex-shrink: 0;
                height: 4px;
                min-height: 4px;
                width: 100%;
            }
            
            .splitter:hover {
                background: #007bff;
            }
            
            .splitter.dragging {
                background: #0056b3;
            }
            
            /* 水平分隔条指示器 */
            .splitter.horizontal::after {
                content: '';
                position: absolute;
                background: rgba(0, 123, 255, 0.6);
                transition: opacity 0.2s;
                opacity: 0;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 2px;
                height: 20px;
            }
            
            /* 垂直分隔条指示器 */
            .splitter.vertical::after {
                content: '';
                position: absolute;
                background: rgba(0, 123, 255, 0.6);
                transition: opacity 0.2s;
                opacity: 0;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 2px;
            }
            
            .splitter:hover::after,
            .splitter.dragging::after {
                opacity: 1;
            }
            
            /* 响应式设计 */
            @media (max-width: 768px) {
                split-panel {
                    flex-direction: column !important;
                }
                
                .splitter {
                    cursor: row-resize !important;
                    width: 100% !important;
                    height: 4px !important;
                    min-height: 4px !important;
                }
                
                .splitter::after {
                    width: 20px !important;
                    height: 2px !important;
                }
            }
            
            ${this.splitterStyle}
        `;
        
        document.head.appendChild(style);
    }
    
    renderChildren() {
        const children = Array.from(this.children);
        const isHorizontal = this.direction === 'horizontal';
        const showSplitters = this.resizable;
        
        // 清除现有的包装元素和分隔条
        const existingElements = this.querySelectorAll('.split-panel-item, .splitter');
        existingElements.forEach(el => {
            // 将子元素移回原位置
            if (el.classList.contains('split-panel-item') && el.firstChild) {
                this.appendChild(el.firstChild);
            }
            el.remove();
        });
        
        // 清除所有空白文本节点
        //Array.from(this.childNodes).forEach(node => {
        //    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
        //        node.remove();
        //    }
        //});
        
        // 重新获取子元素（排除包装元素、分隔条和所有非元素节点）
        const realChildren = Array.from(this.childNodes).filter(child => {
            // 只保留元素节点，排除文本节点、注释节点等所有其他类型
            if (child.nodeName == 'STYLE') return false;
            if (child.nodeType !== Node.ELEMENT_NODE) return false;

            // 排除包装元素和分隔条
            return !child.classList.contains('split-panel-item') && !child.classList.contains('splitter');
        });
        
        realChildren.forEach((child, index) => {
            // 创建包装容器
            const wrapper = document.createElement('div');
            wrapper.className = 'split-panel-item';
            // 直接移动原始元素而不是克隆，避免重复加载
            wrapper.appendChild(child);
            this.appendChild(wrapper);
            
            // 添加分隔条（除了最后一个子元素，且仅在 resizable 为 true 时）
            if (showSplitters && index < realChildren.length - 1) {
                const splitter = document.createElement('div');
                splitter.className = `splitter ${isHorizontal ? 'horizontal' : 'vertical'}`;
                splitter.dataset.index = index;
                
                // 添加点击事件监听器
                splitter.addEventListener('click', (e) => {
                    // 防止拖拽时触发点击事件
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
                });
                
                this.appendChild(splitter);
            }
        });
        
        // 应用自定义分隔条样式
        this.applySplitterStyle();
    }
    
    /**应用自定义分隔条样式 */
    applySplitterStyle() {
        const splitterColor = this.splitterColor;
        const splitterHoverColor = this.splitterHoverColor;
        
        // 移除之前的自定义样式
        const existingStyle = this.querySelector('style[data-splitter-custom]');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // 添加新的自定义样式
        const style = document.createElement('style');
        style.setAttribute('data-splitter-custom', 'true');
        style.textContent = `
            .splitter {
                background-color: ${splitterColor} !important;
                transition: background-color 0.2s ease;
            }
            .splitter:hover {
                background-color: ${splitterHoverColor} !important;
            }
        `;
        this.appendChild(style);
    }
    
    //------------------------------------------------------
    // 事件处理
    //------------------------------------------------------
    setupEventListeners() {
        this.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('resize', this.handleResize);
    }
    
    removeEventListeners() {
        this.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('resize', this.handleResize);
    }
    
    handleMouseDown(e) {
        if (!e.target.classList.contains('splitter') || !this.resizable) return;
        
        e.preventDefault();
        this.isDragging = false; // 初始化拖拽标志
        this.currentSplitter = e.target;
        this.currentSplitter.classList.add('dragging');
        
        const isHorizontal = this.direction === 'horizontal';
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
        
        const isHorizontal = this.direction === 'horizontal';
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
            this.style.flexDirection = this.direction === 'horizontal' ? 'row' : 'column';
        }
    }
    
    //------------------------------------------------------
    // 大小调整逻辑
    //------------------------------------------------------
    /**获取解析后的最小尺寸数组 */
    getMinSizes() {
        const minSizes = this.minSizes;
        if (!minSizes) return [];
        
        const items = this.querySelectorAll('.split-panel-item');
        const isHorizontal = this.direction === 'horizontal';
        const containerSize = isHorizontal ? this.offsetWidth : this.offsetHeight;
        const splitterCount = items.length - 1;
        const splitterSize = 4;
        const availableSize = containerSize - (splitterCount * splitterSize);
        
        return minSizes.map(size => {
            if (size.endsWith('%')) {
                return Math.floor(availableSize * parseFloat(size) / 100);
            } else if (size.endsWith('px')) {
                return parseInt(size);
            } else {
                return parseInt(size) || 50;
            }
        });
    }
    
    recordCurrentSizes() {
        const items = this.querySelectorAll('.split-panel-item');
        const isHorizontal = this.direction === 'horizontal';
        
        this.startSizes = Array.from(items).map(item => {
            return isHorizontal ? item.offsetWidth : item.offsetHeight;
        });
    }
    
    updateSizes(delta) {
        const splitterIndex = parseInt(this.currentSplitter.dataset.index);
        const items = this.querySelectorAll('.split-panel-item');
        const isHorizontal = this.direction === 'horizontal';
        
        if (splitterIndex >= 0 && splitterIndex < items.length - 1) {
            const leftItem = items[splitterIndex];
            const rightItem = items[splitterIndex + 1];
            
            const leftStartSize = this.startSizes[splitterIndex];
            const rightStartSize = this.startSizes[splitterIndex + 1];
            
            let newLeftSize = leftStartSize + delta;
            let newRightSize = rightStartSize - delta;
            
            // 获取最小尺寸限制
            const minSizes = this.getMinSizes();
            const leftMinSize = minSizes[splitterIndex] || 50;
            const rightMinSize = minSizes[splitterIndex + 1] || 50;
            
            // 应用最小尺寸限制
            if (newLeftSize < leftMinSize) {
                newLeftSize = leftMinSize;
                newRightSize = leftStartSize + rightStartSize - leftMinSize;
            } else if (newRightSize < rightMinSize) {
                newRightSize = rightMinSize;
                newLeftSize = leftStartSize + rightStartSize - rightMinSize;
            }
            
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
    
    initChildrenSizes() {
        const items = this.querySelectorAll('.split-panel-item');
        if (items.length === 0) return;
        
        const isHorizontal = this.direction === 'horizontal';
        const containerSize = isHorizontal ? this.offsetWidth : this.offsetHeight;
        const splitterCount = items.length - 1;
        const splitterSize = 4; // 分隔条大小
        const availableSize = containerSize - (splitterCount * splitterSize);
        
        const customSizes = this.sizes;
        
        if (customSizes && customSizes.length === items.length) {
            // 使用自定义大小
            let totalPercentage = 0;
            const pixelSizes = [];
            
            // 计算每个子元素的实际大小
            customSizes.forEach((size, index) => {
                if (size.endsWith('%')) {
                    const percentage = parseFloat(size);
                    totalPercentage += percentage;
                    pixelSizes[index] = Math.floor(availableSize * percentage / 100);
                } else if (size.endsWith('px')) {
                    pixelSizes[index] = parseInt(size);
                } else {
                    // 默认当作像素处理
                    pixelSizes[index] = parseInt(size) || Math.floor(availableSize / items.length);
                }
            });
            
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
            const minSizes = this.getMinSizes();
            items.forEach((item, index) => {
                let itemSize = pixelSizes[index];
                const minSize = minSizes[index] || 50;
                
                // 确保不小于最小尺寸
                if (itemSize < minSize) {
                    itemSize = minSize;
                }
                
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
            const minSizes = this.getMinSizes();
            const itemSize = Math.floor(availableSize / items.length);
            
            items.forEach((item, index) => {
                const minSize = minSizes[index] || 50;
                const finalSize = Math.max(itemSize, minSize);
                
                if (isHorizontal) {
                    item.style.width = finalSize + 'px';
                    item.style.flex = 'none';
                } else {
                    item.style.height = finalSize + 'px';
                    item.style.flex = 'none';
                }
            });
        }
    }
    
    //------------------------------------------------------
    // 公共API方法
    //------------------------------------------------------
    /**重置所有子元素为相等大小 */
    resetSizes(animated = true) {
        const items = this.querySelectorAll('.split-panel-item');
        if (items.length === 0) return;
        
        const isHorizontal = this.direction === 'horizontal';
        const containerSize = isHorizontal ? this.offsetWidth : this.offsetHeight;
        const splitterCount = items.length - 1;
        const splitterSize = 4;
        const availableSize = containerSize - (splitterCount * splitterSize);
        const itemSize = Math.floor(availableSize / items.length);
        
        // 控制动画效果
        if (animated) {
            items.forEach(item => item.classList.add('with-animation'));
        }
        
        items.forEach(item => {
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
        if (animated) {
            setTimeout(() => {
                items.forEach(item => item.classList.remove('with-animation'));
            }, 300);
        }
    }
    
    /**设置指定子元素的大小 */
    setItemSize(index, size, animated = true) {
        const items = this.querySelectorAll('.split-panel-item');
        if (index >= 0 && index < items.length) {
            const item = items[index];
            const isHorizontal = this.direction === 'horizontal';
            
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
            
            // 应用最小尺寸限制
            const minSizes = this.getMinSizes();
            const minSize = minSizes[index] || 50;
            sizeValue = Math.max(sizeValue, minSize);
            
            // 控制动画效果
            if (animated) {
                items.forEach(item => item.classList.add('with-animation'));
            }
            
            // 设置指定面板的大小
            if (isHorizontal) {
                item.style.width = sizeValue + 'px';
            } else {
                item.style.height = sizeValue + 'px';
            }
            item.style.flex = 'none';
            
            // 重新计算其他面板的大小
            this.recalculateOtherPanels(index, sizeValue, animated);
            
            // 动画完成后移除 with-animation 类
            if (animated) {
                setTimeout(() => {
                    items.forEach(item => item.classList.remove('with-animation'));
                }, 300);
            }
        }
    }
    
    /**重新计算其他面板的大小 */
    recalculateOtherPanels(fixedIndex, fixedSize, animated = true) {
        const items = this.querySelectorAll('.split-panel-item');
        if (items.length <= 1) return;
        
        const isHorizontal = this.direction === 'horizontal';
        const containerSize = isHorizontal ? this.offsetWidth : this.offsetHeight;
        const splitterCount = items.length - 1;
        const splitterSize = 4;
        const availableSize = containerSize - (splitterCount * splitterSize);
        const minSizes = this.getMinSizes();
        
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
                totalMinSize += minSizes[index] || 50;
            });
            
            // 确保剩余空间足够分配最小尺寸
            if (remainingSize < totalMinSize) {
                remainingSize = totalMinSize;
            }
            
            const flexSize = Math.floor(remainingSize / flexibleItems.length);
            flexibleItems.forEach(({ item, index }) => {
                const minSize = minSizes[index] || 50;
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