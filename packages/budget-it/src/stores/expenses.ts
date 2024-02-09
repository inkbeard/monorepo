import { defineStore } from 'pinia';

export interface ExpenseInfo {
  amount: number // Amount of the expense
  categoryId: number // Unique identifier for the category the expense belongs to
  id: number // Unique identifier for the expense
  name: string // Name of the expense
  order: number // Order of the expense in the list
  source: null | string // Source of the expense (e.g. "Credit Card", "Debit Card", "Cash")
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
        id: 1,
        name: 'Netflix',
        order: 0,
        source: null,
      },
      2: {
        amount: 2,
        categoryId: 2,
        id: 2,
        name: 'HBFC',
        order: 0,
        source: null,
      },
      3: {
        amount: 1000,
        categoryId: 3,
        id: 3,
        name: 'Mortgage',
        order: 0,
        source: null,
      },
      4: {
        amount: 30,
        categoryId: 4,
        id: 4,
        name: 'Gas',
        order: 0,
        source: null,
      },
      5: {
        amount: 50,
        categoryId: 5,
        id: 5,
        name: 'Target',
        order: 0,
        source: null,
      },
      7: {
        amount: 50,
        categoryId: 7,
        id: 7,
        name: 'BCBS',
        order: 0,
        source: null,
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
