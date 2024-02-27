import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFeatureFlagStore = defineStore('featureFlags', () => (
  {
    flags: ref({
      budget_it: { enabled: false },
      examples: { enabled: false },
    }),
  }
));
