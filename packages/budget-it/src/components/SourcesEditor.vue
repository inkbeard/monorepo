<script setup lang="ts">
  import { computed, ref, nextTick } from 'vue';
  import { useSourcesStore } from '@/stores/sources';
  import { useExpensesStore } from '@/stores/expenses';

  const isAdding = ref(false);
  const newSource = ref('');
  /**
   * Check if the new source already exists or is missing.
   */
  const newSourceIsDisabled = computed(() => (
    !newSource.value
    || Object.values(useSourcesStore().sourceList).some((sourceName) => (
      sourceName.toLowerCase() === newSource.value.toLowerCase()
    ))
  ));
  /**
   * Get the expenses associated with the sources.
   */
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
  /**
   * Add a new source if it doesn't exist already.
   */
  const addSource = async () => {
    if (newSourceIsDisabled.value) {
      return;
    }

    useSourcesStore().addSource(newSource.value);

    await nextTick();

    isAdding.value = false;
    newSource.value = '';
  };
</script>

<template>
  <h2>
    Sources
    <button
      aria-label="Add source"
      data-test="add source"
      :disabled="isAdding"
      type="button"
      @click="isAdding = true"
    >
      <i class="fa-solid fa-plus fa-lg" />
    </button>
  </h2>
  <form
    v-if="isAdding"
    @submit.prevent="addSource"
  >
    <input
      v-model="newSource"
      aria-label="New source"
      data-test="new source"
      type="text"
    />
    <div class="btn-group">
      <button
        aria-label="Cancel new source"
        data-test="cancel new source"
        type="button"
        @click="isAdding = false"
      >
        <i class="fa-solid fa-xmark fa-lg" />
      </button>
      <button
        aria-label="Save source"
        data-test="save source"
        :disabled="newSourceIsDisabled"
        type="submit"
      >
        <i class="fa-solid fa-check fa-lg" />
      </button>
    </div>
  </form>
  <ul>
    <li
      v-for="({ id, source }) in useSourcesStore().alphabaticSourceList"
      :key="id"
    >
      {{ source }}
      <button
        aria-label="Delete source"
        data-test="delete source"
        :disabled="sourcesWithExpenses[id]?.length"
        type="button"
        @click="useSourcesStore().deleteSource(id)"
      >
        <i class="fa-duotone fa-trash-can fa-lg" />
      </button>
    </li>
  </ul>
</template>

<style scoped>
h2 {
  display: flex;
  justify-content: space-between;
}

form {
  display: flex;
  gap: .5rem;
  justify-content: space-between;
  margin-bottom: 1rem;
}

input {
  flex: 1;
}

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
