import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppColorPicker from '../AppColorPicker.vue';

describe('AppColorPicker', () => {
  let wrapper: any;
  const createWrapper = () => {
    wrapper = shallowMount(
      AppColorPicker,
    );
  };

  it('renders properly', () => {
    createWrapper();

    expect(wrapper.html())
      .toContain('<color-picker-stub');
  });
});
