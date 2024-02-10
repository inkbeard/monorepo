import { setActivePinia, createPinia } from 'pinia';
import { useExpensesStore } from '@/stores/expenses';
import { beforeEach } from 'vitest';

describe('expenses Store', () => {
  const testExpense = {
    amount: 1,
    categoryId: 1,
    name: 'Test',
    order: 0,
    sourceId: 1,
  };

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('addExpense', () => {
    const store = useExpensesStore();

    store.expenseList = {};
    store.addExpense(testExpense);

    expect(store.expenseList)
      .toEqual({ 1: testExpense });
  });

  describe('deleteExpense', () => {
    let store: any;

    beforeEach(() => {
      store = useExpensesStore();
      store.expenseList = { 3: testExpense };
    });

    it('should delete an expense', () => {
      store.deleteExpense(3);

      expect(store.expenseList)
        .toEqual({});
    });

    // I need to look into this test more later.
    it.skip('should throw error when trying to delete an expense that does not exist', () => {
      expect(store.deleteExpense(5))
        .rejects.toThrow(new Error('No expense with id 5'));
    });
  });
});
