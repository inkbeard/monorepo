import { defineStore } from 'pinia';

export interface CategoryInfo {
  color?: string
  id: number
  name: string
}

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categoryList: [
      {
        name: 'Entertainment',
        id: 1,
      },
      {
        name: 'Food',
        id: 2,
      },
      {
        name: 'Housing',
        id: 3,
      },
      {
        name: 'Transportation',
        id: 4,
      },
      {
        name: 'Utilities',
        id: 5,
      },
      {
        name: 'Clothing',
        id: 6,
      },
      {
        name: 'Medical',
        id: 7,
      },
    ] as CategoryInfo[],
  }),
  actions: {
    /**
     * Add a new category to the current list of categories.
     */
    addCategory(name: string) {
      this.categoryList.unshift({
        name: name.trim(),
        id: this.categoryList.length + 1,
      });
    },
    /**
     * Delete a category from the current list of categories.
     */
    deleteCategory(categoryId: number) {
      const index = this.categoryList.findIndex(({ id }) => id === categoryId);

      this.categoryList.splice(index, 1);
    },
  },
});
