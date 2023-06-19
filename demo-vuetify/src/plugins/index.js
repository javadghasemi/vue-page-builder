/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import {createPageBuilder, defineComponent} from "../../../index";
import Posts from "@/elements/Posts";

export function registerPlugins (app) {
  app.use(vuetify);
  app.use(createPageBuilder);
  defineComponent(Posts);
}
