import {reactive, ref, defineComponent} from 'vue';
import {createPinia} from "pinia";
import {useSectionStore} from './stores/section';

import VuePageBuilder from './components/PageBuilder.vue';
import Renderer from './components/Renderer.vue';
import Section from './Section';
import mixin from './mixin';
import {cleanDOM} from './util';

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

  installPlugins() {
    PageBuilder.PLUGINS.forEach((ctx) => {
      ctx.plugin({builder: this, Vue: PageBuilder.Vue}, ctx.options);
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
    // resolve the component name automatically.
    if (typeof name === 'object') {
      definition = name;
      name = definition.name;
    }


    this.components[name] = defineComponent({
      ...definition,
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

  static install(vue, options = {}) {
    if (!this.Vue) this.Vue = vue;

    const builder = new PageBuilder(Object.assign({}, this.BUILDER_OPTIONS, options));
    const pinia = createPinia();
    vue.use(pinia);

    builder.isEditing = ref(builder.isEditing);
    builder.isSorting = ref(builder.isSorting);


    const extension = {
      components: builder.components,
      beforeCreate() {
        this.$builder = builder;
      }
    }

    vue.component('PageBuilder', {extends: VuePageBuilder, ...extension});
    vue.component('Renderer', {extends: Renderer, ...extension});
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
    this.PLUGINS.push({plugin, options});
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
    const pageBuilderStore = useSectionStore();

    return {
      title: this.title,
      sections: pageBuilderStore.sections.map(section => ({
        name: section.name,
        data: section.data
      }))
    }
  }

  export(method = 'json') {
    if (method === 'preview') {
      return this.preview();
    }

    return this.toJSON();
  }
}

PageBuilder.use(mixin);

export default PageBuilder;