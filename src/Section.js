import toPath from 'lodash-es/toPath';
import getPath from 'lodash-es/get';
import Seeder from './Seeder';

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
        this.data = options.data || Seeder.seed(options.schema);
        this.stylers = [];
    }

    set(name, value) {
        const path = toPath(name);
        const prop = path.pop();
        console.log('===>>', path, name, prop);

        // path.shift();
        const obj = path.length === 0 ? this.data : getPath(this.data, path);
        console.log('====><<<', this.data[path], path);
        if(typeof value === 'function') {
            value(obj[prop]);
            return;
        }

        obj[prop] = value;
    }

    get() {

    }

    destroy() {
        this.stylers.forEach(styler => styler.$destroy());
    }
}