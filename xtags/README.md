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
用 ITheme 接口改造 Rect
用 Toast.show() 静态方法来展示 Toast

- popup: x, y, width, height, closeicon
    - messagebox
    - dialog: module mask, pure code invoke to show a dialog
    - dropdown
- image
 - dragable
 - child sortable
 - responsive
 - build min.js


-----------------------------------------------------
history
-----------------------------------------------------
- 重构类库结构：base、baseui、control、util...
- Rect.fix -> anchor

