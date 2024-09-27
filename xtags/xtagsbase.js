import {Rect} from "./xtags.js";


/************************************************************
 * Theme
 ***********************************************************/
export class Theme{
    Background= 'white';
    Text      = 'black';
    Primary   = '#007bff';
    Secondary = '#6c757d';
    Success   = '#28a745';
    Info      = '#17a2b8';
    Warning   = '#ffc107';
    Danger    = '#dc3545';
    Dark      = '#343a40';
    Light     = '#f8f9fa';
    Border    = '#cdcdcd';
    Radius    = '8px';

    constructor(opt) {
        this.Background = opt.Background;
        this.Text       = opt.Text;
        this.Primary    = opt.Primary;
        this.Secondary  = opt.Secondary;
        this.Success    = opt.Success;
        this.Info       = opt.Info;
        this.Warning    = opt.Warning;
        this.Danger     = opt.Danger;
        this.Dark       = opt.Dark;
        this.Light      = opt.Light;
        this.Border     = opt.Border;
        this.Radius     = opt.Radius;
    }
}


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
 * XTags
 ***********************************************************/
export class XTags {
    /** Icon root path*/
    static iconRoot = "./icons/";


    //-----------------------------------------
    // Theme
    //-----------------------------------------
    /** Theme light*/
    static themeLight = new Theme({
        Background: 'white',
        Text      : 'black',
        Primary   : '#007bff',
        Secondary : '#7633d4',
        Success   : '#28a745',
        Info      : '#17a2b8',
        Warning   : '#ffc107',
        Danger    : '#dc3545',
        Dark      : '#343a40',
        Light     : '#f8f9fa',
        Border    : '#cdcdcd',
        Radius    : '8px',
    });

    /** Theme dark */
    static themeDark = new Theme({
        Background: '#171717',
        Text      : '#cccccc',
        Primary   : '#007bff',
        Secondary : '#6c757d',
        Success   : '#28a745',
        Info      : '#17a2b8',
        Warning   : '#ffc107',
        Danger    : '#dc3545',
        Dark      : '#343a40',
        Light     : '#f8f9fa',
        Border    : '#707070',
        Radius    : '8px',
    });

    /** Global Theme*/
    static theme = this.themeLight;

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
            if (tag instanceof Rect){
                tag.setTheme(theme);
            }
        });
    }



    //-----------------------------------------
    // UI utils
    //-----------------------------------------
    /**
     * Show toast
     * @param {string} icon iconname without extension
     * @param {string} info information 
     */
    static async showToast(icon, info){
        var toast = new Rect()
            .setSize('400px', '26px')
            .setRadius('6px')
            .setColors(XTags.theme.Success, XTags.theme.Light)
            //.setShadow(true)
            .setAnchor(Anchor.T)
            .setChildAnchor(Anchor.CT)
            .setInnerHTML(`<x-row><img src='${this.iconRoot}${icon}.png' width='24px'/><div>${info}<div></x-row>`)
            ;
        toast.style.top = '-100px';
        document.body.appendChild(toast);
        await this.delay(50);
        toast.style.top = '25px';
        await this.delay(2000);
        toast.style.top = '-100px';
        await this.delay(1000);
        document.body.removeChild(toast);
    }

    //-----------------------------------------
    // Common Utils
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
    // Color Utils
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




