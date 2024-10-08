/**
 * xtags control tags.
 * @author surfsky.github.com 2024
 */
import { XTags, Tag, Style, Theme, Anchor } from "./xtags-base.js";
import { Rect, Circle, Row, Column, Grid } from "./xtags-baseui.js";


/************************************************************
 * IFrame
 * @example
 *     <x-frame></x-frame>
 ***********************************************************/
export class Frame extends Tag {
    constructor() {
        super();
        this.clear();
        this.root = document.createElement("iframe");
        this.root.innerHTML = this.innerHTML;
        this.root.style.border = '0';
        this.shadowRoot.appendChild(this.root);
    }

    static get observedAttributes() {
        return ['src'].concat(this._attrs);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'src': this.root.src = newValue; break;
        }
    }
}
customElements.define("x-frame", Frame);



/************************************************************
 * Image
 * @example
 *     <x-img></x-img>
 ***********************************************************/
export class Image extends Tag {
    constructor() {
        super();
        //this.shadow = this.attachShadow({mode: 'open'});  // fail
        this.clear();
        this.root = document.createElement("img");
        this.root.innerHTML = this.innerHTML;     // contain child items
        //this.root.style.transition = 'all 0.5s';  // animation
        this.root.style.overflow = 'hidden';
        this.shadowRoot.appendChild(this.root);
    }

    static get observedAttributes() {
        return ['src', 'avatar', 'icon'].concat(this._attrs);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'src':
                this.root.setAttribute('src', newValue);
                break;
            case 'icon':
                this.root.setAttribute('src', XTags.getIconUrl(newValue));
                break;
            case 'avatar':
                if (Boolean(newValue)) {
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
export class Link extends Tag {
    constructor() {
        super();
        this.clear();

        // a
        this.root = document.createElement("a");
        this.root.innerHTML = this.innerHTML;     // contain child items
        this.root.style.transition = 'all 0.5s';  // animation
        this.root.style.textDecoration = 'none';
        this.shadowRoot.appendChild(this.root);
    }

    /** Set theme. 
    * @param {Theme} t 
    */
    setTheme(t) {
        this.writeLinkStyle(t.link, t.linkHover, t.linkVisited);  // TODO：无效？
    }

    /**
     * Write link style.
     * @param {Color} color 
     * @param {Color} hoverColor 
     * @param {Color} visitedColor 
     */
    writeLinkStyle(color, hoverColor, visitedColor) {
        if (this.styleTag == null) {
            this.styleTag = document.createElement('style');
            this.shadowRoot.appendChild(this.styleTag);
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
    setLinkColors(color, hoverColor, visitedColor) {
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
        switch (name) {
            case 'href': this.root.setAttribute('href', newValue); break;
            case 'target': this.root.setAttribute('target', newValue); break;
            case 'color': this.setLinkColors(newValue, newValue, newValue); break;
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
        this.root.style.color = XTags.theme.light;
        this.root.style.borderRadius = "8px";
        this.root.style.borderWidth = "0px";
        this.root.style.overflow = 'hidden';
        this.root.style.height = this.root.style.boxSizing=='border-box' ? '44px' : '24px';
        this.root.style.width = this.root.style.boxSizing=='border-box' ? '120px' : '100px';
        this.setHoverOpacity('0.8');
    }

    setBorderColor() {
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
    setTheme(o) {
        super.setTheme(o);
        //this.root.style.borderColor = o.Border;
        this.root.style.borderRadius = o.radius;
        this.root.style.color = o.light;
        this.setBorderColor();
    }

    /**
     * Set click event overridde
     */
    setClick(func) {
        this.root.addEventListener('click', async (e) => {
            if (this._showRipple) {
                var x = e.offsetX;
                var y = e.offsetY;
                this.showRipple(x, y);
            }
            this.setEnable(false);
            await XTags.sleep(100);
            eval(func);
            this.setEnable(true);
        });
    }

    setRipple(b) {
        this._showRipple = Boolean(b);
    }


    static get observedAttributes() {
        return ['ripple'].concat(this._attrs);
    }


    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'ripple':
                this.setRipple(newValue);
                break;
        }
    }

}

customElements.define("x-btn", Button);


/************************************************************
 * Mask
 * @example
 *     Mask.show(100);
 *     Mask.hide();
 ***********************************************************/
export class Mask {
    static async show(z = 99) {
        if (this.overlay == null) {
            this.overlay = document.createElement('div');
            this.overlay.style.position = 'fixed';
            this.overlay.style.top = 0;
            this.overlay.style.left = 0;
            this.overlay.style.width = '100%';
            this.overlay.style.height = '100%';
            this.overlay.style.display = 'none';
            this.overlay.style.transition = 'all 0.5s';
            this.overlay.style.zIndex = z;
            document.body.appendChild(this.overlay);
        }
        this.overlay.style.display = 'block';
        //this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
        await XTags.sleep(50);
        this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    }

    static async hide() {
        if (this.overlay != null) {
            this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
            await XTags.sleep(500);
            this.overlay.style.display = 'none';
            document.body.removeChild(this.overlay);
            this.overlay = null;
        }
    }
}



/************************************************************
 * Toast
 * @example
 *     Toast.show('info', 'message info');
 ***********************************************************/
export class Toast {
    /**
     * Show toast
     * @param {string} icon iconname without extension
     * @param {string} text information 
     */
    static async show(text, icon = 'white-bulb') {
        var toast = new Rect()
            .setSize('400px', '36px')
            .setRadius('6px')
            .setColors(XTags.theme.success, XTags.theme.light)
            .setAnchor(Anchor.T)
            .setChildAnchor(Anchor.C)
            ;
        toast.content = `<x-row height="100%"><img src='${XTags.getIconUrl(icon)}' width='20px'/><div>${text}<div></x-row>`;
        toast.style.height = toast.style.boxSizing=='border-box' ? '30px' : '26px';
        toast.style.opacity = 0.8;
        toast.style.border = '0';
        toast.style.top = '-100px';
        document.body.appendChild(toast);
        await XTags.sleep(50);
        toast.style.top = '25px';
        await XTags.sleep(2000);
        toast.style.top = '-100px';
        await XTags.sleep(1000);
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
    static bind(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(ele => {
            var o = (ele.root == null) ? ele : ele.root;
            o.addEventListener('mouseover', () => Tooltip.show(ele));
            o.addEventListener('mouseout', () => Tooltip.hide());
        });
    }

    /**
     * Show tooltip under element. If text is null, show element's text content.
     * @param {Tag} element 
     * @param {string} text 
     */
    static show(element, text = "") {
        if (text == "") text = element.textContent;
        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.display = 'block';
        tooltip.style.position = "absolute";
        tooltip.style.backgroundColor = "#f9f9f9";
        tooltip.style.border = "1px solid #ccc";
        tooltip.style.borderRadius = '4px';
        tooltip.style.padding = "5px";
        tooltip.style.zIndex = "999";
        tooltip.style.left = element.offsetLeft + 'px';
        tooltip.style.top = element.offsetTop + element.offsetHeight + 'px';
        document.body.appendChild(tooltip);
    }

    /** Hide tooltip */
    static hide() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip != null)
            document.body.removeChild(tooltip);
    }
}


/************************************************************
 * Dialog
 * @example
 *     Dialog.show();
 *     Dialog.close();
 ***********************************************************/
export class Dialog extends Rect {
    constructor() {
        super();
        this.clear();
        //const shadow = this.attachShadow({ mode: 'open' });

        // 内联样式
        const style = document.createElement('style');
        style.textContent = `
          /* popup layer */
          .popup {
              position: absolute;
              background-color: white;
              padding: 40px 20px 20px 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
              display: none;
              overflow: auto;
              box-sizing: border-box;
              width: 500px;
              height: 400px;
              z-index: 999;
              transition = 'all 0.5s';
            }
          .popup-content {
              text-align: center;
              user-select: none;
            }
          /* close button */
          .btn-close {
              position: absolute;
              top: 10px;
              right: 10px;
              cursor: pointer;
              user-select: none;
            }
          /* resizers */
          .resizer {
              position: absolute;
              cursor: pointer;
            }
          .resizer-top {
              top: 0;
              left: 0;
              right: 0;
              height: 10px;
              cursor: ns-resize;
            }
          .resizer-bottom {
              bottom: 0;
              left: 0;
              right: 0;
              height: 10px;
              cursor: ns-resize;
            }
          .resizer-left {
              top: 0;
              bottom: 0;
              left: 0;
              width: 10px;
              cursor: ew-resize;
            }
          .resizer-right {
              top: 0;
              bottom: 0;
              right: 0;
              width: 10px;
              cursor: ew-resize;
            }
          .resizer-topleft {
              top: 0;
              left: 0;
              width: 10px;
              height: 10px;
              cursor: nwse-resize;
            }
          .resizer-topright {
              top: 0;
              right: 0;
              width: 10px;
              height: 10px;
              cursor: nesw-resize;
            }
          .resizer-bottomleft {
              bottom: 0;
              left: 0;
              width: 10px;
              height: 10px;
              cursor: nesw-resize;
            }
          .resizer-bottomright {
              bottom: 0;
              right: 0;
              width: 10px;
              height: 10px;
              cursor: nwse-resize;
            }
          `;
        this.shadowRoot.appendChild(style);

        // popup
        this.root = document.createElement('div');
        this.root.classList.add('popup');
        this.shadowRoot.appendChild(this.root);

        // close button
        const closeButton = document.createElement('span');
        closeButton.classList.add('btn-close');
        closeButton.textContent = '×';
        closeButton.addEventListener('click', () => this.close());
        this.root.appendChild(closeButton);

        // content
        this.contentDiv = document.createElement('div');
        this.contentDiv.classList.add('popup-content');
        this.contentDiv.innerHTML = this.innerHTML;
        this.root.appendChild(this.contentDiv);

        // resizer
        const resizerTop = document.createElement('div');
        resizerTop.classList.add('resizer', 'resizer-top');
        this.root.appendChild(resizerTop);
        const resizerBottom = document.createElement('div');
        resizerBottom.classList.add('resizer', 'resizer-bottom');
        this.root.appendChild(resizerBottom);
        const resizerLeft = document.createElement('div');
        resizerLeft.classList.add('resizer', 'resizer-left');
        this.root.appendChild(resizerLeft);
        const resizerRight = document.createElement('div');
        resizerRight.classList.add('resizer', 'resizer-right');
        this.root.appendChild(resizerRight);
        const resizerTopLeft = document.createElement('div');
        resizerTopLeft.classList.add('resizer', 'resizer-topleft');
        this.root.appendChild(resizerTopLeft);
        const resizerTopRight = document.createElement('div');
        resizerTopRight.classList.add('resizer', 'resizer-topright');
        this.root.appendChild(resizerTopRight);
        const resizerBottomLeft = document.createElement('div');
        resizerBottomLeft.classList.add('resizer', 'resizer-bottomleft');
        this.root.appendChild(resizerBottomLeft);
        const resizerBottomRight = document.createElement('div');
        resizerBottomRight.classList.add('resizer', 'resizer-bottomright');
        this.root.appendChild(resizerBottomRight);

        // mouse, popup, handler
        let rawX, rawY;
        let rawTop, rawLeft, rawWidth, rawHeight;
        let handler = '';

        // mouse down to record data
        this.root.addEventListener('mousedown', (e) => {
            rawX = e.clientX;
            rawY = e.clientY;
            rawTop    = this.root.offsetTop;
            rawLeft   = this.root.offsetLeft;
            rawWidth  = this.root.offsetWidth;
            rawHeight = this.root.offsetHeight;

            if (e.target.classList.contains('resizer-topleft')) {
                handler = 'TL';
                document.documentElement.style.cursor = 'nwse-resize';
            } else if (e.target.classList.contains('resizer-topright')) {
                handler = 'TR';
                document.documentElement.style.cursor = 'nesw-resize';
            } else if (e.target.classList.contains('resizer-bottomleft')) {
                handler = 'BL';
                document.documentElement.style.cursor = 'nesw-resize';
            } else if (e.target.classList.contains('resizer-bottomright')) {
                handler = 'BR';
                document.documentElement.style.cursor = 'nwse-resize';
            } else if (e.target.classList.contains('resizer-top')) {
                handler = 'T';
                document.documentElement.style.cursor = 'ns-resize';
            } else if (e.target.classList.contains('resizer-bottom')) {
                handler = 'B';
                document.documentElement.style.cursor = 'ns-resize';
            } else if (e.target.classList.contains('resizer-left')) {
                handler = 'L';
                document.documentElement.style.cursor = 'ew-resize';
            } else if (e.target.classList.contains('resizer-right')) {
                handler = 'R';
                document.documentElement.style.cursor = 'ew-resize';
            } else {
                handler = 'DRAG';
                document.documentElement.style.cursor = 'pointer';
            }

            console.log(`DOWN : (${rawLeft}, ${rawTop}, ${rawWidth}, ${rawHeight}), (${rawX}, ${rawY}), ${handler}`);
        });

        // mouse move to drag or resize
        document.addEventListener('mousemove', (e) => {
            if (handler === '') return;

            let dx = e.clientX - rawX;
            let dy = e.clientY - rawY;
            switch (handler) {
                case 'DRAG':
                    this.root.style.left = rawLeft + dx + 'px';
                    this.root.style.top = rawTop + dy + 'px';
                    break;
                case 'TL':
                    this.root.style.left = rawLeft + dx + 'px';
                    this.root.style.top = rawTop + dy + 'px';
                    this.root.style.width = rawWidth - dx + 'px';
                    this.root.style.height = rawHeight - dy + 'px';
                    break;
                case 'T':
                    this.root.style.top = rawTop + dy + 'px';
                    this.root.style.height = rawHeight - dy + 'px';
                    break;
                case 'TR':
                    this.root.style.top = rawTop + dy + 'px';
                    this.root.style.width = rawWidth + dx + 'px';
                    this.root.style.height = rawHeight - dy + 'px';
                    break;
                case 'L':
                    this.root.style.left = rawLeft + dx + 'px';
                    this.root.style.width = rawWidth - dx + 'px';
                    break;
                case 'R':
                    this.root.style.width = rawWidth + dx + 'px';
                    break;
                case 'BL':
                    this.root.style.left = rawLeft + dx + 'px';
                    this.root.style.width = rawWidth - dx + 'px';
                    this.root.style.height = rawHeight + dy + 'px';
                    break;
                case 'B':
                    this.root.style.height = rawHeight + dy + 'px';
                    break;
                case 'BR':
                    this.root.style.width = rawWidth + dx + 'px';
                    this.root.style.height = rawHeight + dy + 'px';
                    break;
            }

            console.log(`${handler} : (${dx}, ${dy}), (${this.root.offsetLeft}, ${this.root.offsetTop}, ${this.root.offsetWidth}, ${this.root.offsetHeight}), (${e.clientX}, ${e.clientY})`);
        });

        // mouse up to clear
        document.addEventListener('mouseup', () => {
            handler = '';
            document.documentElement.style.cursor = 'auto';
        });
    }

    /**Show dialog with mask and center in screen*/
    show(model=true, width='600px', height='400px') {
        if (model)
            Mask.show();
        this.root.style.width = width;
        this.root.style.height = height;
        this.shadowRoot.querySelector('.popup').style.display = 'block';
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const root = this.shadowRoot.querySelector('.popup');
        const popupWidth = root.offsetWidth;
        const popupHeight = root.offsetHeight;
        root.style.left = (viewportWidth - popupWidth) / 2 + 'px';
        root.style.top = (viewportHeight - popupHeight) / 2 + 'px';
    }

    /**Close dialog*/
    close() {
        Mask.hide();
        this.shadowRoot.querySelector('.popup').style.display = 'none';
        //this.remove();
    }

    /*Content*/
    get content() { return this.contentDiv.innerHTML; }
    set content(val) { this.contentDiv.innerHTML = val; }

    /*Width*/
    get width() { return this.root.style.width;}
    set width(val) { this.root.style.width = val;}
    get height() { return this.root.style.height;}
    set height(val) { this.root.style.height = val;}
}

customElements.define('x-dialog', Dialog);


/************************************************************
 * MessageBox
 * @example
 *     MessageBox.show('info', 'message info');
 ***********************************************************/
export class MessageBox {
    /**
     * Show toast
     * @param {string} icon iconname without extension
     * @param {string} text information 
     */
    static async show(text, icon = 'black-bulb') {
        const dlg = document.createElement('x-dialog');
        dlg.content = `
            <img src='${XTags.getIconUrl(icon)}' width='24px'/>
            <p>${text}</p>
            `;
        document.body.appendChild(dlg);
        dlg.show(false, '500px', '150px');
    }
}

