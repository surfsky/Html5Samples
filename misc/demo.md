# Markdown 语法演示

这是一个完整的 Markdown 语法演示文档，展示了各种常用的 Markdown 元素。

## 文本格式

**粗体文本** 和 *斜体文本* 以及 ***粗斜体文本***

~~删除线文本~~

`行内代码` 使用反引号包围

## 标题层级

### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 列表

### 无序列表

- 第一项
- 第二项
  - 嵌套项 1
  - 嵌套项 2
- 第三项

### 有序列表

1. 第一步
2. 第二步
   1. 子步骤 A
   2. 子步骤 B
3. 第三步

### 任务列表

- [x] 已完成的任务
- [ ] 待完成的任务
- [ ] 另一个待完成的任务

## 链接和图片

[这是一个链接](https://www.example.com)

[带标题的链接](https://www.example.com "链接标题")

自动链接: https://www.example.com

## 引用

> 这是一个简单的引用

> 这是一个多行引用
> 
> 可以包含多个段落
> 
> > 这是嵌套引用

## 代码块

### JavaScript 代码

```javascript
// 函数定义
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 使用示例
const result = fibonacci(10);
console.log(`斐波那契数列第10项: ${result}`);

// ES6 箭头函数
const add = (a, b) => a + b;

// 异步函数
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}
```

### CSS 代码

```css
/* 现代 CSS 样式 */
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
}

.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

/* CSS 变量 */
:root {
    --primary-color: #007acc;
    --secondary-color: #28a745;
    --border-radius: 8px;
}
```

### HTML 代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>示例页面</title>
</head>
<body>
    <header>
        <h1>欢迎来到我的网站</h1>
        <nav>
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
                <li><a href="#contact">联系</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>主要内容</h2>
            <p>这里是页面的主要内容。</p>
        </section>
    </main>
</body>
</html>
```

## 表格

| 功能 | 描述 | 状态 | 优先级 |
|------|------|------|--------|
| Markdown 渲染 | 实时将 Markdown 转换为 HTML | ✅ 完成 | 高 |
| 语法高亮 | 代码块语法高亮显示 | ✅ 完成 | 高 |
| 响应式设计 | 适配不同屏幕尺寸 | ✅ 完成 | 中 |
| 文件导入 | 支持导入外部 Markdown 文件 | 🔄 进行中 | 中 |
| 导出功能 | 导出为 HTML 或 PDF | ⏳ 计划中 | 低 |

## 分隔线

---

## 数学公式 (如果支持)

行内公式: $E = mc^2$

块级公式:
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

## 特殊字符和转义

\* 这不是斜体 \*

\# 这不是标题

\[这不是链接\]

## 脚注

这是一个带脚注的文本[^1]。

这是另一个脚注[^note]。

[^1]: 这是第一个脚注的内容。
[^note]: 这是命名脚注的内容。

## 总结

这个 Markdown 示例展示了:

1. **基础语法**: 标题、段落、强调
2. **列表**: 有序、无序、任务列表
3. **代码**: 行内代码和代码块
4. **表格**: 数据展示
5. **链接和引用**: 外部资源引用
6. **格式化**: 各种文本格式

> 💡 **提示**: 你可以在左侧编辑器中修改这些内容，右侧会实时显示渲染结果！

---

*最后更新: 2024年1月*