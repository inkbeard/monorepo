import { defineStore } from 'pinia';
import { useExpensesStore } from './expenses';

export const useSourcesStore = defineStore('sources', {
  state: () => ({
    sourceList: {
      1: 'Credit Card',
      3: 'Checking Account',
      4: 'Savings Account',
      5: 'Cash',
    } as Record<number, string>,
  }),
  getters: {
    /**
     * Get an alphabatize list of sources and their IDs.
     */
    alphabaticSourceList(): { source: string, id: number }[] {
      const sourceList = Object.entries(this.sourceList).map(([id, source]) => (
        { source, id: +id }
      ));

      return sourceList.sort((a, b) => a.source.toLowerCase().localeCompare(b.source.toLowerCase()));
    },
    /**
     * Get the expenses associated with the sources.
     */
    sourcesWithExpenses() {
      return Object.entries(useExpensesStore().expenseList)
        .reduce((acc: any, [id, { sourceId }]) => {
          if (acc[sourceId]) {
            acc[sourceId].push(id);
          } else {
            acc[sourceId] = [id];
          }

          return acc;
        }, {});
    },
  },
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
