import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useFeatureFlagStore } from '@/stores/featureFlags';
import flagsmith from 'flagsmith';
import InkbeardUiVue from '@inkbeard/ui-vue';
import InkbeardBudgetIt from '@inkbeard/budget-it';
import App from './App.vue';
import router from './router';

const app = createApp(App);

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
