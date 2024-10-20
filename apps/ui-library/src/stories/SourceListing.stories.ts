import type { Meta, StoryObj } from '@storybook/vue3';
import { SourceListing } from '@inkbeard/budget-it';
import { ref, provide } from 'vue';
import type { Source } from '@storybook/blocks';

const meta = {
  title: 'Budget It/SourceListing',
  parameters: {
    layout: 'centered',
  },
  args: {
    isEditing: false,
    sourceId: 1,
  },
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
} satisfies Meta<typeof SourceListing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
