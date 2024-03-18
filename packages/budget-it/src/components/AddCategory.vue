<script setup lang="ts">
  import { ref, computed, inject } from 'vue';
  import {
    AppButton,
    AppInputText,
    AppColorPicker,
  } from '@inkbeard/ui-vue';
  import type { CategoryInfo } from '../types';

  const presetColors = [
    'b30000',
    '7c1158',
    '4421af',
    '1a53ff',
    '0d88e6',
    '00b7c7',
    '5ad45a',
    '8be04e',
    'ebdc78',
  ];
  const categoryList = inject<CategoryInfo[]>('categoryList', []);
  const addCategory = inject<Function>('addCategory', () => () => {});
  const categoryName = ref('');
  const categoryColor = ref(presetColors[0]);
  /**
   * Whether the user is currently adding a new category.
   */
  const isAdding = defineModel<boolean>('isAdding');
  /**
   * Disable the save button if the category name is empty or the category name already exists.
   */
  const isDisabled = computed(() => (
    !categoryName.value
    || categoryList.some(({ name }) => (
      name.toLowerCase() === categoryName.value.trim().toLowerCase()))
  ));
  /**
   * Close the add category form and reset the category name.
   */
  function cancelEdit() {
    categoryName.value = '';
    [categoryColor.value] = presetColors;
    isAdding.value = false;
  }
  /**
   * Add a new category to the parent component and reset the form.
   */
  function addNewCategory() {
    if (isDisabled.value) return;

    addCategory({
      backgroundColor: `#${categoryColor.value}`,
      name: categoryName.value,
    });
    cancelEdit();
  }
</script>

<template>
  <div class="add-category-container">
    <div
      v-if="!isAdding"
      class="btn-group align-end"
    >
      <AppButton
        icon="fa-solid fa-plus"
        label="Add category"
        raised
        @click="isAdding = true"
      />
    </div>
    <template v-else>
      <div class="category-info">
        <AppColorPicker
          v-model="categoryColor"
          class="category-background"
        />
        <AppInputText
          v-model="categoryName"
          class="category-name"
          data-test="edit category name"
          input-id="add-category"
          label="Category Name"
          @keydown.enter="addNewCategory"
        />
      </div>
      <div class="btn-group align-end">
        <AppButton
          data-test="cancel add category"
          icon="fa-solid fa-xmark"
          label="Cancel"
          raised
          severity="secondary"
          text
          @click="cancelEdit"
        />
        <AppButton
          data-test="submit add category"
          :disabled="isDisabled"
          icon="fa-solid fa-check"
          label="Create"
          raised
          severity="primary"
          @click="addNewCategory"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.add-category-container,
.category-info {
  margin-bottom: 1rem;
}

.category-info {
  display: flex;
  gap: 1rem;
  align-items: end;
}

.category-background {
  transform: translateY(-5px);
}

::v-deep(.app-form-group)  {
  flex: 1;
}
</style>
