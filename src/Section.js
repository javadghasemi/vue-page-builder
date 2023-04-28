import Seeder from './Seeder';

let counter = 0;

export default class Section {
    defaultOptions = {
        name: 'ssssssss',
        schema: {}
    }

    constructor(options) {
        this.id = counter++;
        options = Object.assign({}, this.defaultOptions, options);
        this.name = options.name;
        this.schema = options.schema;
        this.data = options.data || Seeder.seed(options.schema);
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