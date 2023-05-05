import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VuePageBuilder from './../../src';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';

// Components
import hero1 from './sections/hero/hero1.vue';

VuePageBuilder.component('hero1', hero1);

const app = createApp(App);

app.use(VuePageBuilder, {
    assets: {
        css: 'css/style.css'
    },
    themes: [{
        name: 'تم تست 1',
        sections: [hero1]
    }]
});

app.mount('#app');
