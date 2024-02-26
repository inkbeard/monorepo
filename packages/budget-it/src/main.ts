import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import InkbeardUiVueConfig from '@inkbeard/ui-vue';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(InkbeardUiVueConfig);
app.mount('#app');
