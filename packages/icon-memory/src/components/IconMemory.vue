<script setup lang="ts">
  import {
    computed,
    nextTick,
    onMounted,
    ref,
    watch,
  } from 'vue';
  import { AppButton, AppIcon } from '@inkbeard/ui-vue';
  import GameSetup from './GameSetup.vue';
  import IconCard from './IconCard.vue';
  import TurnCounter from './TurnCounter.vue';
  import TimeCounter from './TimeCounter.vue';
  import MatchedCards from './MatchedCards.vue';

  export interface Card {
    cardId: number;
    icon: string;
  }

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };
  const cards = ref<Card[]>([]);
  const icons = ref<{ [key: number]: string }>({});
  const matchedIds = ref<number[]>([]);
  const createDeck = (count: number) => {
    cards.value = [];

    for (let i = 1; i <= count; i += 1) {
      cards.value.push({
        cardId: i,
        icon: icons.value[i],
      });
      cards.value.push({
        cardId: i,
        icon: icons.value[i],
      });
    }
  };
  /**
   * Get an array of cards that have been matched.
   */
  const matchedCards = computed(() => matchedIds.value.reduce((acc, id: number) => {
    const card = cards.value.find(({ cardId }) => cardId === id);

    if (card) {
      acc.push(card);
    }

    return acc;
  }, [] as Card[]));
  const pairCount = ref(0);
  /**
   * Load the page with a dialog to set the pair count and start the game
   */
  const gameHasStarted = ref(false);
  const gameIsFinished = ref(false);
  /**
   * Start the game by shuffling the cards and updating the game state.
   */
  const startGame = () => {
    cards.value = shuffleArray(cards.value);
    gameHasStarted.value = true;
  };
  /**
   * Finish the game by updating the game state.
   */
  const finishGame = () => {
    gameHasStarted.value = false;
    gameIsFinished.value = true;
  };
  /**
   * Stop the game but do not finish it.
   */
  const stopGame = () => {
    gameHasStarted.value = false;
  };
  /**
   * Log the game time when the game stops.
   */
  const finishedTime = ref('');
  const onTimeStopped = ({ readableTime }: { readableTime: string }) => {
    finishedTime.value = readableTime;
  };

  /**
   * Calculate if the flipped cards are a match.
   * If they are, keep them flipped and add them to the matched cards.
   * If not, flip them back after 2 seconds.
   * Increase the turn count by 1 after each pair of cards is flipped.
   */
  const flippedCards = ref<number[]>([]);
  const isCalculating = ref(false);
  const turnCount = ref(0);
  const matchedCount = ref(0);
  const missedCount = ref(0);
  const calculateCards = async (cardId: number) => {
    flippedCards.value.push(cardId);

    if (flippedCards.value.length < 2) return;

    const resetFlippedCards = () => {
      flippedCards.value = [];
      isCalculating.value = false;
    };

    isCalculating.value = true;

    if (flippedCards.value[0] !== flippedCards.value[1]) {
      missedCount.value += 1;
      setTimeout(() => {
        resetFlippedCards();
      }, 1000);
    } else {
      await nextTick();

      matchedCount.value += 1;
      matchedIds.value.push(cardId);
      resetFlippedCards();
    }

    if (matchedIds.value.length === pairCount.value) {
      finishGame();
    }

    turnCount.value += 1;
  };

  /**
   * Start a new game by resetting the game state.
   */
  const startNewGame = () => {
    createDeck(pairCount.value);
    matchedIds.value = [];
    matchedCount.value = 0;
    missedCount.value = 0;
    turnCount.value = 0;
    finishedTime.value = '';
    gameIsFinished.value = false;
    startGame();
  };

  /**
   * Shuffle the icons and set the pair count to 2 when the component is mounted.
   */
  onMounted(() => {
    const shuffledIcons = shuffleArray([
      'fa-duotone fa-solid fa-house',
      'fa-duotone fa-solid fa-car',
      'fa-duotone fa-solid fa-cat-space',
      'fa-duotone fa-solid fa-dog-leashed',
      'fa-duotone fa-solid fa-leafy-green',
      'fa-duotone fa-solid fa-shield-check',
      'fa-duotone fa-solid fa-sun',
      'fa-duotone fa-solid fa-planet-moon',
      'fa-duotone fa-solid fa-rocket-launch',
      'fa-duotone fa-solid fa-cloud-moon',
      'fa-duotone fa-solid fa-bug',
      'fa-duotone fa-solid fa-ghost',
      'fa-duotone fa-solid fa-dolphin',
      'fa-duotone fa-solid fa-joystick',
      'fa-duotone fa-solid fa-kiwi-bird',
      'fa-duotone fa-solid fa-block-question',
      'fa-duotone fa-solid fa-crab',
      'fa-duotone fa-solid fa-volcano',
      'fa-duotone fa-solid fa-tree-christmas',
      'fa-duotone fa-solid fa-sheep',
    ]);

    icons.value = shuffledIcons.reduce((acc, icon, index) => {
      acc[index + 1] = icon;

      return acc;
    }, {});

    pairCount.value = 2;
  });

  watch(pairCount, (newValue: number) => {
    createDeck(newValue);
  });
</script>

<template>
  <div v-if="gameHasStarted || gameIsFinished" class="icon-memory-container">
    <section>
      <div class="game-board">
        <template v-if="!gameIsFinished">
          <IconCard
            v-for="({ cardId, icon }, index) in cards"
            :key="index"
            v-bind="{
              cardId,
              icon,
              isCalculating,
              gameHasStarted,
              isMatched: matchedIds.includes(cardId),
            }"
            @card-clicked="calculateCards"
          />
        </template>
        <div
          v-else
          class="finished-game-container"
        >
          <h3 class="finished-title">
            <AppIcon icon="fa-duotone fa-solid fa-party-horn" />
            Congratulations!
            <AppIcon icon="fa-duotone fa-solid fa-party-horn" />
          </h3>
          <h4 data-test="finished game stats">
            In {{ finishedTime }}, you've matched {{ pairCount }} pairs in {{ turnCount }} turns. That's a {{ ((matchedCount / turnCount) * 100).toFixed(2) }}% accuracy!
          </h4>
          <GameSetup
            v-model:game-has-started="gameHasStarted"
            v-model:pair-count="pairCount"
            cta-label="Start new game"
            @start-game="startNewGame"
          />
        </div>
      </div>
      <div
        v-show="!gameIsFinished"
        class="game-stats"
        data-test="game stats"
      >
        <div class="game-stats-grouping">
          <TurnCounter
            v-bind="{
              turnCount,
              matchedCount,
              missedCount,
            }"
          />
        </div>
        <div class="game-stats-grouping">
          <TimeCounter
            v-bind="{
              gameHasStarted,
            }"
            @time-stopped="onTimeStopped"
          />
        </div>
        <div class="game-stats-grouping">
          <AppButton
            :disabled="gameIsFinished"
            icon="fa-duotone fa-solid fa-circle-stop"
            is-full-width
            label="Stop game"
            raised
            severity="danger"
            @click="stopGame"
          />
        </div>
      </div>
    </section>
    <aside>
      <MatchedCards
        v-bind="{
          cards: matchedCards,
        }"
      />
    </aside>
  </div>
  <div
    v-if="!gameHasStarted && !gameIsFinished"
    class="game-setup"
  >
    <GameSetup
      v-model:game-has-started="gameHasStarted"
      v-model:pair-count="pairCount"
      @start-game="startGame"
    />
  </div>
</template>

<style scoped>
.icon-memory-container {
  display: flex;
  gap: 2rem;
  flex-direction: row;
}

section {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.game-stats {
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
}

.game-board {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--ink-border-color);
  border-radius: .5rem;
  box-shadow: .1rem .1rem .5rem rgba(0 0 0 / 50%);

  html.dark & {
    box-shadow: .1rem .1rem .5rem rgba(255 255 255 / 50%);
  }
}

.game-setup {
  width: 25rem;
  margin: 5rem auto 0;
}

.game-stats-grouping {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  padding: 0 2rem;

  &:not(:first-of-type) {
    border-left: 1px solid var(--ink-border-color);
  }
}

.finished-game-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.finished-title {
  margin: 0;
  color: var(--ink-success-color)
}
</style>
