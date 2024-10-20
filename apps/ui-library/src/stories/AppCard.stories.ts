import type { Meta, StoryObj } from '@storybook/vue3';
import { AppCard } from '@inkbeard/ui-vue';

const meta = {
  title: 'ui vue/AppCard',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    header: {
      control: {
        type: 'text',
      },
    },
    title: {
      control: {
        type: 'text',
      },
    },
    subTitle: {
      control: {
        type: 'text',
      },
    },
    default: {
      control: {
        type: 'text',
      },
    },
    footer: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    default: 'default slot',
    footer: 'footer slot',
    header: 'header slot (most likely an img)',
    subTitle: 'subTitle slot',
    title: 'title slot',
  },
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args };
    },
    template: `
      <AppCard>
        <template #header>{{ args.header }}</template>
        <template #title>{{ args.title }}</template>
        <template #subTitle>{{ args.subTitle }}</template>
        <template #default>{{ args.default }}</template>
        <template #footer>{{ args.footer }}</template>
      </AppCard>
    `,
  }),
} satisfies Meta<typeof AppCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
