<script setup lang="ts">
  import { ref, computed, inject } from 'vue';
  import { AppInputText, AppButton } from '@inkbeard/ui-vue';
  import type { CategoryInfo } from '../types';

  const categoryList = inject<CategoryInfo[]>('categoryList', []);
  const addCategory = inject<Function>('addCategory', () => () => {});
  const categoryName = ref('');
  const isActive = ref(false);
  const isDisabled = computed(() => (
    !categoryName.value
    || categoryList.some(({ name }) => (
      name.toLowerCase() === categoryName.value.trim().toLowerCase()))
  ));

  function cancelEdit() {
    categoryName.value = '';
    isActive.value = false;
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
      v-if="!isActive"
      class="btn-group align-end"
    >
      <AppButton
        icon="fa-solid fa-plus"
        label="Add category"
        raised
        @click="isActive = true"
      />
    </div>
    <div v-else>
      <AppInputText
        v-model="categoryName"
        class="add-category-input"
        input-id="add-category"
        label="Category name"
        @keydown.enter="addNewCategory"
      />
      <div class="btn-group align-end">
        <AppButton
          icon="fa-solid fa-xmark"
          label="Cancel"
          severity="secondary"
          text
          @click="cancelEdit"
        />
        <AppButton
          :disabled="isDisabled"
          icon="fa-solid fa-check"
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

::v-deep(.add-category-input) {
  margin-bottom: 1rem;
}
</style>
