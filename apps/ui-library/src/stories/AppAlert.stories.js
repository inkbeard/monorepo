import { AppAlert } from '@inkbeard/ui-vue';

export default {
  title: 'ui vue/AppAlert',
  component: AppAlert,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: {
        type: 'select',
      },
      options: ['info', 'success', 'warn', 'danger']
    },
  },
  args: {
    title: 'Lorem Ipsum',
    description: 'lorem ipsum dolor sit amet!',
    severity: 'danger',
    closable: true,
    showIcon: true,
  }
};
export const AppAlertExample = {
};
