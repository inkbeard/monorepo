import './assets/main.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'primevue/resources/themes/aura-light-green/theme.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
