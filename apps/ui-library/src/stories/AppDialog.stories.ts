import type { Meta, StoryObj } from '@storybook/vue3';
import { AppButton, AppDialog } from '@inkbeard/ui-vue';

const meta = {
  title: 'ui vue/AppDialog',
  component: AppDialog,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component extended from primevue\'s `Dialog` component\n\nRefer to the [documentation](https://primevue.org/dialog/) for a full list of features.\n\n `import { AppDialog } from \'@inkbeard/ui-vue\';`',
      },
    },
  },
  args: {
    visible: false,
  },
  render: (args) => ({
    components: { AppButton, AppDialog },
    setup() {
      return { args };
    },
    template: `
      <AppButton
        label="Click me"
        @click="args.visible = true"
      />
      <AppDialog
        v-model:visible="args.visible"
        modal header="Good job!!"
        :style="{ width: '25rem' }"
      >
        <p>You have pushed a button!</p>
      </AppDialog>`,
  }),
} satisfies Meta<typeof AppDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
