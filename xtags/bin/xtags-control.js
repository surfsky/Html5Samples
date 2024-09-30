/**
 * xtags control tags.
 * @author surfsky.github.com 2024
 */
import { XTags, Theme, Anchor } from "./xtags-base.js";
import { Rect, Circle, Row, Column, Grid } from "./xtags-baseui.js";


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
        this.shadow.appendChild(this.root);
    }

    static get observedAttributes() {
        return ['src'].concat(this._attrs);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name){
            case 'src':  this.root.src = newValue; break;
        }
    }
}


customElements.define("x-frame", Frame);
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
 * Link
 * @example
 *     <x-link></x-link>
 ***********************************************************/
export class Link extends Rect {
    constructor() {
        super();
        this.clear();

        // a
        this.root = document.createElement("a");
        this.root.innerHTML = this.innerHTML;     // contain child items
        this.root.style.transition = 'all 0.5s';  // animation
        this.root.style.textDecoration = 'none';
        this.shadow.appendChild(this.root);
    }

    /** Set theme. 
    * @param {Theme} t 
    */
    setTheme(t){
        this.writeLinkStyle(t.link, t.linkHover, t.linkVisited);  // TODO：无效？
    }

    /**
     * Write link style.
     * @param {Color} color 
     * @param {Color} hoverColor 
     * @param {Color} visitedColor 
     */
    writeLinkStyle(color, hoverColor, visitedColor){
        if (this.styleTag == null){
            this.styleTag = document.createElement('style');
            this.shadow.appendChild(this.styleTag);
        }
        this.styleTag.textContent = `
            a         { text-decoration: none; color: ${color};}
            a:hover   { text-decoration: none; color: ${hoverColor};}
            a:visited { text-decoration: none; color: ${visitedColor};}
            `;
        // 经测试，不支持动态修改，修改完毕后无法通知应用样式
    }


    /**
     * Set link color style. Notice the visited color can't be changed for safety reason.
     * @param {Color} color 
     * @param {Color} hoverColor 
     * @param {Color} visitedColor 
     */
    setLinkColors(color, hoverColor, visitedColor){
        this.writeLinkStyle(color, hoverColor, visitedColor);

        // 直接修改a标签的文本色彩毫无效果
        //this.root.style.color = color;
        //this.setHoverTextColor(hoverColor);

        //this.root.addEventListener('mouseover', ()=> this.style.color = color);
        //this.root.style['--link-color'] = color;
        //this.root.style.setProperty('--link-color', color);
        //this.shadow.style.setProperty('--link-color', color);
        //var o = this.root.style.getPropertyValue('--link-color');
        //var s = this.root.style.cssText;

        // 动态修改变量毫无效果
        this.root.style.setProperty('--link-color', color);
        this.root.style.setProperty('--hover-color', hoverColor);
        this.root.style.setProperty('--visit-color', visitedColor);
    }


    static get observedAttributes() {
        return ['href', 'target'].concat(this._attrs);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name){
            case 'href':          this.root.setAttribute('href', newValue);          break;
            case 'target':        this.root.setAttribute('target', newValue);        break;
            case 'color':         this.setLinkColors(newValue, newValue, newValue);  break;
        }
    }
}
customElements.define("x-link", Link);



/************************************************************
 * Button
 * @example
 *     <x-btn click='alert("...")' ripple='true'></x-btn>
 * @description
 *     - default theme like bootstrap
 *     - support click disable and become gray
 ***********************************************************/
export class Button extends Rect {
    constructor() {
        super();
        this.root.style.backgroundColor = XTags.theme.primary;
        this.root.style.color  = XTags.theme.light;
        this.root.style.borderRadius = "8px";
        this.root.style.borderWidth = "0px";
        this.root.style.overflow = 'hidden';
        if (this.root.style.boxShadow == '' || this.root.style.boxShadow =='content-box'){
            this.root.style.height = '24px';
        }
        else{
            this.root.style.height = '44px';
        }
        this.setHoverOpacity('0.8');
    }

    setBorderColor(){
        var clr = 'red';  // ok
        var clr1 = XTags.getOpacityColor(this.root.style.backgroundColor, 0.5);  // fail
        var clr2 = XTags.getDarkerColor(this.root.style.backgroundColor, 0.2);   // ok
        var clr3 = XTags.getLighterColor(this.root.style.backgroundColor, 0.5);  // ok
        this.root.style.borderColor = clr2;
    }

    /**
     * Set theme. 
     * @param {Theme} o 
     */
    setTheme(o){
        super.setTheme(o);
        //this.root.style.borderColor = o.Border;
        this.root.style.borderRadius = o.radius;
        this.root.style.color = o.light;
        this.setBorderColor();
    }
    
    /**
     * Set click event overridde
     */
    setClick(func){
        this.root.addEventListener('click', async (e)=>{
            if (this._showRipple){
                var x = e.offsetX;
                var y = e.offsetY;
                this.showRipple(x, y);
            }
            this.setEnable(false);
            await XTags.delay(100);
            eval(func);
            this.setEnable(true);
    });
    }

    setRipple(b){
        this._showRipple = Boolean(b);
    }


    static get observedAttributes() {
        return ['ripple'].concat(this._attrs);
    }


    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch(name){
            case 'ripple':
                this.setRipple(newValue);
                break;
        }
    }

}

customElements.define("x-btn", Button);


/************************************************************
 * Toast
 * @example
 *     Toast.show('info', 'message info');
 ***********************************************************/
export class Toast{
    /**
     * Show toast
     * @param {string} icon iconname without extension
     * @param {string} text information 
     */
    static async show(text, icon='white-bulb'){
        var toast = new Rect()
            .setSize('400px', '26px')
            .setRadius('6px')
            .setColors(XTags.theme.success, XTags.theme.light)
            //.setShadow(true)
            .setAnchor(Anchor.T)
            .setChildAnchor(Anchor.CT)
            .setInnerHTML(`<x-row height="100%"><img src='${XTags.getIconUrl(icon)}' width='24px'/><div>${text}<div></x-row>`)
            ;
        toast.style.border = '0';
        toast.style.top = '-100px';
        document.body.appendChild(toast);
        await XTags.delay(50);
        toast.style.top = '25px';
        await XTags.delay(2000);
        toast.style.top = '-100px';
        await XTags.delay(1000);
        document.body.removeChild(toast);
    }
}

/************************************************************
 * Tooltip
 * @example
 *     Tooltip.show(ele, 'message info');
 *     Tooltip.hide();
 ***********************************************************/
export class Tooltip {
    /** Bind all matched elements to show tooltip with element's textcontent 
     * @param {string} selector Element selector 
    */
    static bind(selector){
        const elements = document.querySelectorAll(selector);
        elements.forEach(ele => {
            var o = (ele.root == null) ? ele : ele.root;
            o.addEventListener('mouseover', () => Tooltip.show(ele));
            o.addEventListener('mouseout',  () => Tooltip.hide());
        });
    }

    /**
     * Show tooltip under element. If text is null, show element's text content.
     * @param {Tag} element 
     * @param {string} text 
     */
    static show(element, text="") {
        if (text == "") text = element.textContent;
        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.display = 'block';
        tooltip.style.position = "absolute";
        tooltip.style.backgroundColor = "#f9f9f9";
        tooltip.style.border= "1px solid #ccc";
        tooltip.style.borderRadius = '4px';
        tooltip.style.padding= "5px";
        tooltip.style.zIndex= "999";
        tooltip.style.left = element.offsetLeft + 'px';
        tooltip.style.top  = element.offsetTop + element.offsetHeight + 'px';
        document.body.appendChild(tooltip);
    }

    /** Hide tooltip */
    static hide() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip != null)
            document.body.removeChild(tooltip);
    }
}