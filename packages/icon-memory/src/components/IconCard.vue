<script setup lang="ts">
  import { AppIcon } from '@inkbeard/ui-vue';
  import { ref, watch } from 'vue';

  const emits = defineEmits<{
    /**
     * Emit the card id that was clicked.
     */
    cardClicked: [];
  }>();
  const props = defineProps<{
    /**
     * The id of the icon.
     */
    iconId: number;
    /**
     * The icon to display on the card.
     */
    icon: string;
    /**
     * Whether the game is currently calculating a match.
     */
    isCalculating?: boolean;
    /**
     * Whether the card has been matched.
     */
    isMatched?: boolean;
  }>();
  /**
   * Whether the card is active.
   */
  const isActive = defineModel<boolean>('isActive');
  /**
   * Whether the icon should be shown.
   */
  const showIcon = ref(false);
  /**
   * Flip the card if it is not already matched, calculating, or already active and emit.
   */
  const activateCard = async () => {
    if (
      props.isMatched
      && isActive.value
    ) {
      emits('cardClicked');

      return;
    }

    if (
      props.isMatched
      || props.isCalculating
      || isActive.value
    ) return;

    emits('cardClicked');
    isActive.value = true;
  };

  /**
   * Watch for the isActive value to show the icon immediately or hide after the card has flipped.
   */
  watch(isActive, (newValue) => {
    if (newValue) {
      showIcon.value = true;

      return;
    }

    setTimeout(() => {
      showIcon.value = false;
    }, 500);
  });
</script>

<template>
  <div
    class="icon-card"
    :class="{
      active: isActive,
      calculating: props.isCalculating,
      matched: props.isMatched,
    }"
    @click="activateCard"
    @keydown.enter="activateCard"
  >
    <div class="content" :data-id="props.iconId">
      <div class="front" />
      <div class="back">
        <AppIcon
          v-if="showIcon || props.isMatched"
          :icon="props.icon"
          size="5x"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-card {
  position: relative;
  width: 10rem;
  height: 10rem;
  cursor: pointer;

  &.active {
    cursor: inherit;
  }

  &.calculating {
    cursor: not-allowed;
  }

  &.matched:not(.active) {
    cursor: inherit;
    opacity: .85;
  }
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform .5s;
  border-radius: .5rem;
  box-shadow: 0 0 1rem rgba(0 0 0 / 30%);

  .active &,
  .matched & {
    transform: rotateY(180deg);
  }
}

.back,
.front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: .5rem;
}

.back {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY( 180deg );
  background-color: var(--ink-white);

  .matched:not(.active) & {
    &::after {
      position: absolute;
      bottom: .25rem;
      right: .25rem;
      font: var(--fa-font-solid);
      content: '\f00c';
      font-size: 1.5rem;
      color: var(--ink-success-color);
    }
  }
}

.front {
  background-color: var(--ink-info-color);
  color: black;

  &::after {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font: var(--fa-font-brands);
    content: '\f35c';
    font-size: 3rem;
    color: var(--ink-white);
    opacity: .5;
  }
}
</style>
