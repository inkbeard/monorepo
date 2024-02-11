<script setup lang="ts">
  import { computed } from 'vue';
  import { useSourcesStore } from '@/stores/sources';
  import { useExpensesStore } from '@/stores/expenses';

  const sourcesWithExpenses = computed(() => (
    Object.entries(useExpensesStore().expenseList)
      .reduce((acc: any, [id, { sourceId }]) => {
        if (acc[sourceId]) {
          acc[sourceId].push(id);
        } else {
          acc[sourceId] = [id];
        }

        return acc;
      }, {})));
</script>

<template>
  <h2>Sources</h2>
  <ul>
    <li
      v-for="({ id, source }) in useSourcesStore().alphabaticSourceList"
      :key="id"
    >
      {{ source }}
      <button
        aria-label="Delete source"
        data-test="delete source"
        :disabled="!sourcesWithExpenses[id]?.length"
        type="button"
        @click="useSourcesStore().deleteSource(id)"
      >
        <i class="fa-duotone fa-trash-can fa-lg" />
      </button>
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  gap: .1rem;
  list-style: none;
  padding: .2rem 0;
}

button {
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
}
</style>
