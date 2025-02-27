<script setup lang="ts">
  import { computed, inject, ref } from 'vue';
  import {
    AppButton,
    useToast,
  } from '@inkbeard/ui-vue';
  import type { SourceList } from '../types';

  const props = defineProps<{
    /**
     * The id of the source to display.
     */
    sourceId?: number;
  }>();
  const toast = useToast();
  const addSource = inject<Function>('addSource', () => () => {});
  const defaultSourceId = inject<number>('defaultSourceId');
  const sourceList = inject<SourceList>('sourceList', {});
  const sourcesWithExpenses = inject<Record<string, string[]>>('sourcesWithExpenses', {});
  const isDefault = ref(false);
  /**
   * Whether the user is currently editing a source.
   */
  const isEditing = defineModel<boolean>('isEditing');
  const sourceName = ref('');

  if (props.sourceId) {
    sourceName.value = sourceList[props.sourceId] ?? '';
  }

  /**
   * Check if the new source already exists or is missing.
   */
  const sourceIsDisabled = computed(() => (
    !sourceName.value
    || Object.values(sourceList as SourceList).some((source) => (
      source.toLowerCase() === sourceName.value.toLowerCase()
    ))
  ));

  /**
   * Restore the source name and cancel the source editing state.
   */
  function cancelEdit() {
    isEditing.value = false;
    sourceName.value = props.sourceId
      ? sourceList?.[props.sourceId] ?? ''
      : '';
  }
  /**
   * Add a new source if it doesn't exist already or edit an existing source, then cancel the source editing state.
   */
  function onSourceSave() {
    if (sourceIsDisabled.value) {
      return;
    }

    if (props.sourceId && sourceList?.[props.sourceId]) {
      sourceList[props.sourceId] = sourceName.value;
    } else {
      addSource({
        isDefault: isDefault.value,
        sourceName: sourceName.value,
      });
    }

    isEditing.value = false;
  }
  /**
   * Remove the source from the list of sources.
   */
  function deleteSource() {
    if (!props.sourceId) {
      return;
    }

    delete sourceList[props.sourceId];
    toast.add({
      severity: 'success',
      summary: 'Source deleted',
      detail: `"${sourceName.value}" has been deleted.`,
      life: 5000,
    });
  }
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
          <AppButton
            aria-label="Cancel new source"
            data-test="cancel new source"
            icon="fa-solid fa-xmark"
            severity="secondary"
            size="sm"
            text
            @click="cancelEdit"
          />
          <AppButton
            aria-label="Save source"
            data-test="save source"
            :disabled="sourceIsDisabled"
            icon="fa-solid fa-check"
            size="sm"
            text
            type="submit"
          />
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
        <AppButton
          aria-label="Set default source"
          data-test="set default"
          :icon="defaultSourceId === sourceId
            ? 'fa-duotone fa-star'
            : 'fa-regular fa-star'"
          size="sm"
          text
          title="Set as default source"
          @click="defaultSourceId = sourceId"
        />
        <AppButton
          aria-label="Edit source"
          data-test="edit source"
          icon="fa-duotone fa-pencil"
          size="sm"
          text
          @click="isEditing = true"
        />
        <AppButton
          aria-label="Delete source"
          data-test="delete source"
          :disabled="sourcesWithExpenses[sourceId]?.length"
          icon="fa-duotone fa-trash-can"
          severity="danger"
          size="sm"
          text
          @click="deleteSource"
        />
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
  align-items: center;
  justify-content: space-between;
  gap: .1rem;
  list-style: none;
  padding: .2rem 0;
}
</style>
