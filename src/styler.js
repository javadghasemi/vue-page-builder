import {defineComponent} from 'vue';
import Styler from './components/Styler.vue';

function installStyler({ builder, Vue }) {
    const StylerInstance = defineComponent({
        extends: Styler,
        beforeCreate() {
            this.$builder = builder;
        }
    });

    builder.styler = {
        mounted(el, binding, vnode) {
            console.log(el, binding, vnode);
            const newNode = document.createElement('div');
            const section = vnode.ctx.ctx.$section;
            console.log(section);
            const rootApp = vnode.ctx.ctx.$root.$el;

            rootApp.appendChild(newNode);
            el.classList.add('is-editable');
            section.stylers.push(new StylerInstance({
                propsData: {
                    el,
                    section,
                    type: binding.arg
                }
            }).$mount(newNode));
        }
    };
}

export default installStyler;