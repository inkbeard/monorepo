<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import type { TimeStopped } from '../types';

  export type TimeCounterProps = {
    /**
     * Whether the game has started or not.
     */
    gameHasStarted?: boolean;
  };

  const { gameHasStarted = false } = defineProps<TimeCounterProps>();
  const emit = defineEmits<{
    /**
     * Emit the total time and the time in 'HH:MM:SS.MS' format when the game stops.
     */
    timeStopped: [TimeStopped];
  }>();
  const clock = ref(0);
  const timeBegan = ref<Date | null>(null);
  const timeCurrent = ref<Date | null>(null);
  let timer = 0;
  /**
   * Calculate the time elapsed since the game began in 'HH:MM:SS.MS'.
   */
  const timeElapsed = computed(() => {
    const timeDifference = timeCurrent.value instanceof Date
      && timeBegan.value instanceof Date
      ? new Date(timeCurrent.value.getTime() - timeBegan.value.getTime())
      : null;
    const minutes = timeDifference?.getUTCMinutes() || 0;
    const seconds = timeDifference?.getUTCSeconds() || 0;
    const milliseconds = timeDifference?.getUTCMilliseconds() || 0;
    const zeroPrefix = (num: number, prefixCount: number) => num.toString().padStart(prefixCount, '0');

    return `${zeroPrefix(minutes, 2)}:${zeroPrefix(seconds, 2)}.${zeroPrefix(milliseconds, 3)}`;
  });

  watch(
    () => gameHasStarted,
    (newValue, oldValue) => {
      if (newValue) {
        timeBegan.value = new Date();
        clock.value = 0;
        timer = window.setInterval(() => {
          clock.value += 1;
          timeCurrent.value = new Date();
        }, 10);
      } else if (!newValue && oldValue) {
        window.clearInterval(timer);
        timer = 0;
        emit('timeStopped', {
          time: clock.value,
          readableTime: timeElapsed.value,
        });
      }
    },
    { immediate: true },
  );
</script>

<template>
  <div class="time-counter-container">
    <p><strong>Time taken</strong></p>
    <span class="counter" data-test="readable time">{{ timeElapsed }}</span>
  </div>
</template>

<style scoped>
.time-counter-container {
  text-align: center;
}

.counter {
  display: flex;
  justify-content: center;
  padding: .5rem;
  background: var(--ink-info-color-light);
  border: 1px solid var(--ink-info-color);
  border-radius: .5rem;
  color: var(--ink-info-color);
  font-size: var(--ink-h2-font-size);
  font-weight: var(--ink-h2-font-weight);
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
</style>
