import { defineStore } from 'pinia';

export interface ExpenseInfo {
  amount: number // Amount of the expense
  categoryId: number // Unique identifier for the category the expense belongs to
  description?: string // Description of the expense
  id?: number // Unique identifier for the expense
  name: string // Name of the expense
  order: number // Order of the expense in the list
  sourceId: number // Source Id of the expense that is mapped from the sources store
}

interface ExpenseList {
  [key: number]: ExpenseInfo;
}

export const useExpensesStore = defineStore('expenses', {
  state: () => ({
    expenseList: {
      1: {
        amount: 2,
        categoryId: 1,
        name: 'Netflix',
        order: 0,
        sourceId: 1,
      },
      2: {
        amount: 2,
        categoryId: 2,
        name: 'HBFC',
        order: 0,
        sourceId: 5,
      },
      3: {
        amount: 1000,
        categoryId: 3,
        description: 'Started with Guaranteed Rate and then refinanced with Better.com.',
        name: 'Mortgage',
        order: 0,
        sourceId: 3,
      },
      4: {
        amount: 30,
        categoryId: 4,
        name: 'Gas',
        order: 0,
        sourceId: 1,
      },
      5: {
        amount: 50,
        categoryId: 5,
        name: 'Target',
        order: 0,
        sourceId: 1,
      },
      7: {
        amount: 2260,
        categoryId: 7,
        description: 'Monthly premium for family of 4.',
        name: 'BCBS',
        order: 0,
        sourceId: 3,
      },
      8: {
        amount: 2,
        categoryId: 1,
        name: 'Hulu',
        order: 1,
        sourceId: 1,
      },
      9: {
        amount: 300,
        categoryId: 2,
        name: 'Jewel',
        order: 1,
        sourceId: 2,
      },
      10: {
        amount: 99,
        categoryId: 4,
        name: 'Metra',
        order: 1,
        sourceId: 1,
      },
    } as ExpenseList,
  }),
  actions: {
    /**
     * Add a new expense to the current list of expenses.
     */
    addExpense(expenseInfo: ExpenseInfo) {
      this.expenseList[Object.keys(this.expenseList).length + 1] = expenseInfo;
    },
    /**
     * Delete a expense from the current list of expenses.
     */
    deleteExpense(expenseId: number) {
      if (!this.expenseList[expenseId]) {
        throw new Error(`No expense with id ${expenseId}`);
      } else {
        delete this.expenseList[expenseId];
      }
    },
  },
});
