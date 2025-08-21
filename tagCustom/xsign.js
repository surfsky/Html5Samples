/**
 * Sign tag
 * @example
 *     <script src="./x-sign.js" defer></script>
 *     <x-sign docname="DocA" patientname="aaaa"></x-sign>
 */
class Sign extends HTMLElement{
    // 类的构造函数constructor
    constructor(){
        // 总是先调用super()来建立正确的原型链继承关系。
        super();

        // Shadow DOM 允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样
        // open 表示可以通过页面内的 JavaScript 方法来获取 Shadow DOM
        const shadow = this.attachShadow({mode: 'open'});

        // parent
        const divRoot = document.createElement('div');
        divRoot.setAttribute('class','div_parent');

        // doctor
        const divDoc = document.createElement('div');
        divDoc.setAttribute('class','lable_sign');
        divDoc.textContent="医生签名：";
        this.divDocSign = document.createElement('div');
        this.divDocSign.setAttribute('class','doc_sign');

        // span1
        const span1 = document.createElement('span');
        span1.setAttribute('class','span');

        // patient
        const divPatient = document.createElement('div');
        divPatient.setAttribute('class','lable_sign');
        divPatient.textContent="患者签名：";
        this.divPatientSign = document.createElement('div');
        this.divPatientSign.setAttribute('class','patient_sign');

        // span2
        const span2 = document.createElement('span');
        span2.setAttribute('class','span');

        // style
        const style = document.createElement('style');
        style.textContent = `
            .div_parent{
                display:flex;
                justify-content:flex-start;
            }
            .lable_sign{
                font-style:italic;
                font-weight:bold;
                font-size:16px;
            }
            .doc_sign{
                font-weight:normal;
            }
            .patient_sign{
                font-weight:normal;
            }
            .span{
                min-width:50px;
            }
            `;

        // build dom
        divRoot.appendChild(divDoc);
        divRoot.appendChild(this.divDocSign);
        divRoot.appendChild(span1);
        divRoot.appendChild(divPatient);
        divRoot.appendChild(this.divPatientSign);
        divRoot.appendChild(span2);
        shadow.appendChild(style);
        shadow.appendChild(divRoot);
    }

    // 当元素插入到 DOM 中时，connectedCallback()函数将会执行
    connectedCallback(){
        console.log("..connectedCallback");
    }
    
    
    // 指定观察属性，属性发生变化时调用  attributeChangedCallback
    static get observedAttributes() {
        return ['doctor', 'patient'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`element attributes changed. oldvalue:${oldValue} newValue:${newValue}`);
        switch(name){
            case 'doctor':
                this.divDocSign.textContent = newValue;
                break;
            case 'patient':
                this.divPatientSign.textContent = newValue;
                break;
        }
      }
}

// define custom tag name, must has '-' seperator
customElements.define('x-sign', Sign);
