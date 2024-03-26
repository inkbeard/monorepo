import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppAlert from '../AppAlert.vue';

describe('AppAlert', () => {
  let wrapper: any;
  const createWrapper = ({
    props,
  }: {
    props?: {},
  }) => {
    wrapper = shallowMount(
      AppAlert,
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
