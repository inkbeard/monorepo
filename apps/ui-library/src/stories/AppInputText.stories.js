import { AppInputText } from '@inkbeard/ui-vue';

export const LabelWithDescription = {
  inputId: 'first-name',
  labelDescription: 'The user\'s first name',
  label: 'First name',
};

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'ui-vue/AppInputText',
  component: AppInputText,
  tags: ['autodocs'],
  args: { ...LabelWithDescription },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component extended from primevue\'s `InputText` component that requires a label and an optional description.\n\nRefer to the [documentation](https://primevue.org/Inputtext/) for a full list of features of the InputText component.'
      }
    }
  },
};