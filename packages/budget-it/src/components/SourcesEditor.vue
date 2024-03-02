<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { AppButton } from '@inkbeard/ui-vue';
  import SourceListing from './SourceListing.vue';

  const alphabaticSourceList = inject<({ source: string, id: number }[])>('alphabaticSourceList', []);
  const isAdding = ref(false);
</script>

<template>
  <h5>
    Sources
    <AppButton
      aria-label="Add source"
      data-test="add source"
      :disabled="isAdding"
      icon="fa-solid fa-plus fa-lg"
      text
      @click="isAdding = true"
    />
  </h5>
  <ul>
    <SourceListing
      v-if="isAdding"
      v-model:is-editing="isAdding"
    />
    <SourceListing
      v-for="({ id }) in alphabaticSourceList"
      :key="`source-list-${id}`"
      :source-id="id"
    />
  </ul>
</template>

<style scoped>
h5 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
}

button {
  background: none;
  border: none;
  color: var(--ink-color-text);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
}
</style>
