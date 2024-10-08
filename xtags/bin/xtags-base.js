/**
 * xtags common class.
 * @author surfsky.github.com 2024
 */


/************************************************************
 * Align enum for anchor and childAnchor
 ***********************************************************/
export const Anchor = {
  TL: 'topLeft',
  T:  'top',
  TR: 'topRight',
  L:  'left',
  C:  'center',
  R:  'right',
  BL: 'bottomLeft',
  B:  'bottom',
  BR: 'bottomRight',
  F:  'fill'
};


/************************************************************
 * Theme
 ***********************************************************/
export class Theme{
    constructor(opt) {
        this.name        = opt.name;
        this.background  = opt.background;
        this.text        = opt.text;
        this.link        = opt.link;
        this.linkHover   = opt.linkHover;
        this.linkVisited = opt.linkVisited;
        this.primary     = opt.primary;
        this.secondary   = opt.secondary;
        this.success     = opt.success;
        this.info        = opt.info;
        this.warning     = opt.warning;
        this.danger      = opt.danger;
        this.dark        = opt.dark;
        this.light       = opt.light;
        this.border      = opt.border;
        this.radius      = opt.radius;
    }

    /** Theme light*/
    static themeLight = new Theme({
        name        : 'iOSLight',
        background  : 'white',
        text        : 'black',
        link        : 'blue',
        linkHover   : 'darkblue',
        linkVisited : 'gray',
        primary     : '#007bff',
        secondary   : '#7633d4',
        success     : '#28a745',
        info        : '#17a2b8',
        warning     : '#ffc107',
        danger      : '#dc3545',
        dark        : '#343a40',
        light       : '#f8f9fa',
        border      : '#cdcdcd',
        radius      : '8px',
    });

    /** Theme dark */
    static themeDark = new Theme({
        name        : 'MaterialDark',
        background  : '#171717',
        text        : '#cccccc',
        link        : 'red',
        linkHover   : 'darkred',
        linkVisited : 'gray',
        primary     : '#007bff',
        secondary   : '#6c757d',
        success     : '#28a745',
        info        : '#17a2b8',
        warning     : '#ffc107',
        danger      : '#dc3545',
        dark        : '#343a40',
        light       : '#f8f9fa',
        border      : '#707070',
        radius      : '8px',
    });
}


/** Theme interface */
class ITheme{
    /**
     * Set theme
     * @param {Theme} theme 
     */
    setTheme(theme)
    {
        throw new Error('Un implemented.');
    }
}


/************************************************************
 * XTags utils
 ***********************************************************/
export class XTags {
    /** Icon root path*/
    static iconRoot = "../icons/";


    //-----------------------------------------
    // Common
    //-----------------------------------------
    /**
     * async/await delay 
     * @param {number} ms
     * @example await delay(20);
     */
    static sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /** Change func to async promise. eg. await toPromise(func); */
    static toPromise(func){
      return new Promise((resolve) => {
        func(); 
        resolve();
      });
    }

    /** Get element by class or id */
    static ele(selector){
        return document.querySelector(selector);
    }

    /** Get all elements by class or id */
    static eles(selector){
       return document.querySelectorAll(selector);
    }

    /** Get view width */
    static get viewWidth() { return  window.innerWidth || document.documentElement.clientWidth;}

    /** Get view height */
    static get viewHeight() { return window.innerHeight || document.documentElement.clientHeight;}

    /** Center element in window */
    static centerlize(selector){
      const popup = document.querySelector(selector);
      const viewportWidth = this.viewWidth;   //window.innerWidth || document.documentElement.clientWidth;
      const viewportHeight = this.viewHeight; //window.innerHeight || document.documentElement.clientHeight;
      const popupWidth = popup.offsetWidth;
      const popupHeight = popup.offsetHeight;
      popup.style.transtion = '';
      popup.style.left = (viewportWidth - popupWidth) / 2 + 'px';
      popup.style.top = (viewportHeight - popupHeight) / 2 + 'px';
      popup.style.display = 'block';
    }

    /** Calculate element's real pixel number 
     * @param {string} num css number expression, eg. 12px, 1em, 1rem
     * @param {Element} element when num is em, we need this parameter to calculate by parent node's size. 
    */
    calcPx(num, element=null){
      if (num.endsWith('px')) {
        return parseInt(num, 10);
      } else if (num.endsWith('rem')) {
        const rootFontSize = parseInt(getComputedStyle(document.documentElement).fontSize, 10);
        return parseInt(num, 10) * rootFontSize;
      } else if (num.endsWith('em')) {
        const parentFontSize = parseInt(getComputedStyle(element.parentNode).fontSize, 10);
        return parseInt(num, 10) * parentFontSize;
      }
      return 0;
    }

    /**Get element's real bound */
    getBound(ele){
      return ele.getBoundingClientRect();
    }


    //-----------------------------------------
    // Theme
    //-----------------------------------------
    /** Global Theme*/
    static theme = Theme.themeLight;

    /**
     * Set page theme.
     * @param {Theme} theme 
     */
    static setTheme(theme){
        this.theme = theme;
        //var tags = document.querySelectorAll('[tagName^="X-"]');  // not support
        //if (tags.length === 0) {
        //    tags = Array.from(document.querySelectorAll('*'));
        //    tags = tags.filter(element => element.nodeName.startsWith('X-'));  // notice: will upper
        //}
        var tags = Array.from(document.querySelectorAll('*'));
        tags.forEach(tag => {
            if (tag.setTheme != undefined){
              tag.setTheme(theme);
          }
        });
        //document.dispatchEvent(new Event('stylechange'));  // 应用新样式
    }



    //-----------------------------------------
    // Icon
    //-----------------------------------------
    /** Get icon url from icons root and icon name */
    static getIconUrl(name){
        if (name.includes('.'))
            return this.iconRoot + name;
        return `${this.iconRoot}${name}.png`;
    }


    //-----------------------------------------
    // Color
    //-----------------------------------------
    /** Build random color */
    static getRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
  }

    /** Build opacity color */
    static getOpacityColor(rawColor, opacity) {
        var clr = this.parseColor(rawColor);
        if (clr!= null)
          return `rgba(${clr.r}, ${clr.g}, ${clr.b}, ${opacity})`;
        return 'white';
    }

    /** Build lighter color */
    static getLighterColor(color, factor = 0.5) {
        const rgb = this.parseColor(color);
        if (!rgb) return null;
      
        const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor));
        const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor));
        const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor));
      
        if (rgb.hasOwnProperty('a')) {
          return `rgba(${r}, ${g}, ${b}, ${rgb.a})`;
        } else {
          return `rgb(${r}, ${g}, ${b})`;
        }
      }
      
    /** Build darker color */
    static getDarkerColor(color, factor = 0.5) {
        const rgb = this.parseColor(color);
        if (!rgb) return null;
      
        const r = Math.max(0, Math.round(rgb.r * (1 - factor)));
        const g = Math.max(0, Math.round(rgb.g * (1 - factor)));
        const b = Math.max(0, Math.round(rgb.b * (1 - factor)));
      
        if (rgb.hasOwnProperty('a')) {
          return `rgba(${r}, ${g}, ${b}, ${rgb.a})`;
        } else {
          return `rgb(${r}, ${g}, ${b})`;
        }
      }

    static parseColor(colorStr) {
        let rgb;
        if (colorStr.startsWith('#')) {
          rgb = this.hexToRgb(colorStr);
        } else if (colorStr.startsWith('rgb(')) {
          rgb = this.rgbFromRgbExpression(colorStr);
        } else if (colorStr.startsWith('rgba(')) {
          rgb = this.rgbaFromRgbaExpression(colorStr);
        } else {
          return null;
        }
        return rgb;
    }
      
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
            }
            : null;
    }
      
    static rgbFromRgbExpression(rgbExpression) {
        const values = rgbExpression.match(/\d+/g);
        return values
            ? {
              r: parseInt(values[0]),
              g: parseInt(values[1]),
              b: parseInt(values[2]),
            }
            : null;
    }
      
    static rgbaFromRgbaExpression(rgbaExpression) {
        const values = rgbaExpression.match(/[\d.]+/g);
        return values
            ? {
              r: parseInt(values[0]),
              g: parseInt(values[1]),
              b: parseInt(values[2]),
              a: parseFloat(values[3]),
            }
            : null;
      }

    /** TODO: Create unique id */
    static uuid(){
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
}




/************************************************************
 * Rectangle
 * @example  <x-rect width="100px" height="100px" bgcolor="green" color="white" radius="10px" borderwidth="2px" bordercolor="yellow" borderstyle="solid" ></rect-tag>
 * @author surfsky.github.com 2024
 * @property {string} theme Set theme such as primary, secondary, success...
 ***********************************************************/
export class Tag extends HTMLElement {
    //-----------------------------------------------------
    // Constructor
    //-----------------------------------------------------
    // supported attribute. Notice these names must be all small chars.
    static _attrs = [
        'id', 'name', 'class', 'newclass', 'z', 'opacity', 'visible', 'overflow', 'cursor',
        'box', 'margin', 'padding',
        'width', 'height', 'minwidth', 'minheight', 'maxwidth', 'maxheight',
        'position', 'anchor', 'top', 'bottom', 'left', 'right',  
        'display', 'childanchor', 'textalign', 
        'flex', 'gridcolumn',
        'border', 'borderwidth', 'bordercolor', 'borderstyle', 'radius',  
        'background','bgcolor', 'hoverbgcolor', 'theme', 
        'color', 'hovercolor', 'font', 'fontsize', 'fontfamily', 'fontstyle', 'fontweight',
        'shadow', 'transform', 'rotate', 'scale', 'skew', 'textshadow',
        'click', 'draggable'
    ];


    /**Constructor. Build a frame rectangle with content in center.*/
    constructor() {
        super();
        this.useShadow = false;  // use shadow or body to create element
        this.attachShadow({mode: 'open'});
        this.root = this.createRoot();
        this.styleTag = this.createStyle();
        this.saveRoot();
        this.saveStyle();
    }

    /**Create root element(virtual function) */
    createRoot(){
        var ele = document.createElement("div");
        ele.innerHTML = this.innerHTML;      // contain child items
        ele.style.boxSizing = 'border-box';  // size = content + padding + border, margin is outside.
        ele.style.transition = 'all 0.5s';   // animation
        return ele;
    }

    /**Create style element(virtual function) */
    createStyle(){
        return null;
    }

    /**Get or build uuid id. */
    getId(){
        var id = this.getAttribute('id');
        if (id == null) id = XTags.uuid();
        return id;
    }

    /**Save root element. */
    saveRoot(){
        if (this.root == null) return;
        if (this.useShadow){
            this.shadowRoot.appendChild(this.root);
        }
        else{
            // replace inplace
            const parent = this.parentNode;
            if (parent != null){
                const index = Array.from(parent.children).indexOf(this);
                parent.removeChild(this);
                parent.insertBefore(this.root, parent.children[index]);
            }
        }
    }

    /** Save styleTage element */
    saveStyle(){
        if (this.styleTag == null) return;
        if (this.useShadow){
            this.shadowRoot.appendChild(this.styleTag);
        }
        else{
            document.head.appendChild(this.styleTag);
        }
    }



    /**Support attributes.*/
    static get observedAttributes() {
        return this._attrs;
    }

    //-----------------------------------------------------
    // Property Getter & Setter
    //-----------------------------------------------------
    /** This root div's style */
    get style(){
        return this.root.style;
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
          case Anchor.TL  : s.position='absolute'; s.top='0px';    s.left='0px';  break;
          case Anchor.T   : s.position='absolute'; s.top='0px';    s.left='50%';  s.transform='translateX(-50%)';break;
          case Anchor.TR  : s.position='absolute'; s.top='0px';    s.right='0px'; break;
          case Anchor.BL  : s.position='absolute'; s.bottom='0px'; s.left='0px';  break;
          case Anchor.B   : s.position='absolute'; s.bottom='0px'; s.left='50%';  s.transform='translateX(-50%)'; break;
          case Anchor.BR  : s.position='absolute'; s.bottom='0px'; s.right='0px'; break;
          case Anchor.L   : s.position='absolute'; s.top='50%';    s.left='0px';  s.transform='translateY(-50%)';           break;
          case Anchor.C   : s.position='absolute'; s.top='50%';    s.left='50%';  s.transform='translate3D(-50%, -50%, 0)'; break;
          case Anchor.R   : s.position='absolute'; s.top='50%';    s.right='0px'; s.transform='translateY(-50%)';           break;
          case Anchor.F   : s.position='absolute'; s.top='0';      s.right='0';   s.bottom='0';   s.left='0'; s.width='100%'; s.height='100%';              break;  //
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
      if (anchor == null || anchor == ""){
          s.display = '';
          s.flexDirection  = '';     
          s.justifyContent = '';  
          s.alignItems = '';
      }
      else{
          s.display = 'flex';
          switch (anchor){
              case Anchor.TL  : s.flexDirection='row';     s.justifyContent='flex-start';  s.alignItems='flex-start'; break;
              case Anchor.T   : s.flexDirection='row';     s.justifyContent='center';      s.alignItems='flex-start'; break;
              case Anchor.TR  : s.flexDirection='row';     s.justifyContent='flex-end';    s.alignItems='flex-start'; break;
              case Anchor.L   : s.flexDirection='row';     s.justifyContent='flex-start';  s.alignItems='center';     break;
              case Anchor.C   : s.flexDirection='column';  s.justifyContent='center';      s.alignItems='center';     break;
              case Anchor.R   : s.flexDirection='row';     s.justifyContent='flex-end';    s.alignItems='center';     break;
              case Anchor.BL  : s.flexDirection='row';     s.justifyContent='flex-start';  s.alignItems='flex-end';   break;
              case Anchor.B   : s.flexDirection='row';     s.justifyContent='center';      s.alignItems='flex-end';   break;
              case Anchor.BR  : s.flexDirection='row';     s.justifyContent='flex-end';    s.alignItems='flex-end';   break;
              case Anchor.F   : this.setChildFill();   break;
          }
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
          this.shadowRoot.appendChild(this.childStyleTag);
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
  setHoverBgColor(color){
      var oldColor  = this.root.style.backgroundColor;
      var oldCursor = this.root.style.cursor;
      this.root.addEventListener('mouseover', () => {
        this.root.style.backgroundColor = color;
        this.root.style.cursor = 'pointer';
      });
      this.root.addEventListener('mouseout', () => {
        this.root.style.backgroundColor = oldColor;
        this.root.style.cursor = oldCursor;
      });
      return this;
  }

  /**
   * Set hover text color
   * @param {Color} color 
   */
  setHoverTextColor(color){
      var element = this.root;
      var oldColor = element.style.Color;
      var oldCursor = element.style.cursor;
      element.addEventListener('mouseover', function() {
          element.style.Color = color;
          element.style.cursor = 'pointer';
      });
      element.addEventListener('mouseout', function() {
          element.style.Color = oldColor;
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
          this.shadowRoot.appendChild(this._rippleStyle);
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
          this.root.disabled = false;
          this.root.style.pointerEvents = '';
          this.root.style.filter = '';
      }
      else{
          this.root.disabled = true;
          this.root.style.pointerEvents = 'none';
          this.root.style.filter = 'grayscale(100%)';
      }
      return this;
  }

  /**
   * Set draggable
   * @param {boolean} b 
   */
  setDraggable(b){
      this.root.draggable = b;
      if (b){
          // TODO：根据当前位置拖动div位置
      }
      return this;
  }

  /**
   * Make animation
   * @param {function} animFunc  target animation function. eg. this.style.height='0px';
   * @param {function} endFunc callback animation when finished. eg. this.style.visibility = 'hidden';
   * @param {number} second animation duration seconds
   * @param {string} [easing='ease'] easing animation name 
   * @example tag.animate((ele)=> ele.style.height = '0px');
   */
  animate(animFunc, endFunc=null, second=0.1, easing='ease'){
      this.root.style.transition = `all ${second}s ${easing}`;
      if (endFunc != null)
        this.root.addEventListener('transitionend', () => endFunc(this.root), { once: true });
      requestAnimationFrame(() => animFunc(this.root));
  }

  //-----------------------------------------------------
  // Event
  //-----------------------------------------------------
  /** Set click event */
  setClick(func){
      this.root.addEventListener('click', ()=>eval(func));
      return this;
  }


  /**Set grid column 
   * @param {string} expr start-length or start/end
  */
  setGridColumn(expr){
      if (expr.indexOf('-') != -1){
          // start-length
          const parts = expr.split("-");
          this.root.style.gridColumnStart = parts[0];
          this.root.style.gridColumnEnd = parseInt(parts[1]) + 1;
      }
      else{
          // start/end
          this.root.style.gridColumn = expr;
      }
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
          case 'cursor':            this.root.style.cursor = newValue; break;

          // size
          case 'width':             this.root.style.width = newValue;  break;
          case 'height':            this.root.style.height = newValue;  break;
          case 'minwidth':          this.root.style.minWidth = newValue;  break;
          case 'minheight':         this.root.style.minHeight = newValue;  break;
          case 'maxwidth':          this.root.style.maxWidth = newValue;  break;
          case 'maxheight':         this.root.style.maxHeight = newValue;  break;

          // anchor(position)
          case 'position':          this.root.style.position = newValue; break;
          case 'anchor':            this.setAnchor(newValue); break;
          case 'top':               this.root.style.top = newValue;  break;
          case 'bottom':            this.root.style.bottom = newValue;  break;
          case 'left':              this.root.style.left = newValue;  break;
          case 'right':             this.root.style.right = newValue;  break;

          // child
          case 'flex':              this.root.style.flex = newValue;  break;
          case 'gridcolumn':        this.setGridColumn(newValue); break;

          // child anchor
          case 'display':           this.root.style.display = newValue; break;
          case 'childanchor':       this.setChildAnchor(newValue); break;
          case 'textalign':         this.root.style.textAlign = newValue; break;

          // border
          case 'border':            this.root.style.border = newValue;  break;
          case 'borderwidth':       this.root.style.borderWidth = newValue;  break;
          case 'bordercolor':       this.root.style.borderColor = newValue;  break;
          case 'borderstyle':       this.root.style.borderStyle = newValue;  break;
          case 'radius':            this.root.style.borderRadius = newValue;  break;

          // box & margin & padding
          case 'box':               this.root.style.boxSizing = newValue; break;
          case 'margin':            this.root.style.margin = newValue;  break;
          case 'padding':           this.root.style.padding = newValue;  break;

          // theme
          case 'theme':             this.setThemeCls(newValue); break;

          // background
          case 'bgcolor':           this.root.style.backgroundColor = newValue;  break;
          case 'hoverbgcolor':      this.setHoverBgColor(newValue); break;
          case 'background':        this.root.style.background = newValue; break;

          // text
          case 'color':             this.root.style.color = newValue;  break;
          case 'hovercolor':        this.setHoverTextColor(newValue);  break;
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
//customElements.define("x-rect", Tag);


/***********************************************************
 * Global style
 * @example
 *     <x-style cellmargin="0 20px 0 0" bgcolor="lightgray" margin="0 0 10px 0">
 ***********************************************************/
export class Style extends Tag {
    constructor() {
        super();
        this.root = document.body; // set attribute on body
    }

    createRoot(){
        return null;
    }

    createStyle(){
        this.styleTag = document.createElement('style');
        document.head.appendChild(this.styleTag);
        this.styleTag.textContent = `
            :root {
                /* global variants. Use var('..') to get value */
                --box: border-box;
                --transition: 'all 0.5s';
            }
            html,body {
                width: 100%;  height: 100%; /*fullscreen*/
                padding: 0px; margin: 0px;
            }

            /* boxmodule and animation*/
            *, *::before, *::after {box-sizing: --box;}
            * {transition: 0.5s;}
        `;
    }
}

customElements.define("x-style", Style);