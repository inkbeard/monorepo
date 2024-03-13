import { AppButton } from '@inkbeard/ui-vue';

export const PrimaryPlus = {
  label: 'Primary plus',
  icon: 'fa-solid fa-plus',
};

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'ui vue/AppButton',
  component: AppButton,
  tags: ['autodocs'],
  args: { ...PrimaryPlus },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component extended from primevue\'s `Button` component\n\nRefer to the [documentation](https://primevue.org/button/) for a full list of features.'
      }
    }
  },
};