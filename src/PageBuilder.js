import { reactive, ref, defineComponent } from 'vue';

import VuePageBuilder from './components/PageBuilder.vue';
import Section from './Section';
import styler from './styler';

class PageBuilder {
    static BUILDER_OPTIONS = {
        title: '',
        intro: true,
        sections: [],
        plugins: [],
        themes: [],
        columnsPrefix: {
            mobile: 'is-mobile-',
            tablet: 'is-tablet-',
            desktop: 'is-desktop-',
            widescreen: 'is-widescreen-',
            ultrawide: 'is-ultrawide-'
        }
    };
    static PLUGINS = [];
    static Vue;

    isEditing = true;
    isSorting = false;
    isRendered = false;
    title = '';
    sections = [];
    plugins = [];
    themes = [];
    components = {};

    constructor(options) {
        this.title = options.title;
        this.sections = options.sections;
        this.themes = options.themes;

        this.installPlugins();
    }

    add(options, position) {
        const section = new Section(options);

        if (position !== undefined) {
            this.sections.splice(position, 0, section);
            return;
        }
        console.log(section);

        this.sections.push(section);
    }

    clear() {
        const tempSections = this.sections;
        this.sections.forEach(section => section.destroy());
        this.sections.splice(0, this.sections.length);

        return tempSections;
    }

    installPlugins() {
        PageBuilder.PLUGINS.forEach((ctx) => {
            ctx.plugin({ builder: this, Vue: PageBuilder.Vue }, ctx.options);
        });
        // reset to prevent duplications.
        PageBuilder.PLUGINS = [];
    }

    /**
     * Adds a component section to the builder and augments it with the styler.
     * @param {*} name
     * @param {*} definition
    */
    component(name, definition) {
        // reoslve the component name automatically.
        if (typeof name === 'object') {
            definition = name;
            name = definition.name;
        }


        this.components[name] = defineComponent({
            ...definition,
            directives: {styler: this.styler}
        });
    }

    set(data) {
        this.title = data.title !== undefined ? data.title : this.title;
        if (data.sections.length && Array.isArray(data.sections)) {
            this.sections = data.sections.map(section => {
                const sectionData = {
                    name: section.name,
                    schema: section.schema,
                    data: section.data
                };
                if (!sectionData.schema) {
                    sectionData.schema = this.components[sectionData.name].options.$schema;
                }

                return new Section(sectionData);
            });
        }
    }

    static install(vue, options = {}) {
        if (!this.Vue) this.Vue = vue;

        const builder = new PageBuilder(Object.assign({}, this.BUILDER_OPTIONS, options));

        builder.sections = reactive(builder.sections);
        builder.isEditing = ref(builder.isEditing);
        builder.isSorting = ref(builder.isSorting);

        const extention = {
            components: builder.components,
            beforeCreate() {
                this.$builder = builder;
            }
        }

        vue.component('PageBuilder', {
            extends: VuePageBuilder,
            ...extention
        });
    }

    static component(name, definition) {
        PageBuilder.use((ctx) => {
            ctx.builder.component(name, definition);
        });
    }

    static mix() {

    }

    static use(plugin, options = {}) {
        if (typeof plugin !== 'function') {
            return console.warn('Plugins must be a function');
        }

        // append to the list of to-be installed plugins.
        this.PLUGINS.push({ plugin, options });
    }
}

PageBuilder.use(styler);

export default PageBuilder;