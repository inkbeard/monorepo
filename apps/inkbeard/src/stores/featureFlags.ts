import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFeatureFlagStore = defineStore('featureFlags', () => (
  {
    flags: ref({
      memory_game: { enabled: false },
    }),
  }
));
