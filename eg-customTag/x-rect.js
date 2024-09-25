/**
 * Define a rectangle
 * @example  <x-rect width="100px" height="100px" bgcolor="green" color="white" radius="10px" borderwidth="2px" bordercolor="yellow" borderstyle="solid" ></rect-tag>
 * @author surfsky.github.com 2024
 */
class Rect extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.div = document.createElement("div");
        this.div.style.padding = "10px";
        this.div.style.width = '100px';
        this.div.style.height = '100px';
        this.div.style.borderWidth = '1px';
        this.div.style.borderColor = 'lightgray';
        this.div.style.borderStyle = 'solid';
        this.div.innerHTML = this.innerHTML;   // 支持子元素
        this.shadow.appendChild(this.div);
    }

    // 指定观察属性。注意不支持大小写 camel 方式
    static get observedAttributes() {
        return [
            'id', 'class', 'newclass',
            'bgcolor', 'color',
            'radius', 
            'width', 'height', 
            'borderwidth', 'bordercolor', 'borderstyle',
            'margin', 'padding',
            'fix'
        ];
    }

    /**
     * Set fix style for: topLeft, top, topRight, ...
     * @param {string} newValue 
     */
    setFixStyle(newValue){
        var style = this.div.style;
        switch (newValue){
            case 'topLeft'     : style.position='fixed'; style.top='0px';    style.left='0px';  break;
            case 'top'         : style.position='fixed'; style.top='0px';    style.left='50%';  style.transform='translateX(-50%)';break;
            case 'topRight'    : style.position='fixed'; style.top='0px';    style.right='0px'; break;
            case 'bottomLeft'  : style.position='fixed'; style.bottom='0px'; style.left='0px';  break;
            case 'bottom'      : style.position='fixed'; style.bottom='0px'; style.left='50%';  style.transform='translateX(-50%)'; break;
            case 'bottomRight' : style.position='fixed'; style.bottom='0px'; style.right='0px'; break;
            case 'left'        : style.position='fixed'; style.top='50%';    style.left='0px';  style.transform='translateY(-50%)';           break;
            case 'center'      : style.position='fixed'; style.top='50%';    style.left='50%';  style.transform='translate3D(-50%, -50%, 0)'; break;
            case 'right'       : style.position='fixed'; style.top='50%';    style.right='0px'; style.transform='translateY(-50%)';           break;
        }
    }

    // 属性变化时调用
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'id':                this.div.setAttribute('id', newValue); break;
            case 'class':             this.div.setAttribute('class', newValue); break;
            case 'newclass':          this.div.setAttribute('class', newValue + ' ' + this.div.getAttribute('class')); break;
            case 'bgcolor':           this.div.style.backgroundColor = newValue;  break;
            case 'color':             this.div.style.color = newValue;  break;
            case 'radius':            this.div.style.borderRadius = newValue;  break;
            case 'width':             this.div.style.width = newValue;  break;
            case 'height':            this.div.style.height = newValue;  break;
            case 'borderwidth':       this.div.style.borderWidth = newValue;  break;
            case 'bordercolor':       this.div.style.borderColor = newValue;  break;
            case 'borderstyle':       this.div.style.borderStyle = newValue;  break;
            case 'margin':            this.div.style.margin = newValue;  break;
            case 'padding':           this.div.style.padding = newValue;  break;
            case 'fix':               this.setFixStyle(newValue); break;
        }
    }

 
}
customElements.define("x-rect", Rect);


/**
 * Row container
 * @example
 *     <x-row cellmargin="0 20px 0 0" bgcolor="lightgray" margin="0 0 10px 0">
 */
class Row extends Rect {
    //constructor(bgcolor='white') {  // 经测试不支持默认参数代入
    constructor() {
        super();

        // style
        this.styleEle = document.createElement('style');
        this.styleEle.textContent = ".x-container > *  {margin: 0;}";
        this.shadow.appendChild(this.styleEle);

        // div
        this.div.setAttribute('class', 'x-container');
        this.div.style.padding = "0px";
        this.div.style.borderWidth = '0';
        this.div.style.display = "flex";
        this.div.style.flexWrap = "wrap";
        this.div.style.flexDirection = "row";
        this.div.style.width = '100%';
        this.div.style.height = '';
        this.div.innerHTML = this.innerHTML;
    }

    static get observedAttributes() {
        //return Rect.observedAttributes.push('cellmargin');  // fail
        return [
            'id', 'class', 'newclass',
            'bgcolor', 'color',
            'radius', 
            'width', 'height', 
            'borderwidth', 'bordercolor', 'borderstyle',
            'margin', 'padding',
            'fix',
            'cellmargin'
        ];
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


/**
 * Column container
 * @example
 *     <x-col cellmargin="0 0 20px 0" bgcolor="lightgray" width="150px" height="500px">
 */
class Column extends Row {
    constructor() {
        super();
        this.div.style.flexDirection = "column";
        this.div.style.width = '';
        this.div.style.height = '100%';
    }
}

customElements.define("x-col", Column);


// todo: grid