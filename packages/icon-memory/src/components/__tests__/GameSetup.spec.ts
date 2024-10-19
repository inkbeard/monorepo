import {
  describe, it, expect,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import GameSetup from '../GameSetup.vue';

describe('GameSetup', () => {
  const pairCount = 2;
  let wrapper: any;
  const createWrapper = ({
    props,
  }: {
    props?: object,
  } = {}) => {
    wrapper = shallowMount(
      GameSetup,
      {
        props: {
          pairCount,
          ...props,
        },
      },
    );
  };

  describe('pairCount', () => {
    it('should render a input field that gets/sets the pairCount prop', () => {
      createWrapper();

      const pairCountInput = wrapper.findComponent('[data-test="edit pair count"]');

      expect(pairCountInput.exists())
        .toBe(true);
      expect(pairCountInput.props('modelValue'))
        .toBe(pairCount);
    });

    it('should be disabled if the game is already started', () => {
      createWrapper({
        props: {
          gameHasStarted: true,
        },
      });

      const pairCountInput = wrapper.findComponent('[data-test="edit pair count"]');

      expect(pairCountInput.props('disabled'))
        .toBe(true);
    });
  });

  describe('start game cta', () => {
    it('should render a cta that emits to start the game on click', async () => {
      createWrapper();

      const cta = wrapper.findComponent('[data-test="start game"]');

      expect(cta.exists())
        .toBe(true);

      await cta.trigger('click');

      expect(wrapper.emitted().startGame)
        .toBeTruthy();
    });

    it('should be disabled if the game is already started', () => {
      createWrapper({
        props: {
          gameHasStarted: true,
        },
      });

      const cta = wrapper.findComponent('[data-test="start game"]');

      expect(cta.props('disabled'))
        .toBe(true);
    });
  });
});
