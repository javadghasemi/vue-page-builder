import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VuePageBuilder from './../../src';

// Components
import hero1 from './sections/hero/hero1.vue';

VuePageBuilder.component('هیرو 1', hero1);

const app = createApp(App);

app.use(VuePageBuilder, {
    assets: {
        css: 'css/ControllerPanel.style.css'
    },
    themes: [{
        name: 'تم تست 1',
        sections: [hero1]
    }]
});

app.mount('#app');
