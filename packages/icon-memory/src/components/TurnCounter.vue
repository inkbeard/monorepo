<script setup lang="ts">
  defineProps<{
    /**
     * The number of turns taken in the game.
     */
    turnCount: number;
    /**
     * The number of successful pairs matched in the game.
     */
    matchedCount: number;
    /**
     * The number of pairs missed in the game.
     */
    missedCount: number;
  }>();
</script>

<template>
  <div class="turn-counter">
    <div>
      <p><strong>Total</strong></p>
      <span
        class="total-count"
        data-test="total count"
      >{{ turnCount }}</span>
    </div>
    <div class="count-breakdown">
      <div class="breakdown-grouping">
        <p><strong>Matched</strong></p>
        <span
          class="matched-count"
          data-test="matched count"
        >
          {{ matchedCount }}
        </span>
      </div>
      <div class="breakdown-grouping">
        <p><strong>Missed</strong></p>
        <span
          class="missed-count"
          data-test="missed count"
        >
          {{ missedCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.turn-counter {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

.total-count,
.matched-count,
.missed-count {
  display: flex;
  justify-content: center;
  padding: .5rem;
  font-size: var(--ink-h2-font-size);
  font-weight: var(--ink-h2-font-weight);
  color: var(--ink-white);
  border: 1px solid;
  border-radius: .5rem;
}

.count-breakdown {
  display: flex;
  gap: .5rem;
  justify-content: space-evenly;
}

.breakdown-grouping {
  flex: 1;
}

.total-count {
  background: var(--ink-info-color-light);
  border-color: var(--ink-info-color);
  color: var(--ink-info-color);
}

.matched-count {
  background: var(--ink-success-color-light);
  border-color: var(--ink-success-color);
  color: var(--ink-success-color);
}

.missed-count {
  background: var(--ink-danger-color-light);
  border-color: var(--ink-danger-color);
  color: var(--ink-danger-color);
}
</style>
