import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppIcon from '../AppIcon.vue';

describe('AppIcon', () => {
  it('renders classes with default large style', () => {
    const fontStyle = 'fa-solid';
    const iconName = 'fa-check';
    const wrapper = mount(AppIcon, {
      props: { icon: `${fontStyle} ${iconName}` },
    });

    expect(wrapper.classes())
      .toEqual([
        fontStyle,
        iconName,
        'app-icon',
        'fa-lg',
      ]);
  });
});
