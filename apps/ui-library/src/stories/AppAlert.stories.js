import { AppAlert } from '@inkbeard/ui-vue';

export default {
  title: 'ui vue/AppAlert',
  component: AppAlert,
  tags: ['autodocs'],
};
export const AppAlertExample = {
  args: {
    title: 'Lorem Ipsum',
    description: 'lorem ipsum dolor sit amet!',
    severity: 'danger',
    closable: true,
    showIcon: true,
  }
};
