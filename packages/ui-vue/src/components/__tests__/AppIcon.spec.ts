import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppIcon from '../AppIcon.vue';

describe('AppIcon', () => {
  it('should render classes with default large style', () => {
    const fontStyle = 'fa-solid';
    const iconName = 'fa-check';
    const wrapper = mount(AppIcon, {
      props: { icon: `${fontStyle} ${iconName}` },
    });

    expect(wrapper.classes()).toContain('app-icon');
    expect(wrapper.classes()).toContain('fa-lg');
    expect(wrapper.classes()).toContain(fontStyle);
    expect(wrapper.classes()).toContain(iconName);
  });
});
