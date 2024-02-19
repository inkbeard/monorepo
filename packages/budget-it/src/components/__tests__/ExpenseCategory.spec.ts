import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useCategoriesStore } from '@/stores/categories';
import { AppButton } from '@inkbeard/ui-vue';
import ExpenseCategory from '../ExpenseCategory.vue';

describe.skip('ExpenseCategory', () => {
  let wrapper: any;
  let categoryStore: any;
  const categoryId = 1;
  const categoryName = 'test';
  const category = {
    name: categoryName,
    id: categoryId,
  };
  const createWrapper = () => {
    wrapper = shallowMount(ExpenseCategory, {
      props: { category },
      global: {
        plugins: [createTestingPinia()],
        stubs: { AppButton },
      },
    });

    categoryStore = useCategoriesStore();
    categoryStore.categoryList = [category];
  };

  it('should render the category name', () => {
    createWrapper();

    expect(wrapper.find('[data-test="category name"]').text())
      .toBe(categoryName);
  });

  it('should not render the category expenses by default', () => {
    createWrapper();

    expect(wrapper.find('[data-test="category expense"]').exists())
      .toBe(false);
  });

  it('should render the category expenses when the toggle cta is clicked', async () => {
    createWrapper();

    console.log(wrapper.html());

    await wrapper.find('[data-test="toggle expenses"]').trigger('click');

    expect(wrapper.find('[data-test="category expense"]').exists())
      .toBe(true);
  });

  it('should delete the category from the store on delete cta click', () => {
    createWrapper();

    wrapper.find('[data-test="delete category"]').trigger('click');

    expect(categoryStore.deleteCategory).toHaveBeenCalledTimes(1);
    expect(categoryStore.deleteCategory).toHaveBeenLastCalledWith(categoryId);
  });
});
