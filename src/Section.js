let counter = 0;

export default class Section {
    defaultOptions = {
        name: null,
        schema: {}
    }

    constructor(options) {
        this.id = counter++;
        options = Object.assign({}, this.defaultOptions, options);
        this.name = options.name;
        this.schema = options.schema;
        this.data = options.data;
        this.stylers = [];
    }

    set() {

    }

    get() {

    }

    destroy() {
        this.stylers.forEach(styler => styler.$destroy());
    }
}