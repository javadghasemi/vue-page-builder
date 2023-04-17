import VuePageBuilder from './components/PageBuilder.vue';

class PageBuilder {
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


        this.components[name] = definition;
    }

    static install(vue, options = {}) {
        const builder = new PageBuilder(options);

        if (!this.Vue) {
            this.Vue = vue;
        }

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

export default PageBuilder;