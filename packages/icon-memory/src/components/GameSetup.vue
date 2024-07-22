<script setup lang="ts">
  import {
    AppButton,
    AppInputNumber,
  } from '@inkbeard/ui-vue';

  defineEmits<{
    startGame: [];
  }>();

  const pairCount = defineModel<number>('pairCount');
  const gameHasStarted = defineModel<boolean>('gameHasStarted');
</script>

<template>
  <AppInputNumber
    v-model="pairCount"
    data-test="edit pair count"
    :disabled="gameHasStarted"
    input-id="pair-count"
    label="Pairs"
    :max="20"
    :min="2"
  />
  <AppButton
    data-test="start game"
    :disabled="gameHasStarted"
    is-full-width
    label="Start game"
    raised
    severity="primary"
    @click="$emit('startGame')"
  />
</template>

<style scoped>
.app-form-group  {
  margin-bottom: 1rem;
}
</style>
