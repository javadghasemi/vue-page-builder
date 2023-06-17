import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import {createPageBuilder, defineComponent} from "../../index";
import Heading from "@/components/Heading";

const app = createApp(App)

app.use(createPageBuilder);

defineComponent(Heading);

app.mount('#app');
