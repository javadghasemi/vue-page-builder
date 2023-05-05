import { isObject } from './util';
import * as Types from './Types';

const data = new Map([
    [Types.Title, 'لورم ایپسوم'],
    [Types.Text, 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.'],
    [Types.ClassList, () => []],
    [Types.Button, () => ({
        text: 'کلیک کن!',
        href: 'http://example.com'
    })]
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