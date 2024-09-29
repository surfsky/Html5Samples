/**
 * xtags base custom tags.
 * @author surfsky.github.com 2024
 */
import { XTags, Theme, Anchor } from "./xtags-base.js";



/************************************************************
 * Rectangle
 * @example  <x-rect width="100px" height="100px" bgcolor="green" color="white" radius="10px" borderwidth="2px" bordercolor="yellow" borderstyle="solid" ></rect-tag>
 * @author surfsky.github.com 2024
 * @property {string} theme Set theme such as primary, secondary, success...
 ***********************************************************/
export class Rect extends HTMLElement {
    //-----------------------------------------------------
    // Constructor
    //-----------------------------------------------------
    // supported attribute. Notice these names must be all small chars.
    static _attrs = [
        'id', 'name', 'class', 'newclass', 'z', 'opacity', 'visible', 'overflow', 'box', 'cursor',
        'position', 'display', 'anchor', 'childanchor', 'top', 'bottom', 'left', 'right', 'flex',
        'width', 'height', 'radius',  'minwidth', 'minheight',
        'border', 'borderwidth', 'bordercolor', 'borderstyle',
        'margin', 'padding',
        'bgcolor', 'color', 'hovercolor', 'theme', 'background',
        'font', 'fontsize', 'fontfamily', 'fontstyle', 'fontweight',
        'shadow', 'transform', 'rotate', 'scale', 'skew', 'textshadow',
        'click', 'draggable'
    ];

    /**Constructor. Build a frame rectangle with content in center.*/
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.root = document.createElement("div");
        this.root.innerHTML = this.innerHTML;   // contain child items
        //this.root.style.boxSizing = 'border-box';  // size = content + padding + border, margin is outside.
        this.style.padding = "10px";
        this.style.width = '100px';
        this.style.height = '100px';
        this.style.border = '1px solid lightgray';
        this.style.transition = 'all 0.5s';  // animation
        if (this.root.innerHTML != '')
            this.setChildAnchor(Anchor.CT);
        this.shadow.appendChild(this.root);
    }

    /**Support attributes.*/
    static get observedAttributes() {
        return this._attrs;
    }

    //-----------------------------------------------------
    // Css Property Getter & Setter
    //-----------------------------------------------------
    /** Insert style tag into shadow root. And use this.styleTag.contentText = ...; */
    writeStyleTag(){
        this.styleTag = document.createElement('style');
        this.shadow.appendChild(this.styleTag);
    }

    /** This root div's style */
    get style(){
        return this.root.style;
    }


    /** Css property getter */
    //get(property){
    //    return this.root.style.getPropertyValue(property);
    //}
    /** Css property setter */
    //set(property, val){
    //    this.root.style.setProperty(property, val);
    //    return this;
    //}

    //-----------------------------------------------------
    // Content
    //-----------------------------------------------------
    /**Clear all children */
    clear() {
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }
    }

    getInnerHTML(){
        return this.root.innerHTML;
    }
    setInnerHTML(val){
        this.root.innerHTML = val;
        return this;
    }

    /** Child content object (equal innerHTML) */
    get content(){
        return this.root.innerHTML;
    }
    set content(val){
        this.root.innerHTML = val;
    }


    //-----------------------------------------------------
    // Theme
    //-----------------------------------------------------
    /** Theme class, eg. primary, secondary, info, warning...*/
    _themeCls = "";

    /** Set theme class, eg. primary, secondary, info, warning...*/
    setThemeCls(cls){
        this._themeCls = cls;
        this.setTheme(XTags.theme);
        return this;
    }

    /**
     * Set theme for background and text color. Other settings is setted in child class.
     * @param {Theme} t 
     */
    setTheme(t){
        this.root.style.color = t.text;
        switch (this._themeCls){
            case "primary":   this.root.style.backgroundColor = t.primary;     break;
            case "secondary": this.root.style.backgroundColor = t.secondary;   break;
            case "success":   this.root.style.backgroundColor = t.success;     break;
            case "info":      this.root.style.backgroundColor = t.info;        break;
            case "warning":   this.root.style.backgroundColor = t.warning;     break;
            case "danger":    this.root.style.backgroundColor = t.danger;      break;
            default:          this.root.style.backgroundColor = t.background;  break;
        }
        return this;
    }

    setColors(bgColor, textColor){
        this.root.style.backgroundColor = bgColor;
        this.root.style.color = textColor;
        return this;
    }

    //-----------------------------------------------------
    // Position
    //-----------------------------------------------------
    /** Set size */
    setSize(w, h){
        this.root.style.width = w;
        this.root.style.height = h;
        return this;
    }

    /** Set radius */
    setRadius(r){
        this.root.style.borderRadius = r;
        return this;
    }

    /**
     * Set anchor
     * @param {Anchor} anchor 
        .fixTopLeft    {position:fixed; top:0px;    left:0px; }
        .fixTop        {position:fixed; top:0px;    left:50%; transform: translateX(-50%);}
        .fixTopRight   {position:fixed; top:0px;    right:0px; }
        .fixBottomLeft {position:fixed; bottom:0px; left:0px; }
        .fixBottom     {position:fixed; bottom:0px; left:50%; transform: translateX(-50%); }
        .fixBottomRight{position:fixed; bottom:0px; right:0px; }
        .fixLeft       {position:fixed; top:50%;    transform: translateY(-50%); left:0px; }
        .fixCenter     {position:fixed; top:50%;    transform: translate3D(-50%, -50%, 0); left:50%;}
        .fixRight      {position:fixed; top:50%;    transform: translateY(-50%); right:0px; }
        .fill          {position:fixed; top:0px;    bottom:0px; left:0px;  right:0px;}
     */
    setAnchor(anchor){
        var s = this.root.style;
        switch (anchor){
            case Anchor.TL  : s.position='fixed'; s.top='0px';    s.left='0px';  break;
            case Anchor.T   : s.position='fixed'; s.top='0px';    s.left='50%';  s.transform='translateX(-50%)';break;
            case Anchor.TR  : s.position='fixed'; s.top='0px';    s.right='0px'; break;
            case Anchor.BL  : s.position='fixed'; s.bottom='0px'; s.left='0px';  break;
            case Anchor.B   : s.position='fixed'; s.bottom='0px'; s.left='50%';  s.transform='translateX(-50%)'; break;
            case Anchor.BR  : s.position='fixed'; s.bottom='0px'; s.right='0px'; break;
            case Anchor.L   : s.position='fixed'; s.top='50%';    s.left='0px';  s.transform='translateY(-50%)';           break;
            case Anchor.CT  : s.position='fixed'; s.top='50%';    s.left='50%';  s.transform='translate3D(-50%, -50%, 0)'; break;
            case Anchor.R   : s.position='fixed'; s.top='50%';    s.right='0px'; s.transform='translateY(-50%)';           break;
            case Anchor.F   : s.position='fixed'; s.top='0';      s.right='0';   s.bottom='0';   s.left='0'; s.width='100%'; s.height='100%';              break;  //
            //case Anchor.F   : s.position='absolute'; s.top='0';      s.right='0';   s.bottom='0';   s.left='0'; s.width='100%'; s.height='100%';              break;  //
        }
        return this;
    }


    /**
     * Set child anchor
     * @param {Anchor} anchor 
    .childTopLeft       {display: flex; justify-content: flex-start;  align-items: flex-start;}
    .childTop           {display: flex; justify-content: center;      align-items: flex-start;}
    .childTopRight      {display: flex; justify-content: flex-end;    align-items: flex-start;}
    .childBottomLeft    {display: flex; justify-content: flex-start;  align-items: flex-end;}
    .childBottom        {display: flex; justify-content: center;      align-items: flex-end;}
    .childBottomRight   {display: flex; justify-content: flex-end;    align-items: flex-end;}
    .childLeft          {display: flex; justify-content: flex-start;  align-items: center;}
    .childCenter        {display: flex; justify-content: center;      align-items: center; flex-direction: column;}
    .childRight         {display: flex; justify-content: flex-end;    align-items: center;}
     */
    setChildAnchor(anchor){
        var s = this.root.style;
        s.display = 'flex';
        switch (anchor){
            case Anchor.TL  : s.flexDirection='row';     s.justifyContent='flex-start';  s.alignItems='flex-start'; break;
            case Anchor.T   : s.flexDirection='row';     s.justifyContent='center';      s.alignItems='flex-start'; break;
            case Anchor.TR  : s.flexDirection='row';     s.justifyContent='flex-end';    s.alignItems='flex-start'; break;
            case Anchor.L   : s.flexDirection='row';     s.justifyContent='flex-start';  s.alignItems='center';     break;
            case Anchor.CT  : s.flexDirection='column';  s.justifyContent='center';      s.alignItems='center';     break;
            case Anchor.R   : s.flexDirection='row';     s.justifyContent='flex-end';    s.alignItems='center';     break;
            case Anchor.BL  : s.flexDirection='row';     s.justifyContent='flex-start';  s.alignItems='flex-end';   break;
            case Anchor.B   : s.flexDirection='row';     s.justifyContent='center';      s.alignItems='flex-end';   break;
            case Anchor.BR  : s.flexDirection='row';     s.justifyContent='flex-end';    s.alignItems='flex-end';   break;
            case Anchor.F   : this.setChildFill();   break;
        }
        return this;
    }

    /** Set child fill parent. Add css. */
    setChildFill(){
        this.root.style.display = 'flex';
        this.root.classList.add('x-container');
        if (this.childStyleTag == null){
            this.childStyleTag = document.createElement('style');
            this.childStyleTag.textContent = `
                x-container > * { flex: 1}
                `;
            this.shadow.appendChild(this.childStyleTag);
        }
    }

    //-----------------------------------------------------
    // Effect
    //-----------------------------------------------------
    /** Set box shadow*/
    setShadow(newValue){
        if (newValue == 'true' || newValue == true)
            this.root.style.boxShadow = '5px 5px 10px lightgray';
        else if (newValue == 'false' || newValue == false)
            this.root.style.boxShadow = '';
        else
            this.root.style.boxShadow = newValue;
        return this;
    }

    /** Set text shadow*/
    setTextShadow(newValue){
        if (newValue == 'true' || newValue == true)
            this.root.style.textShadow = '5px 5px 10px black';
        else if (newValue == 'false' || newValue == false)
            this.root.style.textShadow = '';
        else
            this.root.style.textShadow = newValue;
        return this;
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
        return this;
    }

    /**
     * Set hover opacity color
     * @param {Color} color 
     */
    setHoverOpacity(opacity){
        var element = this.root;
        var oldValue = element.style.opacity;
        var oldCursor = element.style.cursor;
        element.addEventListener('mouseover', function() {
            element.style.opacity = opacity;
            element.style.cursor = 'pointer';
        });
        element.addEventListener('mouseout', function() {
            element.style.opacity = oldValue;
            element.style.cursor = oldCursor;
        });
        return this;
    }
    
    /**
     * Show ripple
     * @param {number} x 
     * @param {number} y 
     */
    showRipple(x, y){
        // style
        if (this._rippleStyle == null){
            this._rippleStyle = document.createElement('style');
            this._rippleStyle.textContent = `
                @keyframes ripple-effect {
                    to { transform: scale(10); opacity: 0;}
                }`;
            this.shadow.appendChild(this._rippleStyle);
        }

        // ripple div
        const ripple = document.createElement('div');
        ripple.style.width = "40px";
        ripple.style.height = "40px";
        ripple.style.borderRadius = "20px";
        ripple.style.position = 'absolute';
        ripple.style.left = `${x-20}px`;
        ripple.style.top  = `${y-20}px`;
        ripple.style.backgroundColor = 'white';
        ripple.style.opacity = '0.9';
        ripple.style.animation = 'ripple-effect 0.3s linear';
        this.root.appendChild(ripple);
        ripple.addEventListener('animationend', function () {
            this.remove();
        });
    }
    
    /**
     * Set visible
     * @param {boolean} newValue 
     */
    setVisible(newValue){
        var b = (newValue=='true' || newValue==true);
        this.root.style.visibility = b ? 'visible' : 'hidden';
        return this;
    }


    /**
     * Set enable. If disable, it become gray, and cannot click. 
     * @param {boolean} b 
     */
    setEnable(b){
        if (b){
            this.root.style.pointerEvents = '';
            this.root.style.filter = '';
        }
        else{
            this.root.style.pointerEvents = 'none';
            this.root.style.filter = 'grayscale(100%)';
        }
        return this;
    }


    //-----------------------------------------------------
    // Event
    //-----------------------------------------------------
    /** Set click event */
    setClick(func){
        this.root.addEventListener('click', ()=>eval(func));
        return this;
    }
    
    //-----------------------------------------------------
    // Attribute change event
    //-----------------------------------------------------
    /**
     * Call when attribute changed 
     * @param {string} name attribute name 
     * @param {string} oldValue old attribute value
     * @param {string} newValue new attribute value
     */
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            // common
            case 'id':                this.root.setAttribute('id', newValue); break;
            case 'class':             this.root.setAttribute('class', newValue); break;
            case 'newclass':          this.root.setAttribute('class', newValue + ' ' + this.root.getAttribute('class')); break;
            case 'z':                 this.root.style.zIndex = newValue; break;
            case 'opacity':           this.root.style.opacity = newValue;  break;
            case 'visible':           this.setVisible(newValue); break;
            case 'overflow':          this.root.style.overflow = newValue; break;
            case 'box':               this.root.style.boxSizing = newValue; break;
            case 'cursor':            this.root.style.cursor = newValue; break;

            // size
            case 'width':             this.root.style.width = newValue;  break;
            case 'height':            this.root.style.height = newValue;  break;
            case 'minwidth':          this.root.style.minWidth = newValue;  break;
            case 'minheight':         this.root.style.minHeight = newValue;  break;

            // position
            case 'anchor':            this.setAnchor(newValue); break;
            case 'childanchor':       this.setChildAnchor(newValue); break;
            case 'position':          this.root.style.position = newValue; break;
            case 'display':           this.root.style.display = newValue; break;
            case 'top':               this.root.style.top = newValue;  break;
            case 'bottom':            this.root.style.bottom = newValue;  break;
            case 'left':              this.root.style.left = newValue;  break;
            case 'right':             this.root.style.right = newValue;  break;
            case 'flex':              this.root.style.flex = newValue;  break;

            // border
            case 'border':            this.root.style.border = newValue;  break;
            case 'borderwidth':       this.root.style.borderWidth = newValue;  break;
            case 'bordercolor':       this.root.style.borderColor = newValue;  break;
            case 'borderstyle':       this.root.style.borderStyle = newValue;  break;
            case 'radius':            this.root.style.borderRadius = newValue;  break;

            // margin & padding
            case 'margin':            this.root.style.margin = newValue;  break;
            case 'padding':           this.root.style.padding = newValue;  break;

            // theme
            case 'theme':             this.setThemeCls(newValue); break;

            // color
            case 'bgcolor':           this.root.style.backgroundColor = newValue;  break;
            case 'hovercolor':        this.setHoverColor(newValue); break;
            case 'background':        this.root.style.background = newValue; break;

            // text
            case 'color':             this.root.style.color = newValue;  break;
            case 'font':              this.root.style.font = newValue;  break;
            case 'fontsize':          this.root.style.fontSize = newValue;  break;
            case 'fontfamily':        this.root.style.fontFamily = newValue;  break;
            case 'fontstyle':         this.root.style.fontStyle = newValue;  break;
            case 'fontweight':        this.root.style.fontWeight = newValue;  break;

            // effect
            case 'shadow':            this.setShadow(newValue); break;
            case 'textshadow':        this.setTextShadow(newValue); break;
            case 'transform':         this.root.style.transform = newValue; break;
            case 'rotate':            this.root.style.transform = `rotate(${newValue}deg)`; break;
            case 'skew':              this.root.style.transform = `skew(${newValue}deg)`; break;
            case 'scale':             this.root.style.transform = `scale(${newValue})`; break;

            // event
            case 'click':             this.setClick(newValue); break;
            case 'draggable':         this.root.setAttribute('draggable', newValue);  // draggable="true"
        }
    }
}
customElements.define("x-rect", Rect);



/************************************************************
 * Circle
 * @example
 *     <x-circle width='100px'></x-circle>
 ***********************************************************/
export class Circle extends Rect {
    constructor() {
        super();
        this.root.style.overflow = 'hidden';
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name){
            case 'width':
                this.root.style.height = this.root.style.width;
                this.root.style.borderRadius = "50%";
                break;
        }
    }    
}
customElements.define("x-circle", Circle);





/***********************************************************
 * Row container
 * @example
 *     <x-row cellmargin="0 20px 0 0" bgcolor="lightgray" margin="0 0 10px 0">
 ***********************************************************/
export class Row extends Rect {
    //constructor(bgcolor='white') {  // 经测试不支持默认参数代入
    constructor() {
        super();
        this.clear();

        // style
        this.styleTag = document.createElement('style');
        this.shadow.appendChild(this.styleTag);

        // root div
        this.root = document.createElement('div');
        this.root.innerHTML = this.innerHTML;   // contain child items
        this.shadow.appendChild(this.root);

        // flex row
        this.root.classList.add('x-container');
        this.root.style.width = '100%';
        this.root.style.height = '100px';
        this.root.style.display = "flex";
        this.root.style.flexDirection = "row";
        //this.root.style.flexWrap = "wrap";
        //this.root.style.alignItems = 'flex-start';
        //this.root.style.justifyContent = 'flex-start';

        // child margin
        this.setGap('0 8px 0 0');
    }

    setGap(val){
        this.styleTag.textContent = `.x-container > *  {margin: ${val} }`;
    }

    static get observedAttributes() {
        return ['gap'].concat(this._attrs);
    }


    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name){
            case 'gap':            
                this.setGap(newValue);
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
export class Column extends Row {
    constructor() {
        super();
        this.root.style.flexDirection = "column";
        this.root.style.width = '';
        this.root.style.height = '100%';
        this.setGap('0 0 8px 0');
    }
}

customElements.define("x-col", Column);



/************************************************************
 * Grid container
 * @example
 *     <x-grid cellmargin="0 0 20px 0">
 ***********************************************************/
export class Grid extends Rect {
    constructor() {
        super();
        this.root.style.display = "grid";
        this.root.style.gap = '10px';
        this.root.style.borderWidth = 0;
        this.root.style.padding = "";
        this.setColumns(4);
    }

    static get observedAttributes() {
        return ['gap', 'columns', 'rows'].concat(this._attrs);
    }

    setColumns(val){ this.root.style.gridTemplateColumns = `repeat(${val}, 1fr)`; }
    setRows(val)   { this.root.style.gridTemplateRows = `repeat(${val}, 1fr)`; }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name){
            case 'gap':             this.root.style.gap = newValue; break;
            case 'columns':         this.setColumns(newValue); break;
            case 'rows':            this.setRows(newValue); break;
        }
    }
}

customElements.define("x-grid", Grid);


/************************************************************
 * Image
 * @example
 *     <x-img></x-img>
 ***********************************************************/
export class Image extends Rect {
    constructor() {
        super();
        //this.shadow = this.attachShadow({mode: 'open'});  // fail
        this.clear();
        this.root = document.createElement("img");
        this.root.innerHTML = this.innerHTML;     // contain child items
        //this.root.style.transition = 'all 0.5s';  // animation
        this.root.style.overflow = 'hidden';
        this.shadow.appendChild(this.root);
    }

    static get observedAttributes() {
        return ['src', 'avatar', 'icon'].concat(this._attrs);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name){
            case 'src':
                this.root.setAttribute('src', newValue);
                break;
            case 'icon':
                this.root.setAttribute('src', XTags.getIconUrl(newValue));
                break;
            case 'avatar':
                if (Boolean(newValue)){
                    this.root.style.height = this.root.style.width;
                    this.root.style.backgroundColor = 'white';
                    this.root.style.padding = '5px';
                    this.root.style.border = '1px solid gray';
                    this.root.style.borderRadius = '50%';
                }
                break;
        }
    }
}
customElements.define("x-img", Image);


/************************************************************
 * Image
 * @example
 *     <x-link></x-link>
 ***********************************************************/
export class Link extends Rect {
    constructor() {
        super();
        //this.shadow = this.attachShadow({mode: 'open'});  // fail
        this.clear();
        this.writeStyleTag();
        this.styleTag.textContent = `
            a { text-decoration: none; color: var(--link-color, blue);}
            a:hover, a:visited { color: var(--link-color, blue);}
            `;
        this.root = document.createElement("a");
        this.root.innerHTML = this.innerHTML;     // contain child items
        this.root.style.transition = 'all 0.5s';  // animation
        this.root.style.overflow = 'hidden';
        this.root.style.textDecoration = 'none';
        this.writeLinkColor('blue');

        this.root.href = this.getAttribute('href');
        this.root.target = this.getAttribute('target');
        this.shadow.appendChild(this.root);
    }

    /**
     * write css with color
     * @param {Color} color 
     */
    writeLinkColor(color){
        //this.root.style['--link-color'] = color;
        this.root.style.setProperty('--link-color', color);
        var o = this.root.style.getPropertyValue('--link-color');
        var s = this.root.style.cssText;
        //this.style.setProperty('--link-hover-color',  color);
        //this.style.setProperty('--link-visited-color', color);
    }


    static get observedAttributes() {
        return ['href', 'target'].concat(this._attrs);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name){
            case 'href':
                this.root.setAttribute('href', newValue);
                break;
            case 'target':
                this.root.setAttribute('target', newValue);
                break;
            case 'color':
                this.writeLinkColor(newValue);
                break;
        }
    }

    /** Set theme. 
     * @param {Theme} t 
    */
    setTheme(t){
        this.writeLinkColor(t.Link);  // TODO：无效？
        //this.root.style.textDecoration = 'none';
        //this.root.style.color = t.Link;
    }

}
customElements.define("x-link", Link);


/***********************************************************
 * Global style
 * @example
 *     <x-style cellmargin="0 20px 0 0" bgcolor="lightgray" margin="0 0 10px 0">
 ***********************************************************/
export class Style extends Rect {
    constructor() {
        super();
        this.clear();

        // style tag
        this.styleTag = document.createElement('style');
        document.head.appendChild(this.styleTag);
        this.styleTag.textContent = `
            :root {
                /* 定义全局变量。组件中可用 var('..')的方式设置值 */
                --box: border-box;
                --transition: 'all 0.5s';
            }
            html,body {
                width: 100%;  height: 100%; /*全屏*/
                padding: 0px; margin: 0px;
            }

            /* 以下没用，传递不到 shadow 里面去*/
            *, *::before, *::after {box-sizing: --box;}
            * {transition: 0.5s;}
        `;

        // apply variant
        this.root = document.body;
    }
}

customElements.define("x-style", Style);


/************************************************************
 * IFrame
 * @example
 *     <x-frame></x-frame>
 ***********************************************************/
export class Frame extends Rect {
    constructor() {
        super();
        this.clear();
        this.root = document.createElement("iframe");
        this.root.innerHTML = this.innerHTML;
        this.root.style.border = '0';
        //this.root.src = this.getAttribute('src');
        this.shadow.appendChild(this.root);
    }

    static get observedAttributes() {
        return ['src'].concat(this._attrs);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name){
            case 'src':
                this.root.src = newValue;
                break;
        }
    }
}


customElements.define("x-frame", Frame);