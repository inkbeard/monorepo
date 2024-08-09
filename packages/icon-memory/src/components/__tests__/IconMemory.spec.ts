import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import IconMemory from '../IconMemory.vue';
import type { IconCard } from '../IconCard.vue';

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

  beforeEach(async () => {
    vi.useFakeTimers();
    createWrapper();

    await wrapper.vm.$nextTick();
  });

  describe('GameSetup', () => {
    it('should render the component and pass the pair count and game started state', () => {
      const gameSetup = wrapper.findComponent({ name: 'GameSetup' });

      expect(gameSetup.exists())
        .toBe(true);
      expect(gameSetup.props('pairCount'))
        .toBe(pairCount);
      expect(gameSetup.props('gameHasStarted'))
        .toBe(false);
    });

    it('should update the game started state and shuffle the cards on @startGame', async () => {
      wrapper.vm.pairCount = 6;
      await wrapper.vm.$nextTick();

      const gameSetup = wrapper.findComponent({ name: 'GameSetup' });

      gameSetup.vm.$emit('startGame');

      await wrapper.vm.$nextTick();

      const cardIds = wrapper.vm.cards.map((card: IconCard) => card.cardId);

      expect(wrapper.vm.gameHasStarted)
        .toBe(true);
      expect(cardIds)
        .toHaveLength(12);
      expect(cardIds)
        .not.toEqual([
          1, 1,
          2, 2,
          3, 3,
          4, 4,
          5, 5,
          6, 6,
        ]);
    });
  });

  describe('game board', () => {
    let firstCard: IconCard;
    let secondCard: IconCard;
    let thirdCard: IconCard;
    let cards: IconCard[];

    beforeEach(async () => {
      wrapper.vm.gameHasStarted = true;

      await wrapper.vm.$nextTick();

      cards = wrapper.findAllComponents({ name: 'IconCard' });
      [firstCard, secondCard, thirdCard] = cards;
    });

    it('should render two cards for each pair count', () => {
      expect(cards.length)
        .toBe(pairCount * 2);
    });

    it('should push the card ID when a card is flipped and not calculate', async () => {
      const firstCardId = firstCard.props('cardId');

      firstCard.vm.$emit('cardClicked', firstCardId);

      expect(wrapper.vm.flippedCards)
        .toEqual([firstCardId]);
      expect(wrapper.vm.isCalculating)
        .toBe(false);
    });

    describe('2nd card flipped', () => {
      beforeEach(async () => {
        wrapper.vm.flippedCards = [firstCard.props('cardId')];

        await wrapper.vm.$nextTick();
      });

      it('should calculate on 2nd card flip', async () => {
        const secondCardId = secondCard.props('cardId');

        secondCard.vm.$emit('cardClicked', secondCardId);

        expect(wrapper.vm.isCalculating)
          .toBe(true);
        expect(wrapper.vm.flippedCards)
          .toEqual([firstCard.props('cardId'), secondCardId]);
      });

      it('should add matched card ID to stack and reset flipped cards/calculating states on successful match', async () => {
        const secondCardId = secondCard.props('cardId');

        secondCard.vm.$emit('cardClicked', secondCardId);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.matchedIds)
          .toEqual([firstCard.props('cardId')]);
        expect(wrapper.vm.flippedCards)
          .toEqual([]);
        expect(wrapper.vm.isCalculating)
          .toBe(false);
        cards.forEach((card) => {
          expect(card.props('isActive'))
            .toBe(false);
        });
      });

      it('should not add matched card ID to stack and reset card and calculating state after 1 second on unsuccessful match', async () => {
        const thirdCardId = thirdCard.props('cardId');

        thirdCard.vm.$emit('cardClicked', thirdCardId);

        expect(wrapper.vm.matchedIds)
          .toEqual([]);
        expect(wrapper.vm.flippedCards)
          .toEqual([firstCard.props('cardId'), thirdCardId]);

        vi.advanceTimersByTime(1000);

        expect(wrapper.vm.flippedCards)
          .toEqual([]);
        expect(wrapper.vm.isCalculating)
          .toBe(false);
      });
    });
  });

  describe('turn counter', () => {
    beforeEach(async () => {
      wrapper.vm.startNewGame();

      await wrapper.vm.$nextTick();
    });

    it('should render a turn counter', () => {
      expect(wrapper.findComponent({ name: 'TurnCounter' }).exists())
        .toBe(true);
    });

    it('should increment the turn count and matched count on successful match', async () => {
      const cards = wrapper.findAllComponents({ name: 'IconCard' });
      const turnCounter = wrapper.findComponent({ name: 'TurnCounter' });

      const [firstCard, secondCard] = cards.filter((card: IconCard) => card.props('cardId') === 1);

      firstCard.vm.$emit('cardClicked');
      secondCard.vm.$emit('cardClicked');

      // firstCard.vm.$emit('cardClicked', firstCard.props('cardId'));
      // secondCard.vm.$emit('cardClicked', secondCard.props('cardId'));

      await wrapper.vm.$nextTick();
      // need to wait for additional tick to allow the calculation to run
      await wrapper.vm.$nextTick();

      expect(turnCounter.props('turnCount'))
        .toBe(1);
      expect(turnCounter.props('matchedCount'))
        .toBe(1);
    });

    it('should increment the turn count and missed count on unsuccessful match', async () => {
      const cards = wrapper.findAllComponents({ name: 'IconCard' });
      const turnCounter = wrapper.findComponent({ name: 'TurnCounter' });
      const [firstCard] = cards.filter((card: IconCard) => card.props('cardId') === 1);
      const [secondCard] = cards.filter((card: IconCard) => card.props('cardId') !== 1);

      // firstCard.vm.$emit('cardClicked', firstCard.props('cardId'));
      // secondCard.vm.$emit('cardClicked', secondCard.props('cardId'));
      firstCard.vm.$emit('cardClicked');
      secondCard.vm.$emit('cardClicked');

      await wrapper.vm.$nextTick();
      vi.advanceTimersByTime(1000);

      expect(turnCounter.props('turnCount'))
        .toBe(1);
      expect(turnCounter.props('missedCount'))
        .toBe(1);
    });
  });

  describe('finish game', () => {
    beforeEach(async () => {
      wrapper.vm.startNewGame();

      await wrapper.vm.$nextTick();

      const cards = wrapper.findAllComponents({ name: 'IconCard' });
      const [firstMatchOne, firstMatchTwo] = cards.filter((card: IconCard) => card.props('cardId') === 1);
      const [secondMatchOne, secondMatchTwo] = cards.filter((card: IconCard) => card.props('cardId') === 2);

      firstMatchOne.vm.$emit('cardClicked', firstMatchOne.props('cardId'));
      firstMatchTwo.vm.$emit('cardClicked', firstMatchTwo.props('cardId'));
      secondMatchOne.vm.$emit('cardClicked', secondMatchOne.props('cardId'));
      secondMatchTwo.vm.$emit('cardClicked', secondMatchTwo.props('cardId'));

      await wrapper.vm.$nextTick();
      // need to wait for additional tick to allow the calculation to run
      await wrapper.vm.$nextTick();
    });

    it('should hide the game stats when the game is finished', async () => {
      expect(wrapper.find('[data-test="game stats"]').attributes('style'))
        .toBe('display: none;');
    });

    // Will flesh out component testing later.
    it('should show the game stats when the game is finished', async () => {
      expect(wrapper.find('[data-test="finished game stats"]').text())
        .toBe('In , you\'ve matched 2 pairs in 3 turns. That\'s a 100.00% accuracy!');
    });
  });
});
