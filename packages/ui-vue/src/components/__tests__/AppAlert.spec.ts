import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppAlert from '../AppAlert.vue';

describe('AppAlert', () => {
  let wrapper: any;
  const createWrapper = ({
    props,
    slots,
  }: {
    props?: {},
    slots?: {},
  }) => {
    wrapper = shallowMount(
      AppAlert,
      {
        props: { ...props },
        slots: { ...slots },
      },
    );
  };

  it('should apply center class', async () => {
    createWrapper({ props: { center: true } });

    expect(wrapper.classes())
      .toContain('is-center');
  });

  describe('title', () => {
    it('should not render by default', () => {
      expect(wrapper.find('[data-test="alert title"]').exists())
        .toBe(false);
    });

    it('should render when passed as a prop', async () => {
      createWrapper({ props: { title: 'title prop' } });

      expect(wrapper.find('[data-test="alert title"]').text())
        .toBe('title prop');
    });

    it('should override prop with a slot', async () => {
      createWrapper({
        props: { title: 'title prop' },
        slots: { title: 'title slot' },
      });

      expect(wrapper.find('[data-test="alert title"]').text())
        .toBe('title slot');
    });
  });

  describe('description', () => {
    it('should render a description when passed', async () => {
      createWrapper({ props: { description: 'prop description' } });

      expect(wrapper.find('[data-test="alert description"]').text())
        .toBe('prop description');
    });

    it('should override the description prop with a description slot', async () => {
      createWrapper({
        props: { description: 'prop description' },
        slots: { default: 'slot description' },
      });

      expect(wrapper.find('[data-test="alert description"]').text())
        .toBe('slot description');
    });
  });

  describe('icon', () => {
    it('should not render by default', () => {
      expect(wrapper.find('[data-test="alert icon"]').exists())
        .toBe(false);
    });

    it.each`
      severity         | icon
      ${'danger'}  | ${'fa-duotone fa-circle-exclamation'}
      ${'info'}    | ${'fa-duotone fa-circle-info'}
      ${'success'} | ${'fa-duotone fa-check-circle'}
      ${'warn'}    | ${'fa-duotone fa-triangle-exclamation'}
    `(
      'should render $icon icon for the $severity severity',
      async ({ severity, icon }) => {
        createWrapper({ props: { showIcon: true, severity } });

        expect(wrapper.findComponent('[data-test="alert icon"]').props('icon'))
          .toBe(icon);
      },
    );
  });

  describe('close', () => {
    it('should style with class when closable', async () => {
      createWrapper({ props: { closable: true } });

      expect(wrapper.classes())
        .toContain('is-closable');
    });

    it('should render an element when closable', async () => {
      createWrapper({ props: { closable: true } });

      expect(wrapper.find('[data-test="close alert"]').exists())
        .toBe(true);
    });
  });
});
