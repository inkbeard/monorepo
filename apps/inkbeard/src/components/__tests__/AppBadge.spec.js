import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppBadge from '../AppBadge.vue';

describe('AppBadge', () => {
  let wrapper;
  const createWrapper = (propsData = {}) => {
    wrapper = mount(
      AppBadge,
      {
        props: {
          value: 'badge text',
          ...propsData,
        },
      },
    );
  };

  it('should render pill shaped class', () => {
    createWrapper({ isPill: true });

    expect(wrapper.classes())
      .toContain('is-pill');
  });

  it('should render counter shaped badge', () => {
    createWrapper({ isCounter: true });

    expect(wrapper.classes())
      .toContain('is-counter');
  });
});
