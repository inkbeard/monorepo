import { SourcesEditor } from '@inkbeard/budget-it';
import { provide } from 'vue';

export const SampleSourcesEditor = {};

export default {
  title: 'Budget It/SourcesEditor',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: { ...SampleSourcesEditor },
  render: (args) => ({
    components: { SourcesEditor },
    setup() {
      provide('alphabaticSourceList', [
        { id: 1, label: 'Credit Card' },
        { id: 3, label: 'Checking Account' },
        { id: 4, label: 'Savings Account' },
        { id: 5, label: 'Cash' },
      ]);
      provide('defaultSourceId', 1);
      provide('sourceList', {
        1: 'Credit Card',
        3: 'Checking Account',
        4: 'Savings Account',
        5: 'Cash',
      });

      return { args };
    },
    template: '<SourcesEditor/>',
  }),
};