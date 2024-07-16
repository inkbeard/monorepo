import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppCard from '../AppCard.vue';

describe('AppCard', () => {
  let wrapper: any;
  const createWrapper = ({
    props,
  }: {
    props?: {},
  }) => {
    wrapper = shallowMount(
      AppCard,
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
