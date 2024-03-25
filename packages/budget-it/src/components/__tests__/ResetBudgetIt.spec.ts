import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import InkbeardUiVue from '@inkbeard/ui-vue';
import ResetBudgetIt from '../ResetBudgetIt.vue';
import InkbeardBudgetIt from '../../../index';
import type { ExpenseList } from '../../types';

describe('ResetBudgetIt', () => {
  let wrapper: any;
  const categoryId = 1;
  const categoryName = 'test';
  const category = {
    backgroundColor: '#000',
    name: categoryName,
    id: categoryId,
  };
  const createWrapper = ({
    props,
  }: {
    props?: {},
  }) => {
    wrapper = shallowMount(
      ResetBudgetIt,
      {
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
            } as ExpenseList,
            sourceList: {
              1: 'Credit Card',
            },
          },
        },
        props: { ...props },
      },
    );
  };

  it('renders properly', () => {
    createWrapper({
      props: {
        label: 'Destroy!',
        btnDataAttr: 'test data attr',
      },
    });

    expect(wrapper.find('[data-test="test data attr"]').exists())
      .toBe(true);
  });
});
