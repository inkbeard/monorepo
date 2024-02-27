import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFeatureFlagStore = defineStore('featureFlags', () => (
  {
    flags: ref({
      budgetIt: { enabled: true },
      examples: { enabled: false },
    }),
  }
));
