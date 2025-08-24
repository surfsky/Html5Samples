# TreeView 自定义控件

基于原 index.html 中的树结构实现的自定义 Web 组件。

## 功能特性

- 支持多层级树结构显示
- 文件夹展开/收起功能
- 节点选中状态管理
- 自定义图标显示（文件夹/文件）
- 事件回调支持
- 响应式设计

## 使用方法

### 1. 引入组件

```html
<script src="tagCustom/treeView/treeView.js"></script>
```

### 2. HTML 中使用

```html
<tree-view id="myTree"></tree-view>
```

### 3. JavaScript 配置

```javascript
const treeView = document.getElementById('myTree');

// 设置数据
const treeData = [
    {
        name: 'folder1',
        text: '文件夹1',
        children: [
            {
                name: 'file1.html',
                text: '文件1',
                url: 'path/to/file1.html'
            }
        ]
    },
    {
        name: 'file2.html',
        text: '文件2',
        url: 'path/to/file2.html'
    }
];

treeView.setData(treeData);

// 设置事件回调
treeView.setOnNodeClick((nodeInfo) => {
    console.log('节点点击:', nodeInfo);
    // nodeInfo: { node, name, path }
});

treeView.setOnNodeToggle((nodeInfo) => {
    console.log('节点切换:', nodeInfo);
    // nodeInfo: { node, name, path, expanded }
});
```

## API 方法

### setData(data)
设置树数据
- `data`: 树数据数组

### getData()
获取当前树数据

### setOnNodeClick(callback)
设置节点点击回调函数
- `callback`: 回调函数，参数为 `{ node, name, path }`

### setOnNodeToggle(callback)
设置节点展开/收起回调函数
- `callback`: 回调函数，参数为 `{ node, name, path, expanded }`

### getSelectedNode()
获取当前选中的节点

### expandAll()
展开所有节点

### collapseAll()
收起所有节点

### expandFirst()
展开第一个文件夹

## 数据格式

```javascript
[
    {
        name: 'folder-name',        // 节点名称（必需）
        text: '显示文本',            // 显示文本（可选，默认使用name）
        url: 'path/to/file',        // 文件路径（文件节点必需）
        children: [                 // 子节点（文件夹节点）
            // ... 子节点数据
        ]
    }
]
```

## 样式定制

组件内置了完整的样式，如需自定义，可以通过 CSS 覆盖以下类名：

- `.tree`: 树容器
- `.tree-item`: 树节点项
- `.tree-node`: 树节点
- `.tree-icon`: 节点图标
- `.tree-label`: 节点标签
- `.tree-children`: 子节点容器
- `.folder`: 文件夹节点
- `.file`: 文件节点
- `.active`: 选中状态
- `.expanded`: 展开状态

## 示例

参见 `test.html` 文件中的完整示例。