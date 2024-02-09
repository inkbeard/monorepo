import { defineStore } from 'pinia';

export const useSourcesStore = defineStore('sources', {
  state: () => ({
    sourceList: {
      1: 'Credit Card',
      2: 'Debit Card',
      3: 'Checking Account',
      4: 'Savings Account',
      5: 'Cash',
    } as Record<number, string>,
  }),
  actions: {
    /**
     * Add a new source to the current list of sources with the ID + 1 of the highest ID so far.
     */
    addSource(sourceName: string) {
      const sourceIds = Object.keys(this.sourceList).map(Number);

      this.sourceList[Math.max(...sourceIds) + 1] = sourceName;
    },
    /**
     * Delete a source from the current list of sources.
     */
    deleteSource(sourceId: number) {
      if (!this.sourceList[sourceId]) {
        throw new Error(`No source with id ${sourceId}`);
      } else {
        delete this.sourceList[sourceId];
      }
    },
  },
});
