<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    category: string;
  }>();

  const isOpen = ref(false);
</script>

<template>
  <div
    class="category-section"
    :class="{ 'is-open': isOpen }"
  >
    <div class="category-title">
      <span>{{ category }}</span>
      <button
        type="button"
        @click="isOpen = !isOpen"
      >
        {{ isOpen ? '-' : '+' }}
      </button>
    </div>
    <div
      v-if="isOpen"
      class="category-content"
    >
      <p>Expenses go here</p>
    </div>
  </div>
</template>

<style scoped>
.category-section {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.category-title,
.category-content {
  padding: 1rem;
}

.category-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

button {
  width: 36px;
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 30px;
  cursor: pointer;
}
</style>
