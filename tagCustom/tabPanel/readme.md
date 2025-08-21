# TabPanel 标签面板组件

一个基于 Web Components 标准的自定义标签面板组件，支持多标签页切换、自定义样式和丰富的交互功能。

## 特性

- ✅ **标准化**: 基于 Web Components 标准，无需额外框架
- ✅ **响应式**: 支持移动端和桌面端自适应
- ✅ **可定制**: 丰富的样式配置选项
- ✅ **交互性**: 支持标签页关闭、动态添加等操作
- ✅ **事件驱动**: 完整的事件系统
- ✅ **位置灵活**: 支持顶部、底部、左侧、右侧四种位置

## 基础用法

```html
<!-- 引入组件 -->
<script src="tabPanel.js"></script>

<!-- 基础标签面板 -->
<tab-panel>
    <tab-item title="首页">
        <h3>首页内容</h3>
        <p>这里是首页的内容...</p>
    </tab-item>
    <tab-item title="产品">
        <h3>产品展示</h3>
        <p>这里是产品页面的内容...</p>
    </tab-item>
    <tab-item title="关于">
        <h3>关于我们</h3>
        <p>这里是关于页面的内容...</p>
    </tab-item>
</tab-panel>
```

## 属性配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `active-index` | number | 0 | 默认激活的标签页索引 |
| `tab-position` | string | 'top' | 标签位置：top/bottom/left/right |
| `tab-color` | string | '#f5f5f5' | 标签背景色 |
| `active-tab-color` | string | '#017BFF' | 激活标签背景色 |
| `tab-text-color` | string | '#333' | 标签文字颜色 |
| `active-tab-text-color` | string | '#fff' | 激活标签文字颜色 |
| `width` | string | '100%' | 组件宽度 |
| `height` | string | '100%' | 组件高度 |
| `closable` | boolean | false | 是否显示关闭按钮 |
| `scrollable` | boolean | true | 标签过多时是否可滚动 |

## 高级用法

### 可关闭标签页

```html
<tab-panel closable="true">
    <tab-item title="文档1">内容1</tab-item>
    <tab-item title="文档2">内容2</tab-item>
    <tab-item title="文档3">内容3</tab-item>
</tab-panel>
```

### 自定义样式

```html
<tab-panel 
    tab-color="#2c3e50" 
    active-tab-color="#e74c3c" 
    tab-text-color="#ecf0f1" 
    active-tab-text-color="#ffffff">
    <tab-item title="深色主题">深色主题内容</tab-item>
    <tab-item title="设计">设计说明</tab-item>
</tab-panel>
```

### 标签位置

```html
<!-- 左侧标签 -->
<tab-panel tab-position="left">
    <tab-item title="左侧标签1">内容1</tab-item>
    <tab-item title="左侧标签2">内容2</tab-item>
</tab-panel>

<!-- 底部标签 -->
<tab-panel tab-position="bottom">
    <tab-item title="底部标签1">内容1</tab-item>
    <tab-item title="底部标签2">内容2</tab-item>
</tab-panel>
```

## JavaScript API

### 方法

```javascript
const tabPanel = document.getElementById('myTabPanel');

// 获取所有标签页
const tabs = tabPanel.getTabs();

// 获取当前激活索引
const activeIndex = tabPanel.getActiveIndex();

// 设置激活标签页
tabPanel.setActiveIndex(1);

// 添加新标签页
tabPanel.addTab('新标签', '<p>新内容</p>', 1); // 可选位置参数

// 移除标签页
tabPanel.removeTab(0);
```

### 事件监听

```javascript
const tabPanel = document.getElementById('myTabPanel');

// 标签页切换事件
tabPanel.addEventListener('tabChange', (e) => {
    console.log('切换到标签:', e.detail.activeIndex);
    console.log('之前的标签:', e.detail.previousIndex);
    console.log('标签元素:', e.detail.tabElement);
});

// 标签页关闭事件
tabPanel.addEventListener('tabClose', (e) => {
    console.log('关闭标签索引:', e.detail.index);
    console.log('标签元素:', e.detail.tabElement);
    
    // 可以通过 preventDefault() 阻止关闭
    // e.preventDefault();
});
```

## 样式定制

组件使用 CSS 自定义属性，您可以通过 CSS 进一步定制样式：

```css
/* 自定义标签页样式 */
tab-panel {
    --tab-border-radius: 8px;
    --tab-padding: 12px 20px;
    --content-padding: 20px;
}

/* 自定义激活状态动画 */
.tab-header.active {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* 自定义内容区域 */
.tab-content {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
```

## 响应式设计

组件内置响应式支持，在移动设备上会自动调整：

- 标签页间距和字体大小自动缩放
- 内容区域padding自动调整
- 支持触摸滑动（如果启用scrollable）

## 浏览器兼容性

- ✅ Chrome 54+
- ✅ Firefox 63+
- ✅ Safari 10.1+
- ✅ Edge 79+

对于不支持 Web Components 的旧浏览器，建议使用 polyfill：

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@^2/webcomponents-loader.js"></script>
```

## 开发和测试

### 本地测试

1. 克隆或下载项目文件
2. 在浏览器中打开 `test.html`
3. 查看各种用法示例和功能演示

### 文件结构

```
tabPanel/
├── tabPanel.js     # 核心组件文件
├── test.html       # 测试和演示页面
└── readme.md       # 说明文档
```

## 更新日志

### v1.0.0 (2025-01-21)

- ✨ 初始版本发布
- ✨ 支持基础标签页切换功能
- ✨ 支持可关闭标签页
- ✨ 支持四种标签位置
- ✨ 支持自定义样式配置
- ✨ 支持响应式设计
- ✨ 完整的事件系统
- ✨ JavaScript API 支持

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件！

## 相关组件

- [SplitPanel](../splitPanel/) - 可拖拽分割面板组件

---

**作者**: surfsky.github.io  
**最后更新**: 2025-01-21