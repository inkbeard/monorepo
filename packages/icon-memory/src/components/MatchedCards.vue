<script setup lang="ts">
  import { ref } from 'vue';
  import { AppDialog } from '@inkbeard/ui-vue';
  import IconCard from './IconCard.vue';
  import IconDetails from './IconDetails.vue';
  import type { IconCardProps, IconDetails as IconDetailsProps } from '../types';

  const props = defineProps<{
    cards: IconCardProps[];
  }>();

  const dialogIsVisible = ref(false);
  const activeIconDetails = ref<IconDetailsProps | null>(null);
  const loadCard = (iconId: number) => {
    activeIconDetails.value = props.cards.find((card) => card.iconId === iconId) as IconDetailsProps;
    dialogIsVisible.value = true;
  };

</script>

<template>
  <div class="match-cards-container">
    <p><strong>Matched cards</strong></p>
    <div
      v-for="card in cards"
      :key="card.iconId"
      class="matched-card-container"
    >
      <div class="empty-card" />
      <IconCard
        class="matched-card"
        v-bind="{ ...card }"
        is-active
        is-matched
        @card-clicked="loadCard(card.iconId)"
      />
    </div>
  </div>
  <AppDialog
    v-model:visible="dialogIsVisible"
    class="match-cards-dialog"
    modal
  >
    <IconDetails
      v-if="activeIconDetails"
      :icon-details="activeIconDetails"
    />
  </AppDialog>
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
