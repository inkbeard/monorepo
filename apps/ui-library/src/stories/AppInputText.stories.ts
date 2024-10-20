import type { Meta, StoryObj } from '@storybook/vue3';
import { AppInputText } from '@inkbeard/ui-vue';


const meta = {
  title: 'ui vue/AppInputText',
  component: AppInputText,
  args: {
    inputId: 'first-name',
    labelDescription: 'The user\'s first name',
    label: 'First name',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component extended from primevue\'s `InputText` component that requires a label and an optional description.\n\nRefer to the [documentation](https://primevue.org/Inputtext/) for a full list of features of the InputText component.'
      }
    }
  },
} satisfies Meta<typeof AppInputText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};