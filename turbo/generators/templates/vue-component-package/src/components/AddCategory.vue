<script setup lang="ts">
  import { ref, computed } from 'vue';
  import {
    AppButton,
    AppInputText,
  } from '@inkbeard/ui-vue';
  import type { CategoryInfo } from '../types';

  const emits = defineEmits<{
    /**
     * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec.
     */
    addCategory: [CategoryInfo];
  }>();
  const categoryList = defineModel<CategoryInfo[]>('categoryList', []);
  const categoryName = ref('');
  /**
   * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec.
   */
  const isDisabled = computed(() => (
    !categoryName.value
    || categoryList.some(({ name }) => (
      name.toLowerCase() === categoryName.value.trim().toLowerCase()))
  ));
  /**
   * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec.
   */
  function addNewCategory() {
    if (isDisabled.value) return;

    emits('addCategory', {
      backgroundColor: `#${categoryColor.value}`,
      name: categoryName.value,
    });
  }
</script>

<template>
  <div class="template-container">
    <AppInputText
      v-model="categoryName"
      input-id="add-category"
      label="Category Name"
      @keydown.enter="addNewCategory"
    />
    <AppButton
      :disabled="isDisabled"
      icon="fa-solid fa-check"
      label="Create"
      raised
      severity="primary"
      @click="addNewCategory"
    />
  </div>
</template>

<style scoped>
  .template-container {
    margin-bottom: 1rem;
  }
</style>
