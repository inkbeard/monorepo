import { AppIcon } from '@inkbeard/ui-vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'ui-vue/AppIcon',
  component: AppIcon,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: [
        'fa-solid fa-plus',
        'fa-solid fa-download',
      ],
    },
    size: {
      control: {
        type: 'select',
      },
      options: [
        // relative sizes
        '2xs',
        'xs',
        'sm',
        'lg',
        'xl',
        '2xl',
        // literal sizes
        '1x',
        '2x',
        '3x',
        '4x',
        '5x',
        '6x',
        '7x',
        '8x',
        '9x',
        '10x',
      ],
    },
    type: {
      control: {
        type: 'select',
      },
      options: [
        '',
        'danger',
        'info',
        'success',
        'warning',
      ],
    },
  },
  parameters: {
    layout: 'centered',
  },
};
export const PrimaryPlus = {
  args: {
    icon: 'fa-solid fa-plus',
  },
};