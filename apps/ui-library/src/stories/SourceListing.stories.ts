import { SourceListing } from '@inkbeard/budget-it';
import { ref, provide } from 'vue';

export const CashSourceListing = {
  render: (args: any) => ({
    components: { SourceListing },
    setup() {
      provide('defaultSourceId', 1);
      provide('sourceList', {
        1: 'Credit Card',
        3: 'Checking Account',
        4: 'Savings Account',
        5: 'Cash',
      });
      provide('sourcesWithExpenses', {
        1: ['1', '4', '5', '8', '10'],
        3: ['3', '7'],
        4: ['9'],
        5: ['2']
      });

      return { args };
    },
    template: '<SourceListing :is-editing="args.isEditing" :source-id="args.sourceId" />',
  }),
};

export default {
  title: 'Budget It/SourceListing',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    isEditing: false,
    sourceId: 1,
  }
};
