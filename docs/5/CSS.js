class CSS {
    #regexps = []
    #id = 'style-auto-color'
    #query = '.auto-color'
    #template = '{{query}} { background-color: {{back}}; }';
    constructor(id='style-auto-color', query='.auto-color', template='{{query}} { background-color: {{back}}; }') {
        this.#id = id;
        this.#query = query;
        this.#template = template;
    }
//    replace(colors, id='style-auto-color', query='.auto-color', template='{{query}} { background-color: {{back}}; }') {
    replace(colors) {
        const style = document.querySelector(`#${this.#id}`) || this.createStyle();
        console.log('style:', style);
        style.textContent = this.replaceTemplate(colors);
//        style.textContent = CSS.createTemplate(colors);
        return this.#id;
    }
    createStyle(colors) {
        const style = document.createElement('style');
        style.id = this.#id;
        document.head.appendChild(style);
        return style;
    }
    replaceTemplate(colors) {
        this.#regexps = [];
        this.#regexps.push({regexp: new RegExp('{{[\s]*query[\s]*}}', 'g'), replace: this.#query});
        for (let key of ['back', 'fore', 'selectedBack', 'selectedFore', 'shadow']) {
            this.#regexps.push({regexp: new RegExp(`{{[\s]*${key}[\s]*}}`, 'g'), replace: colors[`${key}`]});
        }
        console.log(this.#regexps);
        let css = this.#template;
        for (let regexp of this.#regexps) {
            css = css.replace(regexp.regexp, regexp.replace);
        }
        /*
        for (let regexp of this.#regexps) {
            css = css.replace(regexp.regexp, regexp.replace);
        }
        template = template.replace(/{{[\s]*query[\s]*}}/g, this.#query);
        template = template.replace(/{{[\s]*back[\s]*}}/g, colors.back);
        template = template.replace(/{{[\s]*fore[\s]*}}/g, colors.fore);
        template = template.replace(/{{[\s]*selectedBack[\s]*}}/g, colors.selectedBack);
        template = template.replace(/{{[\s]*selectedFore[\s]*}}/g, colors.selectedFore);
        template = template.replace(/{{[\s]*shadow[\s]*}}/g, colors.shadow);
        */
        console.log(colors);
        console.log(css);
        return css;
    }
    /*
    static createTemplate(colors) {
        CSS.#template = `
            ${CSS.#query} {
                background-color: ${colors.back};
                color: ${colors.fore};
            }
            ${CSS.#query} input[type="radio"]:focus + label {
                border-color: ${colors.shadow};
                box-shadow: 0 0 5px ${colors.shadow};
            }
            ${CSS.#query} input[type="radio"]:hover + label,
            ${CSS.#query} input[type="radio"] + label:hover {
                border-color: ${colors.shadow};
                box-shadow: 0 0 5px ${colors.shadow};
            }
            ${CSS.#query} input[type="radio"]:checked + label {
                background-color: ${colors.selectedBack};
                color: ${colors.selectedFore};
            }
            ${CSS.#query} input[type="radio"]:disabled + label {
                cursor: not-allowed;
                opacity: 0.5;
            }
            ${CSS.#query} input[type="radio"] {
                width: 0px;
                height: 0px;
                margin: 0;
                padding: 0;
            }
            ${CSS.#query} input[type="radio"] + label {
                display: inline-block;
                position: relative;
                cursor: pointer;
            }
        `;
        return CSS.#template;
    }
    */
}
