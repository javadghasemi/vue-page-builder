import { defineComponent, createApp, getCurrentInstance } from 'vue';
import Styler from './components/Styler.vue';
import { getTypeFromSchema, getTypeFromTagName } from './util';

function installStyler({ builder, Vue }) {
    const StylerInstance = defineComponent({
        extends: Styler,
        beforeCreate() {
          this.$builder = builder;
        },
      });

    builder.styler = {
        mounted(el, binding, vnode, prevNode) {
            const newNode = document.createElement('div');
            const section = vnode.ctx.ctx.$section;
            const rootApp = vnode.ctx.ctx.$root.$el;

            rootApp.appendChild(newNode);
            el.classList.add('is-editable');

            section.stylers.push(createApp(StylerInstance, {
                el,
                section,
                type: getTypeFromSchema(binding.expression, section.schema) || getTypeFromTagName(el.tagName),
                name: binding.arg
            }).mount(newNode));
        }
    };
}

export default installStyler;