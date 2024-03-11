import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import InkbeardUiVue from '@inkbeard/ui-vue';
import InkbeardBudgetIt from '../../../index';
import type { ExpenseList } from '../../types';
import ExpenseCategory from '../ExpenseCategory.vue';

describe('ExpenseCategory', () => {
  let wrapper: any;
  const categoryId = 1;
  const categoryName = 'test';
  const category = {
    name: categoryName,
    id: categoryId,
  };
  const createWrapper = ({
    props,
    provide,
  }: {
    props?: { },
    provide?: { },
  }) => {
    wrapper = shallowMount(ExpenseCategory, {
      global: {
        plugins: [InkbeardUiVue, InkbeardBudgetIt],
        provide: {
          categoryList: [category],
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
              sourceId: 4,
            },
            10: {
              amount: 99,
              categoryId: 4,
              name: 'Metra',
              order: 1,
              sourceId: 1,
            },
          } as ExpenseList,
          sourceList: {
            1: 'Credit Card',
            3: 'Checking Account',
            4: 'Savings Account',
            5: 'Cash',
          },
          ...provide,
        },
      },
      props: {
        category,
        ...props,
      },
    });
  };

  it('should render the category name', () => {
    createWrapper({});

    expect(wrapper.find('[data-test="category name"]').text())
      .toBe(categoryName);
  });

  it('should not render the category expenses by default', () => {
    createWrapper({});

    expect(wrapper.find('[data-test="category expense"]').exists())
      .toBe(false);
  });

  it('should render the category expenses when the toggle cta is clicked', async () => {
    createWrapper({});

    await wrapper.find('[data-test="toggle expenses"]').trigger('click');

    expect(wrapper.find('[data-test="category expense"]').exists())
      .toBe(true);
  });

  it.skip('should confirm the deletion on delete cta click what there expenses', async () => {
    createWrapper({
      props: { isOpen: true },
    });

    await wrapper.find('[data-test="delete category"]').trigger('click');

    const deleteCategory = vi.spyOn(wrapper.vm, 'confirmDelete');

    expect(deleteCategory)
      .toHaveBeenCalled();
  });

  it('should delete on delete cta click when there are no expenses for this category', async () => {
    createWrapper({
      props: { isOpen: true },
      provide: { expenseList: {} },
    });

    await wrapper.find('[data-test="delete category"]').trigger('click');

    expect(wrapper.emitted().deleteCategory)
      .toBeTruthy();
    expect(wrapper.emitted().deleteCategory.length)
      .toBe(1);
    expect(wrapper.emitted().deleteCategory[0])
      .toEqual([categoryId]);
    expect(wrapper.vm.categoryList)
      .toEqual([]);
  });
});
