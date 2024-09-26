/**
 * xtags : html5 custom tag system without writing any css and class.
 * @author surfsky.github.com 2024
 * @example
    <script src="./xtags.js" defer></script>
    <x-rect fix="topLeft">topLeft</x-rect>
    <x-row cellmargin="0 20px 0 0" margin="0 0 10px 0" fix="center" width="430px">
    <x-col cellmargin="0 0 20px 0" width="130px" height="500px" fix="right">
* @description
   - Support tags: rect, row, col, grid...
   - Support fix position
   - Support child position
   - Support hover color change
   - Support animation for position, size, color
   - Support click event
 * @todo
 * - grid layout
 * - button
 */


/************************************************************
 * Align enum for fixAlign and childAlign
 ***********************************************************/
const Align = {
    TL: 'topLeft',
    T:  'top',
    TR: 'topRight',
    L:  'left',
    CT: 'center',
    R:  'right',
    BL: 'bottomLeft',
    B:  'bottom',
    BR: 'bottomRight'
};

/************************************************************
 * Rectangle
 * @example  <x-rect width="100px" height="100px" bgcolor="green" color="white" radius="10px" borderwidth="2px" bordercolor="yellow" borderstyle="solid" ></rect-tag>
 * @author surfsky.github.com 2024
 ***********************************************************/
class Rect extends HTMLElement {
    // supported attribute. Notice these names must be all small chars.
    static _attrs = [
        'id', 'class', 'newclass', 'z',
        'bgcolor', 'color', 'hovercolor',
        'radius', 
        'width', 'height', 
        'border', 'borderwidth', 'bordercolor', 'borderstyle',
        'margin', 'padding',
        'font', 'fontsize', 'fontfamily', 'fontstyle', 'fontweight',
        'fix', 'childalign',
        'click'
    ];

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.root = document.createElement("div");
        this.root.style.padding = "10px";
        this.root.style.width = '100px';
        this.root.style.height = '100px';
        this.root.style.border = '1px solid lightgray';
        this.root.style.transition = 'width 0.5s, height 0.5s, top 0.5s, left 0.5s, right 0.5s, bottom 0.5s, background-color 0.5s, color 0.5s';  // animation for background changing
        this.root.innerHTML = this.innerHTML;   // contain child items
        this.setChildAlign(Align.CT);
        this.shadow.appendChild(this.root);
    }

    /**
     * Support attributes.
     */
    static get observedAttributes() {
        return this._attrs;
    }

    /**
     * Set fix align
     * @param {Align} align 
        .fixTopLeft    {position:fixed; top:0px;    left:0px; }
        .fixTop        {position:fixed; top:0px;    left:50%; transform: translateX(-50%);}
        .fixTopRight   {position:fixed; top:0px;    right:0px; }
        .fixBottomLeft {position:fixed; bottom:0px; left:0px; }
        .fixBottom     {position:fixed; bottom:0px; left:50%; transform: translateX(-50%); }
        .fixBottomRight{position:fixed; bottom:0px; right:0px; }
        .fixLeft       {position:fixed; top:50%;    transform: translateY(-50%); left:0px; }
        .fixCenter     {position:fixed; top:50%;    transform: translate3D(-50%, -50%, 0); left:50%;}
        .fixRight      {position:fixed; top:50%;    transform: translateY(-50%); right:0px; }
     */
    setFixAlign(align){
        var s = this.root.style;
        switch (align){
            case Align.TL  : s.position='fixed'; s.top='0px';    s.left='0px';  break;
            case Align.T   : s.position='fixed'; s.top='0px';    s.left='50%';  s.transform='translateX(-50%)';break;
            case Align.TR  : s.position='fixed'; s.top='0px';    s.right='0px'; break;
            case Align.BL  : s.position='fixed'; s.bottom='0px'; s.left='0px';  break;
            case Align.B   : s.position='fixed'; s.bottom='0px'; s.left='50%';  s.transform='translateX(-50%)'; break;
            case Align.BR  : s.position='fixed'; s.bottom='0px'; s.right='0px'; break;
            case Align.L   : s.position='fixed'; s.top='50%';    s.left='0px';  s.transform='translateY(-50%)';           break;
            case Align.CT  : s.position='fixed'; s.top='50%';    s.left='50%';  s.transform='translate3D(-50%, -50%, 0)'; break;
            case Align.R   : s.position='fixed'; s.top='50%';    s.right='0px'; s.transform='translateY(-50%)';           break;
        }
    }


    /**
     * Set child align
     * @param {Align} align 
    .childTopLeft       {display: flex; justify-content: flex-start;  align-items: flex-start;}
    .childTop           {display: flex; justify-content: center;      align-items: flex-start;}
    .childTopRight      {display: flex; justify-content: flex-end;    align-items: flex-start;}
    .childBottomLeft    {display: flex; justify-content: flex-start;  align-items: flex-end;}
    .childBottom        {display: flex; justify-content: center;      align-items: flex-end;}
    .childBottomRight   {display: flex; justify-content: flex-end;    align-items: flex-end;}
    .childLeft          {display: flex; justify-content: flex-start;  align-items: center;}
    .childCenter        {display: flex; justify-content: center;      align-items: center;}
    .childRight         {display: flex; justify-content: flex-end;    align-items: center;}
     */
    setChildAlign(align){
        var s = this.root.style;
        switch (align){
            case Align.TL  : s.display='flex'; s.justifyContent='flex-start';  s.alignItems='flex-start'; break;
            case Align.T   : s.display='flex'; s.justifyContent='center';      s.alignItems='flex-start'; break;
            case Align.TR  : s.display='flex'; s.justifyContent='flex-end';    s.alignItems='flex-start'; break;
            case Align.BL  : s.display='flex'; s.justifyContent='flex-start';  s.alignItems='flex-end';   break;
            case Align.B   : s.display='flex'; s.justifyContent='center';      s.alignItems='flex-end';   break;
            case Align.BR  : s.display='flex'; s.justifyContent='flex-end';    s.alignItems='flex-end';   break;
            case Align.L   : s.display='flex'; s.justifyContent='flex-start';  s.alignItems='center';     break;
            case Align.CT  : s.display='flex'; s.justifyContent='center';      s.alignItems='center';     break;
            case Align.R   : s.display='flex'; s.justifyContent='flex-end';    s.alignItems='center';     break;
        }
    }

    /**
     * Set hover background color
     * @param {Color} color 
     */
    setHoverColor(color){
        var element = this.root;
        var oldColor = element.style.backgroundColor;
        var oldCursor = element.style.cursor;
        element.addEventListener('mouseover', function() {
            element.style.backgroundColor = color;
            element.style.cursor = 'pointer';
        });
        element.addEventListener('mouseout', function() {
            element.style.backgroundColor = oldColor;
            element.style.cursor = oldCursor;
        });
    }

    /**
     * Set click event
     */
    setClick(func){
        this.root.addEventListener('click', ()=>eval(func));
    }
    
    /**
     * Call when attribute changed 
     * @param {string} name attribute name 
     * @param {string} oldValue old attribute value
     * @param {string} newValue new attribute value
     */
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'id':                this.root.setAttribute('id', newValue); break;
            case 'class':             this.root.setAttribute('class', newValue); break;
            case 'newclass':          this.root.setAttribute('class', newValue + ' ' + this.root.getAttribute('class')); break;
            case 'z':                 this.root.style.zIndex = newValue; break;
            case 'bgcolor':           this.root.style.backgroundColor = newValue;  break;
            case 'color':             this.root.style.color = newValue;  break;
            case 'hovercolor':        this.setHoverColor(newValue); break;
            case 'radius':            this.root.style.borderRadius = newValue;  break;
            case 'width':             this.root.style.width = newValue;  break;
            case 'height':            this.root.style.height = newValue;  break;
            case 'border':            this.root.style.border = newValue;  break;
            case 'borderwidth':       this.root.style.borderWidth = newValue;  break;
            case 'bordercolor':       this.root.style.borderColor = newValue;  break;
            case 'borderstyle':       this.root.style.borderStyle = newValue;  break;
            case 'margin':            this.root.style.margin = newValue;  break;
            case 'padding':           this.root.style.padding = newValue;  break;
            case 'font':              this.root.style.font = newValue;  break;
            case 'fontsize':          this.root.style.fontSize = newValue;  break;
            case 'fontfamily':        this.root.style.fontFamily = newValue;  break;
            case 'fontstyle':         this.root.style.fontStyle = newValue;  break;
            case 'fontweight':        this.root.style.fontWeight = newValue;  break;
            case 'fix':               this.setFixAlign(newValue); break;
            case 'childalign':        this.setChildAlign(newValue); break;
            case 'click':             this.setClick(newValue); break;
        }
    }
}
customElements.define("x-rect", Rect);


/***********************************************************
 * Row container
 * @example
 *     <x-row cellmargin="0 20px 0 0" bgcolor="lightgray" margin="0 0 10px 0">
 ***********************************************************/
class Row extends Rect {
    //constructor(bgcolor='white') {  // 经测试不支持默认参数代入
    constructor() {
        super();

        // child style
        this.styleEle = document.createElement('style');
        this.styleEle.textContent = ".x-container > *  {margin: 0;}";
        this.shadow.appendChild(this.styleEle);

        // div
        this.root.setAttribute('class', 'x-container');
        this.root.style.padding = "0px";
        this.root.style.borderWidth = '0';
        this.root.style.display = "flex";
        this.root.style.flexWrap = "wrap";
        this.root.style.flexDirection = "row";
        this.root.style.width = '100%';
        this.root.style.height = '';
    }

    static get observedAttributes() {
        return ['cellmargin'].concat(this._attrs);
    }


    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name){
            case 'cellmargin':            
                this.styleEle.textContent = `.x-container > *  {margin: ${newValue} }`;
                break;
        }
    }
}

customElements.define("x-row", Row);


/************************************************************
 * Column container
 * @example
 *     <x-col cellmargin="0 0 20px 0" bgcolor="lightgray" width="150px" height="500px">
 ***********************************************************/
class Column extends Row {
    constructor() {
        super();
        this.root.style.flexDirection = "column";
        this.root.style.width = '';
        this.root.style.height = '100%';
    }
}

customElements.define("x-col", Column);



/************************************************************
 * Grid container
 * @example
 *     <x-grid cellmargin="0 0 20px 0">
 ***********************************************************/
class Grid extends Row {
    constructor() {
        super();
        this.root.style.flexDirection = "column";
        this.root.style.width = '';
        this.root.style.height = '100%';
    }
}

customElements.define("x-grid", Grid);
