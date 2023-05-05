import { reactive, ref, defineComponent } from 'vue';

import VuePageBuilder from './components/PageBuilder.vue';
import Renderer from './components/Renderer.vue';
import Section from './Section';
import styler from './styler';
import mixin from './mixin';
import { cleanDOM } from './util';

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
        this.sections = reactive([]);
        this.themes = options.themes;
        this.assets = {
            css: options.assets?.css || 'dist/css/app.css'
        }

        this.installPlugins();
    }

    find(id) {
        return this.sections.find(s => s.id === id);
    }

    add(options, position) {
        const section = new Section(options);

        if (position !== undefined) {
            this.sections.splice(position, 0, section);
            return;
        }

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
            directives: { styler: this.styler },
            mixins: [this.mixin]
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
                // if (!sectionData.schema) {
                //     sectionData.schema = this.components[sectionData.name].options.$schema;
                // }

                return new Section(sectionData);
            });
        }
    }

    sort(oldIndex, newIndex) {
        const section = this.sections[oldIndex];
        this.sections.splice(oldIndex, 1);
        this.sections.splice(newIndex, 0, section);
    }

    static install(vue, options = {}) {
        if (!this.Vue) this.Vue = vue;

        const builder = new PageBuilder(Object.assign({}, this.BUILDER_OPTIONS, options));

        builder.isEditing = ref(builder.isEditing);
        builder.isSorting = ref(builder.isSorting);

        const extention = {
            components: builder.components,
            beforeCreate() {
                this.$builder = builder;
            }
        }

        vue.component('PageBuilder', { extends: VuePageBuilder, ...extention });
        vue.component('Renderer', { extends: Renderer, ...extention });
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

    outputFragment() {
        const frag = document.createDocumentFragment();
        frag.appendChild(document.head.cloneNode(true));
        frag.appendChild(this.rootEl.cloneNode(true));

        return frag;
    }

    preview() {
        const frag = this.outputFragment();
        const artboard = frag.querySelector('#artboard');
        const printPreview = window.open('about:blank', 'print_preview');
        const printDocument = printPreview.document;
        cleanDOM(frag);
        printDocument.open();
        printDocument.write(
            `<!DOCTYPE html>
            <html>
            <head>
                <title>${this.title}</title>
                <link href="${this.assets.css}" rel="stylesheet">
            </head>
            <body>
                ${artboard.innerHTML}
            <body>
            </html>`
        );
    }

    toJSON() {
        return {
            title: this.title,
            sections: this.sections.map(section => ({
                name: section.name,
                data: section.data
            }))
        }
    }

    export(method = 'json') {
        if ((method === 'zip') && (typeof this.download === 'function')) {
            return this.download(this.assets);
        }

        if (method === 'preview') {
            return this.preview();
        }

        return this.toJSON();
    }
}

PageBuilder.use(styler);
PageBuilder.use(mixin);

export default PageBuilder;