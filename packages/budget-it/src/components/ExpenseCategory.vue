<script setup lang="ts">
  import { ref } from 'vue';
  import ExpenseItem from './ExpenseItem.vue';

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
          <i
            class="fa-duotone fa-xl"
            :class="`fa-arrows-${isOpen ? 'to' : 'from'}-dotted-line`"
          />
        </button>
      </div>
      <div
        v-if="isOpen"
        class="category-content"
      >
        <ExpenseItem :category="category" />
      </div>
    </div>
    <button
      class="delete"
      type="button"
      @click="emit('deleteCategory', category)"
    >
      <i class="fa-duotone fa-trash-can fa-xl" />
    </button>
  </div>
</template>

<style scoped>
.category-container {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
}

.category-section {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: var(--vt-c-black-soft);
  background-color: var(--vt-c-white);
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
  cursor: pointer;

  &.toggle {
    color: var(--vt-c-black-soft);
  }
}
</style>
