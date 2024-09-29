/**
 * xtags : html5 custom tag system without writing any css and class.
 * @author surfsky.github.com 2024
 * @example
    <script src="./xtags.js" defer></script>
    <x-rect fix="topLeft">topLeft</x-rect>
    <x-row cellmargin="0 20px 0 0" margin="0 0 10px 0" fix="center" width="430px">
    <x-col cellmargin="0 0 20px 0" width="130px" height="500px" fix="right">
* @description
   - Support tags: 
     basic: rect, circle, link
     container:  row, col, grid, frame
     control: btn
   - Support fix position
   - Support child position
   - Support hover color change
   - Support animation for position, size, color
   - Support click event
   - Support theme: Just use XTags.showTheme(.)
   - Support popup: toast
   - Button
        Show ripple effect when click.
        Disable when click before execute callback
 */


import { XTags, Theme, Anchor} from "./xtags-base.js";
import { Rect, Circle, Row, Column, Grid, Image, Frame, Style } from "./xtags-baseui.js";
import { Button, Toast } from "./xtags-control.js";
import { XTagsUtil } from "./xtags-util.js";



