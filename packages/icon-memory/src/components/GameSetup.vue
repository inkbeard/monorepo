<script setup lang="ts">
  import {
    AppButton,
    AppInputNumber,
  } from '@inkbeard/ui-vue';

  export type GameSetupProps = {
    /**
     * The number of pairs of cards to display.
     */
    ctaLabel?: string;
  };

  const { ctaLabel = 'Start game' } = defineProps<GameSetupProps>();

  defineEmits<{
    startGame: [];
  }>();

  const pairCount = defineModel<number>('pairCount', { required: true });
  const gameHasStarted = defineModel<boolean>('gameHasStarted');
</script>

<template>
  <AppInputNumber
    v-model="pairCount"
    data-test="edit pair count"
    :disabled="gameHasStarted"
    input-id="pair-count"
    label="Number of pairs"
    :max="20"
    :min="2"
  />
  <AppButton
    data-test="start game"
    :disabled="gameHasStarted"
    :label="ctaLabel"
    raised
    @click="$emit('startGame')"
  />
</template>

<style scoped>
.app-form-group  {
  margin-bottom: 1rem;
}
</style>
