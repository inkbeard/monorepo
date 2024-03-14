import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Dragon from '../Dragon.vue';

describe('Dragon', () => {
  let wrapper: any;
  const createWrapper = ({
    props,
  }: {
    props?: {},
  }) => {
    wrapper = shallowMount(
      Dragon,
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
