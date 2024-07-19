<script setup lang="ts">
  import { ref } from 'vue';
  import {
    AppButton,
    AppInputNumber,
  } from '@inkbeard/ui-vue';

  const turnCount = ref(0);
  const cardCount = ref(4);
</script>

<template>
  <AppInputNumber
    v-model="cardCount"
    input-id="card-count"
    label="Pairing count"
    :min="4"
    :step="2"
  />
  <AppButton
    label="New turn"
    raised
    severity="primary"
    @click="turnCount++"
  />
  <p>Turn count: {{ turnCount }}</p>
</template>
