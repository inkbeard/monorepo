import { setActivePinia, createPinia } from 'pinia';
import { useSourcesStore } from '@/stores/sources';
import { beforeEach } from 'vitest';

describe('sources Store', () => {
  const sourceList = {
    1: 'Debit Card',
    4: 'Savings Account',
    3: 'Checking Account',
  };
  let store: ReturnType<typeof useSourcesStore>;

  beforeEach(() => {
    setActivePinia(createPinia());

    store = useSourcesStore();
    store.sourceList = { ...sourceList };
  });

  describe('addSource', () => {
    it('should assign the next highest number as the ID ', () => {
      store.addSource('Test Source');

      expect(store.sourceList)
        .toEqual({
          ...sourceList,
          5: 'Test Source',
        });
    });
  });

  describe('deleteSource', () => {
    it('should delete an source', () => {
      store.deleteSource(4);

      expect(store.sourceList)
        .toEqual({
          1: 'Debit Card',
          3: 'Checking Account',
        });
    });

    // I need to look into this test more later.
    it.skip('should throw error when trying to delete an source that does not exist', () => {
      expect(store.deleteSource(5))
        .rejects.toThrow(new Error('No source with id 5'));
    });
  });
});
