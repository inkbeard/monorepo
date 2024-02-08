import { setActivePinia, createPinia } from 'pinia';
import { useCategoriesStore } from '@/stores/categories';

describe('categories store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('addCategory', () => {
    const store = useCategoriesStore();

    store.categoryList = [];
    store.addCategory('Test');

    expect(store.categoryList)
      .toHaveLength(1);
    expect(store.categoryList.at(0))
      .toMatchObject({ name: 'Test', id: 1 });
  });

  it('deleteCategory', () => {
    const store = useCategoriesStore();

    store.categoryList = [
      {
        name: 'Test 1',
        id: 1,
      },
      {
        name: 'Test 2',
        id: 2,
      },
    ];
    store.deleteCategory(1);

    expect(store.categoryList)
      .toHaveLength(1);
    expect(store.categoryList.at(0))
      .toMatchObject({ name: 'Test 2', id: 2 });
  });
});
