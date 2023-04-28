import { isObject } from './util';
import * as Types from './Types';

const data = new Map([
    [Types.Title, 'Awesome title!'],
    [Types.Text, 'We\'re creating the best place to go when starting a new business or company.With Baianat you can instantly search domain names, social media handles, and see your logo in beautiful logotypes.'],
]);

export default class Seeder {
    static seed(schema) {
        if (isObject(schema)) {
            return Object.keys(schema).reduce((values, key) => {
                values[key] = Seeder.seed(schema[key]);
                return values;
            }, {});
        } else if (Array.isArray(schema)) {
            return schema.map(s => {
                return Seeder.seed(s)
            });
        }

        let value = data.get(schema);
        if (value === undefined) {
            value = schema;
        }
        return typeof value === 'function' ? value() : value;
    }
}