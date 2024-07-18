import {
  describe, it, expect,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { categoryList } from '@/assets/mockData';
import AddCategory from '../AddCategory.vue';

describe.skip('AddCategory', () => {
  let wrapper: any;
  const createWrapper = ({
    props,
  }: {
    props?: object,
  } = {}) => {
    wrapper = shallowMount(
      AddCategory,
      {
        props: { ...props },
      },
    );
  };

  describe('submit cta', () => {
    let submitCta: any;

    beforeEach(() => {
      createWrapper({
        props: { categoryList },
      });

      submitCta = wrapper.findComponent('[data-test="submit category"]');
    });

    it('should be disabled if the category name is empty', () => {
      expect(submitCta.props('disabled'))
        .toBe(true);
    });

    it('should be disabled if the category name is already taken', async () => {
      wrapper.vm.categoryName = categoryList[0].name;

      await wrapper.vm.$nextTick();

      expect(submitCta.props('disabled'))
        .toBe(true);
    });

    describe('when enabled', () => {
      beforeEach(async () => {
        wrapper.vm.categoryName = 'test category name';

        await wrapper.vm.$nextTick();
        await submitCta.trigger('click');
      });

      it('should call addCategory when form is submitted', () => {
        expect(wrapper.vm.addCategory)
          .toHaveBeenCalledWith({
            backgroundColor: '#b30000',
            name: 'test category name',
          });
      });
    });
  });
});
