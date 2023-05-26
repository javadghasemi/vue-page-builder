/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import {loadFonts} from './webfontloader';
import vuetify from './vuetify';
import VuePageBuilder from './../../../src';

import Hero from './../sections/Hero.vue';

VuePageBuilder.component('هیرو 1', Hero);

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify);
  app.use(VuePageBuilder, {
    assets: {
      css: 'css/ControllerPanel.style.css'
    }
  });
}
