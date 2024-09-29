/**
 * xtags control tags.
 * @author surfsky.github.com 2024
 */
import { XTags, Theme, Anchor } from "./xtags-base.js";
import { Rect, Circle, Row, Column, Grid, Image } from "./xtags-baseui.js";



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
     * @param {string} info information 
     */
    static async show(icon, info){
        var toast = new Rect()
            .setSize('400px', '26px')
            .setRadius('6px')
            .setColors(XTags.theme.success, XTags.theme.light)
            //.setShadow(true)
            .setAnchor(Anchor.T)
            .setChildAnchor(Anchor.CT)
            .setInnerHTML(`<x-row height="100%"><img src='${XTags.getIconUrl(icon)}' width='24px'/><div>${info}<div></x-row>`)
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