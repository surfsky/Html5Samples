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
    name      = 'ios';
    background= 'white';
    text      = 'black';
    primary   = '#007bff';
    secondary = '#6c757d';
    success   = '#28a745';
    info      = '#17a2b8';
    warning   = '#ffc107';
    danger    = '#dc3545';
    dark      = '#343a40';
    light     = '#f8f9fa';
    border    = '#cdcdcd';
    radius    = '8px';

    constructor(opt) {
        this.name       = opt.name;
        this.background = opt.background;
        this.text       = opt.text;
        this.Link       = opt.link;
        this.primary    = opt.primary;
        this.secondary  = opt.secondary;
        this.success    = opt.success;
        this.info       = opt.info;
        this.warning    = opt.warning;
        this.danger     = opt.danger;
        this.dark       = opt.dark;
        this.light      = opt.light;
        this.border     = opt.border;
        this.radius     = opt.radius;
    }

    /** Theme light*/
    static themeLight = new Theme({
        name      : 'iOSLight',
        background: 'white',
        text      : 'black',
        link      : 'blue',
        primary   : '#007bff',
        secondary : '#7633d4',
        success   : '#28a745',
        info      : '#17a2b8',
        warning   : '#ffc107',
        danger    : '#dc3545',
        dark      : '#343a40',
        light     : '#f8f9fa',
        border    : '#cdcdcd',
        radius    : '8px',
    });

    /** Theme dark */
    static themeDark = new Theme({
        name      : 'MaterialDark',
        background: '#171717',
        text      : '#cccccc',
        link      : 'red',
        primary   : '#007bff',
        secondary : '#6c757d',
        success   : '#28a745',
        info      : '#17a2b8',
        warning   : '#ffc107',
        danger    : '#dc3545',
        dark      : '#343a40',
        light     : '#f8f9fa',
        border    : '#707070',
        radius    : '8px',
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
    static delay(ms) {
      return new Promise((resolve) => {
          setTimeout(resolve, ms);
      });
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




