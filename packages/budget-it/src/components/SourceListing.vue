<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useSourcesStore } from '@/stores/sources';
  import { AppButton } from '@inkbeard/ui-vue';

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
          <AppButton
            aria-label="Cancel new source"
            class="p-button-icon"
            data-test="cancel new source"
            icon="fa-solid fa-xmark fa-lg"
            text
            @click="cancelEdit"
          />
          <AppButton
            aria-label="Save source"
            class="p-button-icon"
            data-test="save source"
            :disabled="sourceIsDisabled"
            icon="fa-solid fa-check fa-lg"
            text
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
      <span>{{ sourceName }}</span>
      <div class="btn-group">
        <AppButton
          aria-label="Set default source"
          class="p-button-icon"
          data-test="set default"
          :icon="useSourcesStore().defaultSourceId === sourceId
            ? 'fa-1x fa-duotone fa-star'
            : 'fa-1x fa-regular fa-star'"
          text
          title="Set as default source"
          @click="useSourcesStore().defaultSourceId = sourceId"
        />
        <AppButton
          aria-label="Edit source"
          class="p-button-icon"
          data-test="edit source"
          icon="fa-duotone fa-pencil fa-1x"
          text
          @click="isEditing = true"
        />
        <AppButton
          aria-label="Delete source"
          class="p-button-icon"
          data-test="delete source"
          :disabled="sourcesWithExpenses[sourceId]?.length"
          icon="fa-duotone fa-trash-can fa-1x"
          text
          @click="deleteSource(sourceId)"
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
    display: flex;
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
</style>
