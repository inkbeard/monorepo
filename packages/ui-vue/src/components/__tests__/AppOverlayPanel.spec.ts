import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppOverlayPanel from '../AppOverlayPanel.vue';

describe('AppOverlayPanel', () => {
  let wrapper: any;
  const createWrapper = () => {
    wrapper = shallowMount(
      AppOverlayPanel,
    );
  };

  it('renders properly', () => {
    createWrapper();

    expect(wrapper.html())
      .toContain('<overlay-panel-stub');
  });
});
