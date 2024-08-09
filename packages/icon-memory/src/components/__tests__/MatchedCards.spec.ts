import {
  describe,
  expect,
  it,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import MatchedCards from '../MatchedCards.vue';
import { cards } from '../../assets/mockData';

describe('MatchedCards', () => {
  let wrapper: any;
  const createWrapper = () => {
    wrapper = shallowMount(
      MatchedCards,
      {
        props: { cards },
      },
    );
  };

  it('should render an IconCard for each card with both an `isActive` and `isMatched` state', () => {
    createWrapper();

    const iconCards = wrapper.findAllComponents({ name: 'IconCard' });

    expect(iconCards)
      .toHaveLength(cards.length);
    cards.forEach((card, index) => {
      expect(iconCards[index].props('isActive'))
        .toBe(true);
      expect(iconCards[index].props('isMatched'))
        .toBe(true);
    });
  });
});
