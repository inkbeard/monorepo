<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    category: string;
  }>();

  const emit = defineEmits<{
    (e: 'deleteCategory', value: string): void
  }>();
  const isOpen = ref(false);

</script>

<template>
  <div class="category-container">
    <div
      class="category-section"
      :class="{ 'is-open': isOpen }"
    >
      <div class="category-title">
        <span>{{ category }}</span>
        <button
          class="toggle"
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
    <button
      class="delete"
      type="button"
      @click="emit('deleteCategory', category)"
    >
      Delete
    </button>
  </div>
</template>

<style scoped>
.category-container {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.category-section {
  flex: 1;
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
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 14px;
  cursor: pointer;

  &.delete {
    margin-left: auto;
  }

  &.toggle {
    width: 36px;
    font-size: 30px;
  }
}
</style>
