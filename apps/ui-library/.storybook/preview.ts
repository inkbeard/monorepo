/** @type { import('@storybook/vue3').Preview } */
import { setup } from '@storybook/vue3'
import '../src/assets/global.css';
import { createPinia } from 'pinia';
import InkbeardUiVue, { ConfirmationService } from '@inkbeard/ui-vue';

const pinia = createPinia();

setup((app) => {
  app.use(pinia);
  app.use(InkbeardUiVue);
  app.use(ConfirmationService);
});

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
      storySort: {
        order: ['UI Theme', 'ui-vue', 'Budget It', 'Changelog']
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
