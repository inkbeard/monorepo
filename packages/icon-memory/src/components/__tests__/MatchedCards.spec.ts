import {
  describe,
  expect,
  it,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import MatchedCards from '../MatchedCards.vue';
import type { IconCardProps } from '../IconCard.vue';

describe('MatchedCards', () => {
  const cards = [
    {
      icon: 'fa-duotone fa-solid fa-house',
      iconId: 1,
    },
    {
      icon: 'fa-duotone fa-solid fa-car',
      iconId: 2,
    },
    {
      icon: 'fa-duotone fa-solid fa-t-rex',
      iconId: 3,
    },
  ].reduce((acc, card) => {
    acc.push({
      ...card,
      isActive: true,
      isMatched: true,
    });
    return acc;
  }, [] as IconCardProps[]);
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
      expect(iconCards[index].props())
        .toEqual({
          ...cards[index],
          isActive: true,
          isCalculating: false,
          isMatched: true,
        });
    });
  });
});
