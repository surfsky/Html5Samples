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

<x-rect fix="topLeft">topLeft</x-rect>
<x-row cellmargin="0 20px 0 0" margin="0 0 10px 0" fix="center" width="430px">
<x-col cellmargin="0 0 20px 0" width="130px" height="500px" fix="right">
```

-----------------------------------------------------
Features
-----------------------------------------------------

- Support tags: rect, btn, row, col, grid, circle
- Support fix position
- Support child position
- Support hover color change
- Support animation for position, size, color
- Support click event
- Support theme: Just use XTags.showTheme(.)
- Support popup: toast
- Button
    - Show ripple effect when click.
    - Disable when click before execute callback


-----------------------------------------------------
Task
-----------------------------------------------------
Link hover、visited color
dragable
responsive
弄个虚拟基类，实现所有css
    Rect、Circle，butten
    Style、
    row、col，grid

备选名称：classless.js, noclass.js, cssless.js
popup: x, y, width, height, closeicon
    - messagebox
    - dialog: module mask, pure code invoke to show a dialog
    - dropdown
child sortable
build min.js


-----------------------------------------------------
history
-----------------------------------------------------
/注入全局样式。或弄一个全局配置标签。
/x-img 也可以考虑支持icon，命名方式如：theme-iconname.xxx
/用 ITheme 接口改造 Rect，算了用约定吧
/用 Toast.show() 静态方法来展示 Toast
/image
/重构类库结构：base、baseui、control、util...
/Rect.fix -> anchor

