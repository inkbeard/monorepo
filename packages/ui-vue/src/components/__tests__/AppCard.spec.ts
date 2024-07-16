import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppCard from '../AppCard.vue';

describe('AppCard', () => {
  let wrapper: any;
  const createWrapper = ({
    slots,
  }: {
    slots?: {},
  }) => {
    wrapper = shallowMount(
      AppCard,
      {
        slots: { ...slots },
      },
    );
  };

  it('should render an empty card with no slots', () => {
    createWrapper({ });

    expect(wrapper.text())
      .toBe('');
  });

  it('should render the header slot', () => {
    const content = 'header slot';

    createWrapper({
      slots: { header: content },
    });

    const header = wrapper.find('.app-card-header');

    expect(header.exists())
      .toBe(true);
    expect(header.text())
      .toBe(content);
  });

  it('should render the title slot', () => {
    const content = 'title slot';

    createWrapper({
      slots: { title: content },
    });

    const title = wrapper.find('.app-card-title');

    expect(title.exists())
      .toBe(true);
    expect(title.text())
      .toBe(content);
  });

  it('should render the subTitle slot', () => {
    const content = 'subTitle slot';

    createWrapper({
      slots: { subTitle: content },
    });

    const subTitle = wrapper.find('.app-card-sub-title');

    expect(subTitle.exists())
      .toBe(true);
    expect(subTitle.text())
      .toBe(content);
  });

  it('should render the default slot', () => {
    const content = 'default slot';

    createWrapper({
      slots: { default: content },
    });

    const defaultSlot = wrapper.find('.app-card-description');

    expect(defaultSlot.exists())
      .toBe(true);
    expect(defaultSlot.text())
      .toBe(content);
  });

  it('should render the footer slot', () => {
    const content = 'footer slot';

    createWrapper({
      slots: { footer: content },
    });

    const footer = wrapper.find('.app-card-footer');

    expect(footer.exists())
      .toBe(true);
    expect(footer.text())
      .toBe(content);
  });
});
