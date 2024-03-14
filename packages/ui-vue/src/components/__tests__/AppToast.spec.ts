import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppToast from '../AppToast.vue';

describe('AppToast', () => {
  let wrapper: any;
  const createWrapper = () => {
    wrapper = shallowMount(
      AppToast,
    );
  };

  it('renders properly', () => {
    createWrapper();

    expect(wrapper.html())
      .toContain('<toast-stub');
  });
});
