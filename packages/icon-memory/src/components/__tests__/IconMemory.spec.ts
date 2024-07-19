import {
  describe, it, expect,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import IconMemory from '../IconMemory.vue';

describe('IconMemory', () => {
  const pairCount = 2;
  let wrapper: any;
  const createWrapper = ({
    props,
  }: {
    props?: object,
  } = {}) => {
    wrapper = shallowMount(
      IconMemory,
      {
        props: { ...props },
      },
    );
  };

  describe('GameSetup', () => {
    it('should render the component and pass the pair count and game started state', () => {
      createWrapper();

      const gameSetup = wrapper.findComponent({ name: 'GameSetup' });

      expect(gameSetup.exists())
        .toBe(true);
      expect(gameSetup.props('pairCount'))
        .toBe(pairCount);
      expect(gameSetup.props('gameHasStarted'))
        .toBe(false);
    });

    it('should update the game started state on @startGame', async () => {
      createWrapper();

      const gameSetup = wrapper.findComponent({ name: 'GameSetup' });

      await gameSetup.vm.$emit('startGame');

      expect(wrapper.vm.gameHasStarted)
        .toBe(true);
    });
  });

  describe('board', () => {
    it('should render twice the amount of cards than the pair count', () => {
      createWrapper();

      const cards = wrapper.findAll('.card');

      expect(cards.length)
        .toBe(pairCount * 2);
    });
  });
});
