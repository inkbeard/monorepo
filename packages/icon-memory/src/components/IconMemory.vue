<script setup lang="ts">
  import { ref } from 'vue';
  import GameSetup from './GameSetup.vue';

  // const turnCount = ref(0);
  const pairCount = ref(2);
  const gameHasStarted = ref(false);
  const startGame = () => {
    gameHasStarted.value = true;
  };
</script>

<template>
  <div class="icon-memory-container">
    <aside>
      <GameSetup
        v-model:game-has-started="gameHasStarted"
        v-model:pair-count="pairCount"
        @start-game="startGame"
      />
    </aside>
    <section>
      <div
        v-for="card in (pairCount * 2)"
        :key="card"
        class="card"
      >
        {{ card }}
      </div>
    </section>
  </div>
</template>

<style scoped>
.icon-memory-container {
  display: flex;
  gap: 1rem;
}

section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--ink-border-color);
  border-radius: .5rem;
  box-shadow: .1rem .1rem .5rem rgba(0 0 0 / 50%);

  html.dark & {
    box-shadow: .1rem .1rem .5rem rgba(255 255 255 / 50%);
  }
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 10rem;
  border: 1px solid var(--ink-border-color);
}

:deep(.app-form-group)  {
  margin-bottom: 1rem;
}
</style>
