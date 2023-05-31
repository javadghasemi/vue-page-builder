import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import VuePageBuilder from './../../src';
import vuetify from "@/plugins/vuetify";
import Hero from "./sections/Category/Category.vue";

import './Vazirmatn-Variable-font-face.css';

const pinia = createPinia();
const app = createApp(App);

VuePageBuilder.component('هیرو', Hero);

app.use(VuePageBuilder, {
  assets: {
    css: 'css/ControllerPanel.style.css'
  },
});

app.use(vuetify);

app.use(pinia);
app.mount('#app');
