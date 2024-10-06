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
  CT: 'center',
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
 * XTags
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
      return new Promise((resolve) => {
          setTimeout(resolve, ms);
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
    static get vw() { return  window.innerWidth || document.documentElement.clientWidth;}

    /** Get view height */
    static get vh() { return window.innerHeight || document.documentElement.clientHeight;}

    /** Center element in window */
    static centerlize(selector){
      const popup = document.querySelector(selector);
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const popupWidth = popup.offsetWidth;
      const popupHeight = popup.offsetHeight;
      popup.style.transform = '';
      popup.style.left = (viewportWidth - popupWidth) / 2 + 'px';
      popup.style.top = (viewportHeight - popupHeight) / 2 + 'px';
      popup.style.display = 'block';
    }

    /**
     * Let element to screen center
     * @param {string} elementSelector 
     * @param {string} width  element width, suppoort px, em , rem
     * @param {string} height element height, suppoort px, em , rem
     * @returns 
     */
    static centerElement(elementSelector, width, height) {
      const element = document.querySelector(elementSelector);
      if (!element) return;

      // 获取视口宽度和高度
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      let parsedWidth, parsedHeight;

      // 解析宽度和高度值
      if (width.endsWith('px')) {
        parsedWidth = parseInt(width, 10);
      } else if (width.endsWith('rem')) {
        const rootFontSize = parseInt(getComputedStyle(document.documentElement).fontSize, 10);
        parsedWidth = parseInt(width, 10) * rootFontSize;
      } else if (width.endsWith('em')) {
        const parentFontSize = parseInt(getComputedStyle(element.parentNode).fontSize, 10);
        parsedWidth = parseInt(width, 10) * parentFontSize;
      } else {
        console.error('Unsupported width unit');
        return;
      }

      if (height.endsWith('px')) {
        parsedHeight = parseInt(height, 10);
      } else if (height.endsWith('rem')) {
        const rootFontSize = parseInt(getComputedStyle(document.documentElement).fontSize, 10);
        parsedHeight = parseInt(height, 10) * rootFontSize;
      } else if (height.endsWith('em')) {
        const parentFontSize = parseInt(getComputedStyle(element.parentNode).fontSize, 10);
        parsedHeight = parseInt(height, 10) * parentFontSize;
      } else {
        console.error('Unsupported height unit');
        return;
      }

      // 计算并设置元素的位置
      element.style.top = ((viewportHeight - parsedHeight) / 2) + 'px';
      element.style.left = ((viewportWidth - parsedWidth) / 2) + 'px';
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
        var tags = document.querySelectorAll('[tagName^="X-"]');  // not support
        if (tags.length === 0) {
            tags = Array.from(document.querySelectorAll('*'));
            tags = tags.filter(element => element.nodeName.startsWith('X-'));  // notice: will upper
        }
        tags.forEach(tag => {
            //if (tag instanceof Rect){
            //    tag.setTheme(theme);
            //}
            if (tag.setTheme != 'undefined'){
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
    /** 生成浅色 */
    static getOpacityColor(rawColor, opacity) {
        var clr = this.parseColor(rawColor);
        if (clr!= null)
          return `rgba(${clr.r}, ${clr.g}, ${clr.b}, ${opacity})`;
        return 'white';
    }

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
}




