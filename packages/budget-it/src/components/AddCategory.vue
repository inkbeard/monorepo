<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useCategoriesStore } from '@/stores/categories';

  const categoryName = ref('');
  const isActive = ref(false);
  const isDisabled = computed(() => (
    !categoryName.value
    || useCategoriesStore().categoryList.some(({ name }) => (
      name.toLowerCase() === categoryName.value.trim().toLowerCase()))
  ));

  function cancelEdit() {
    categoryName.value = '';
    isActive.value = false;
  }
  function addCategory() {
    if (isDisabled.value) return;

    useCategoriesStore().addCategory(categoryName.value);
    cancelEdit();
  }
</script>

<template>
  <div class="add-category-container">
    <div
      v-if="!isActive"
      class="button-group"
    >
      <button
        type="button"
        @click="isActive = true"
      >
        Add category
      </button>
    </div>
    <div v-else>
      <label for="add-category">
        Category Name:
      </label>
      <input
        id="add-category"
        v-model="categoryName"
        type="text"
        @keydown.enter="addCategory"
      />
      <div class="button-group">
        <button type="button" @click="cancelEdit">
          Cancel
        </button>
        <button
          :disabled="isDisabled"
          type="button"
          @click="addCategory"
        >
          Add
        </button>
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
