<script setup lang="ts">
  import { ref, computed, inject } from 'vue';
  import { AppButton } from '@inkbeard/ui-vue';
  import type { CategoryInfo } from '../types';

  const categoryList = inject<CategoryInfo[]>('categoryList', []);
  const addCategory = inject<Function>('addCategory', () => () => {});
  const categoryName = ref('');
  /**
   * Whether the user is currently adding a new category.
   */
  const isAdding = defineModel<boolean>('isAdding');
  const isDisabled = computed(() => (
    !categoryName.value
    || categoryList.some(({ name }) => (
      name.toLowerCase() === categoryName.value.trim().toLowerCase()))
  ));

  function cancelEdit() {
    categoryName.value = '';
    isAdding.value = false;
  }

  function addNewCategory() {
    if (isDisabled.value) return;

    addCategory(categoryName.value);
    cancelEdit();
  }
</script>

<template>
  <div class="add-category-container">
    <div
      v-if="!isAdding"
      class="button-group"
    >
      <AppButton
        icon="fa-solid fa-plus"
        label="Add category"
        raised
        @click="isAdding = true"
      />
    </div>
    <div v-else>
      <label for="add-category">
        Category Name:
      </label>
      <input
        id="add-category"
        v-model="categoryName"
        type="text"
        @keydown.enter="addNewCategory"
      />
      <div class="button-group">
        <AppButton
          label="Cancel"
          raised
          severity="secondary"
          @click="cancelEdit"
        />
        <AppButton
          :disabled="isDisabled"
          label="Add"
          raised
          @click="addNewCategory"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-category-container {
  padding: 1rem;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

button {
  cursor: pointer;
}
</style>
