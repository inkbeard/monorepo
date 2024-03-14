import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Donkey from '../Donkey.vue';

describe('Donkey', () => {
  let wrapper: any;
  const createWrapper = ({
    props,
  }: {
    props?: {},
  }) => {
    wrapper = shallowMount(
      Donkey,
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
