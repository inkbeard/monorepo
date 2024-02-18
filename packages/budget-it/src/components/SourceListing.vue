<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useSourcesStore } from '@/stores/sources';

  const props = defineProps<{
    sourceId?: number,
  }>();
  const {
    addSource,
    deleteSource,
    sourceList,
    sourcesWithExpenses,
  } = useSourcesStore();
  const isDefault = ref(false);
  const isEditing = defineModel('isEditing', { type: Boolean });
  const sourceName = props.sourceId
    ? ref(sourceList[props.sourceId])
    : ref('');
  /**
   * Check if the new source already exists or is missing.
   */
  const sourceIsDisabled = computed(() => (
    !sourceName.value
    || Object.values(sourceList).some((source) => (
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
  };
  /**
   * Add a new source if it doesn't exist already or edit an existing source, then cancel the source editing state.
   */
  const onSourceSave = () => {
    if (sourceIsDisabled.value) {
      return;
    }

    if (props.sourceId) {
      sourceList[props.sourceId] = sourceName.value;
    } else {
      addSource({
        isDefault: isDefault.value,
        sourceName: sourceName.value,
      });
    }

    isEditing.value = false;
  };
</script>

<template>
  <li>
    <form
      v-if="isEditing || !sourceId"
      @submit.prevent="onSourceSave"
    >
      <div>
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
      </div>
      <label
        v-if="!sourceId"
        :for="`default-${sourceId || 'new'}`"
      >
        <input
          :id="`default-${sourceId || 'new'}`"
          v-model="isDefault"
          type="checkbox"
        />
        Set source as default
      </label>
    </form>
    <template v-else>
      {{ sourceName }}
      <div class="btn-group">
        <button
          aria-label="Set default source"
          data-test="set default"
          title="Set as default source"
          type="button"
          @click="useSourcesStore().defaultSourceId = sourceId"
        >
          <i
            class="fa-lg"
            :class="useSourcesStore().defaultSourceId === sourceId
              ? 'fa-duotone fa-star'
              : 'fa-regular fa-star'"
          />
        </button>
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
          :disabled="sourcesWithExpenses[sourceId]?.length"
          type="button"
          @click="deleteSource(sourceId)"
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
  flex-direction: column;
  flex: 1;
  gap: .5rem;
  justify-content: space-between;

  > div {
    display: flex;;
    flex-direction: row;
  }
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
  color: var(--ink-color-text);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
}
</style>
