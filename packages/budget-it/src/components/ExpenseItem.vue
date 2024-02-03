<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    categoryId: number;
  }>();

  const expenseCost = ref(0);
  const expenseName = ref('test expense');

</script>

<template>
  <form>
    <label :for="`${categoryId}-${expenseName}`">
      {{ expenseName }}
    </label>
    <input
      :id="`${categoryId}-${expenseName}`"
      v-model="expenseCost"
      type="number"
    >
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 1rem;
}

input {
  flex: 1;
}
</style>
