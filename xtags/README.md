-----------------------------------------------------
About XTags
-----------------------------------------------------
xtags : html5 custom tag system without writing any css and class.

author: surfsky.github.com 2024

Xtags framework
    base: 
        /theme + common
    baseui: 
        rect
            box
                /size
                /border
                /margin\padding
                /radius
            position
                /anchor
                /childAnchor
            theme
                /bgcolor
                /textcolor
                /hovercolor
                /font
                /theme
            effect
                /transform
                /shadow
                /textshadow
                /rotate
                /scale
                /skew
                /animation
        container
            /row
            /column
            /grid
            iframe
        event
            /click
            /hover
            drag
            swipe
            any
        temple
        responsive
    control:
        /button
        groupbutton
        switch
        textbox
        popup
        toast
    util:
        extensions



-----------------------------------------------------
Examples
-----------------------------------------------------
``` js
<script src="./xtags.js" type='module' defer ></script>

<x-rect anchor="topLeft" childanchor='center'>topLeft</x-rect>
<x-row gap='20px' anchor="center" width="430px">...<x-row>
<x-col gap="20px" anchor='right'  width="130px" height="500px">...<x-col>
<x-grid columns='4'>...<x-grid>
<x-form>...<x-form>
```

-----------------------------------------------------
Features
-----------------------------------------------------

- Support tags: rect, btn, row, col, grid, form, circle, frame
- Support fix position
- Support child position
- Support hover color change
- Support animation for position, size, color...
- Support click event
- Support theme: Just use XTags.showTheme(.)
- Support popup: Mask, Toast, MessageBox, Dialog, Tooltip
- Button
    - Disable when click before execute callback
    - Can show ripple effect when click.


-----------------------------------------------------
Task
-----------------------------------------------------
dialog buttons and dialogResult
解决重入几次的问题：button.html
swipe
tooltip
layout-backend
layout-dashboard
实现 react、vue那样的组件生成方式
child sortable


发布
    build min.js
    备选名称：classless.js, noclass.js, cssless.js, onlytags.js



-----------------------------------------------------
Known BUG
-----------------------------------------------------
iframe 放在 xtags 里面，无法自动撑开，要手动指定 width=100%
iframe 放在 xtags 里面，<a> 标签中的target无法正确指向
x-row 中的按钮点击后无法获取按钮的坐标和区域。popup.html


-----------------------------------------------------
history
-----------------------------------------------------
/按钮文字不可选择 user-select: none
/Button long time execute
/drag - dialog
/animation: Tag.animate(...)
/dragable
/resizable
/messagebox
/dialog
/unique id 对于动态创建的控件，自动生成一个唯一性ID，或者不用也行，用this.root 保存吧。
/layout-form
/弄个虚拟基类Tag，实现所有css
    Rect、Circle，butten
    Style、
    row、col，grid
/删除this.shadow，直接用 this.shadowRoot
/尝试用grid布局来写index.html
/Link hover、visited color
/Mask
/注入全局样式。或弄一个全局配置标签。
/x-img 也可以考虑支持icon，命名方式如：theme-iconname.xxx
/用 ITheme 接口改造 Rect，算了用约定吧
/用 Toast.show() 静态方法来展示 Toast
/image
/重构类库结构：base、baseui、control、util...
/Rect.fix -> anchor

