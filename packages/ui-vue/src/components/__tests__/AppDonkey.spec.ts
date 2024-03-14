import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppDonkey from '../AppDonkey.vue';

describe('AppDonkey', () => {
  let wrapper: any;
  const createWrapper = ({
    props,
  }: {
    props?: {},
  }) => {
    wrapper = shallowMount(
      AppDonkey,
      {
        props: { ...props },
      },
    );
  };

  it('renders properly', () => {
    createWrapper({
      props: { msg: 'Hello Test!' },
    });

    expect(wrapper.text())
      .toContain('Hello Test!');
  });
});
