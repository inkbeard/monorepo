/** @type { import('@storybook/vue3').Preview } */
import { setup } from '@storybook/vue3'
import '../src/assets/global.css';
import { createPinia } from 'pinia';

const pinia = createPinia();

setup((app) => {
  app.use(pinia);
});

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
