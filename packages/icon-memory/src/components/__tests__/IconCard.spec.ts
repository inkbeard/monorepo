import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import IconCard from '../IconCard.vue';

describe('IconCard', () => {
  const iconId = 1;
  const icon = 'fa-duotone fa-solid fa-house';
  let wrapper: any;
  const createWrapper = ({
    props,
  }: {
    props?: object,
  } = {}) => {
    wrapper = shallowMount(
      IconCard,
      {
        props: {
          iconId,
          icon,
          isActive: false,
          isMatched: false,
          pro: false,
          ...props,
        },
      },
    );
  };

  describe('icon', () => {
    beforeEach(() => {
      createWrapper();
      vi.useFakeTimers();
    });

    it('should render if the card is flipped', async () => {
      wrapper.vm.isActive = true;

      await wrapper.vm.$nextTick();

      const iconEl = wrapper.findComponent({ name: 'AppIcon' });

      expect(iconEl.exists())
        .toBe(true);
      expect(iconEl.props('icon'))
        .toBe(icon);
    });

    it('should remove after the the card is flipped back over', async () => {
      wrapper.vm.isActive = true;
      await wrapper.vm.$nextTick();

      wrapper.vm.isActive = false;
      await wrapper.vm.$nextTick();

      vi.advanceTimersByTime(600);
      await wrapper.vm.$nextTick();

      const iconEl = wrapper.findComponent({ name: 'AppIcon' });

      expect(iconEl.exists())
        .toBe(false);
    });

    it('should render with a matched class if the card is matched', async () => {
      await wrapper.setProps({ isMatched: true });

      const iconEl = wrapper.findComponent({ name: 'AppIcon' });

      expect(iconEl.exists())
        .toBe(true);
      expect(wrapper.classes())
        .toContain('matched');
    });
  });

  describe('card click', () => {
    beforeEach(() => {
      createWrapper();
    });

    it('should emit and change to active', async () => {
      wrapper.trigger('click');

      expect(wrapper.emitted().cardClicked)
        .toBeTruthy();
      expect(wrapper.vm.isActive)
        .toBe(true);
    });

    it('should not emit or change state if card is matched', async () => {
      await wrapper.setProps({ isMatched: true });

      wrapper.trigger('click');

      expect(wrapper.emitted().cardClicked)
        .toBeFalsy();
    });

    it('should not emit or change state if card is calculating', async () => {
      await wrapper.setProps({ isCalculating: true });

      wrapper.trigger('click');

      expect(wrapper.emitted().cardClicked)
        .toBeFalsy();
    });
  });
});
