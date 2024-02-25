import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Tooltip from 'primevue/tooltip';
import PrimeVue from 'primevue/config';
import App from './App.vue';

const app = createApp(App);

app.directive('tooltip', Tooltip);
app.use(createPinia());
app.use(PrimeVue);
app.mount('#app');
