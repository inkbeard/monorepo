<script setup lang="ts">
  import IconCard from './IconCard.vue';
  import type { Card } from './IconMemory.vue';

  defineProps<{
    cards: Card[];
  }>();
</script>

<template>
  <div class="match-cards-container">
    <p><strong>Matched cards</strong></p>
    <div
      v-for="card in cards"
      :key="card.cardId"
      class="matched-card-container"
    >
      <div class="empty-card" />
      <IconCard
        class="matched-card"
        v-bind="{ ...card }"
      />
    </div>
  </div>
</template>

<style scoped>
.match-cards-container {
  min-width: 11rem;
  padding: .5rem;
  text-align: center;
}

.matched-card {
  transition: all 0.5s;
  cursor: pointer !important;
}

.matched-card-container {
  position: relative;

  &:not(:first-of-type) {
    margin-top: -7rem;
  }

  &:hover > .matched-card{
    transform: translateX(4rem);
  }
}

.empty-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
