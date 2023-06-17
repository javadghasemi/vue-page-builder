import {createPinia} from "pinia";
import '@mdi/font/css/materialdesignicons.css';
import './style.css';

import Builder from "./components/Builder.vue";
import {useBuilderStore} from "./stores/builderStore";
async function createPageBuilder(vue, options) {
  // Init Pinia
  const pinia = createPinia();
  vue.use(pinia);

  vue.component('builder', {extends: Builder});
}

function defineComponent(component) {
  const builderStore = useBuilderStore();
  builderStore.addComponent(component);
}

export {createPageBuilder, defineComponent}