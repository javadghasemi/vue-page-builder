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
        inserted(el, binding, vnode) {
            const newNode = document.createElement('div');
            const section = vnode.context.$section;
            const rootApp = vnode.context.$root.$el;

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