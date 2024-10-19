import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useFeatureFlagStore } from '@/stores/featureFlags';
import { createI18n } from 'vue-i18n';
import flagsmith from 'flagsmith';
import InkbeardUiVue from '@inkbeard/ui-vue';
import InkbeardBudgetIt from '@inkbeard/budget-it';
import { messages } from '@/assets/locales';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages,
});

app.use(i18n);
app.use(createPinia());
app.use(InkbeardUiVue);
app.use(InkbeardBudgetIt);
app.use(router);

flagsmith.init({
  environmentID: import.meta.env.PROD
    ? 'oWEJdH2Tc54wNCUVNVgnCQ'
    : 'ax5a27QiuSV2CYBUbw9J67',
  onChange: () => {
    const featureFlagStore = useFeatureFlagStore();

    featureFlagStore.flags = {
      ...featureFlagStore.flags,
      // All feature flags will be set as an object with with `enabled`, `id`, and `value` properties
      // with the name of the feature flag as the key.
      ...flagsmith.getAllFlags(),
    };
  },
});

app.mount('#app');
