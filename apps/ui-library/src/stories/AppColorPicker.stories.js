import { AppColorPicker } from '@inkbeard/ui-vue';

export default {
  title: 'ui vue/AppColorPicker',
  component: AppColorPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component extended from primevue\'s `ColorPicker` component\n\nRefer to the [documentation](https://primevue.org/colorpicker/) for a full list of features.',
      },
    },
    layout: 'centered',
  },
};
export const AppColorPickerExample = {
  args: {
    modelValue: '#cccccc',
  },
};
