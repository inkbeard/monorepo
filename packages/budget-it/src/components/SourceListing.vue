<script setup lang="ts">
  import { computed, ref, nextTick } from 'vue';
  import { useSourcesStore } from '@/stores/sources';

  const props = defineProps<{
    sourceId?: number,
  }>();
  const emit = defineEmits<{
    (e: 'addSource', sourceName: string): void
    (e: 'cancelAddSource'): void
    (e: 'updateSource', sourceName: string): void
  }>();

  const { sourceList } = useSourcesStore();
  const isEditing = ref(false);
  const sourceName = props.sourceId
    ? ref(sourceList[props.sourceId])
    : ref('');
  /**
   * Check if the new source already exists or is missing.
   */
  const sourceIsDisabled = computed(() => (
    !sourceName.value
    || Object.values(useSourcesStore().sourceList).some((source) => (
      source.toLowerCase() === sourceName.value.toLowerCase()
    ))
  ));
  /**
   * Restore the source name and cancel the source editing state.
   */
  const cancelEdit = () => {
    isEditing.value = false;

    sourceName.value = props.sourceId
      ? sourceList[props.sourceId]
      : '';

    emit('cancelAddSource');
  };
  /**
   * Add a new source if it doesn't exist already or edit an existing source.
   */
  const updateSourceName = async () => {
    if (sourceIsDisabled.value) {
      return;
    }

    if (props.sourceId) {
      emit('updateSource', sourceName.value);

      await nextTick();

      isEditing.value = false;
      return;
    }

    emit('addSource', sourceName.value);
  };
</script>

<template>
  <li>
    <form
      v-if="isEditing || !sourceId"
      @submit.prevent="updateSourceName"
    >
      <input
        v-model="sourceName"
        aria-label="New source"
        data-test="new source"
        type="text"
      />
      <div class="btn-group">
        <button
          aria-label="Cancel new source"
          data-test="cancel new source"
          type="button"
          @click="cancelEdit"
        >
          <i class="fa-solid fa-xmark fa-lg" />
        </button>
        <button
          aria-label="Save source"
          data-test="save source"
          :disabled="sourceIsDisabled"
          type="submit"
        >
          <i class="fa-solid fa-check fa-lg" />
        </button>
      </div>
    </form>
    <template v-else>
      {{ sourceName }}
      <div class="btn-group">
        <button
          aria-label="Edit source"
          data-test="edit source"
          type="button"
          @click="isEditing = true"
        >
          <i class="fa-duotone fa-pencil fa-lg" />
        </button>
        <button
          aria-label="Delete source"
          data-test="delete source"
          :disabled="useSourcesStore().sourcesWithExpenses[sourceId]?.length"
          type="button"
          @click="useSourcesStore().deleteSource(sourceId)"
        >
          <i class="fa-duotone fa-trash-can fa-lg" />
        </button>
      </div>
    </template>
  </li>
</template>

<style scoped>
form {
  display: flex;
  flex: 1;
  gap: .5rem;
  justify-content: space-between;
}

input {
  flex: 1;
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
