import {
  describe,
  expect,
  it,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import MatchedCards from '../MatchedCards.vue';

describe('MatchedCards', () => {
  const cards = [
    {
      icon: 'fa-duotone fa-solid fa-house',
      cardId: 1,
      pro: false,
      gameHasStarted: false,
    },
    {
      icon: 'fa-duotone fa-solid fa-car',
      cardId: 2,
      pro: true,
      gameHasStarted: false,
    },
    {
      icon: 'fa-duotone fa-solid fa-t-rex',
      cardId: 3,
      pro: true,
      gameHasStarted: false,
    },
  ];
  let wrapper: any;
  const createWrapper = () => {
    wrapper = shallowMount(
      MatchedCards,
      {
        props: { cards },
      },
    );
  };

  it('should render an IconCard for each card', () => {
    createWrapper();

    const iconCards = wrapper.findAllComponents({ name: 'IconCard' });

    expect(iconCards)
      .toHaveLength(cards.length);
    cards.forEach((card, index) => {
      expect(iconCards[index].props())
        .toMatchObject(cards[index]);
    });
  });
});
