import {
  describe, it, expect, vi,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { categoryList } from '@/assets/mockData';
import AddCategory from '../AddCategory.vue';

describe('AddCategory', () => {
  let wrapper: any;
  const createWrapper = ({
    props,
  }: {
    props?: object,
  } = {
  }) => {
    wrapper = shallowMount(
      AddCategory,
      {
        global: {
          provide: {
            addCategory: vi.fn(),
            categoryList,
          },
        },
        props: { ...props },
      },
    );
  };

  it('should show a cta that switches to a form when clicked', async () => {
    createWrapper();

    const cta = wrapper.findComponent('[data-test="add new category"]');

    expect(cta.exists())
      .toBe(true);

    await cta.trigger('click');

    expect(wrapper.findComponent('[data-test="edit category name"]').exists())
      .toBe(true);
  });

  describe('cancel cta', () => {
    it('should hide the form when clicked and clear any data', async () => {
      createWrapper({
        props: {
          isAdding: true,
        },
      });

      await wrapper.findComponent('[data-test="cancel editing new category"]').trigger('click');

      expect(wrapper.findComponent('[data-test="cancel editing new category"]').exists())
        .toBe(false);
      expect(wrapper.findComponent('[data-test="add new category"]').exists())
        .toBe(true);
    });
  });

  describe('submit cta', () => {
    let submitCta: any;

    beforeEach(() => {
      createWrapper({
        props: {
          isAdding: true,
        },
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

      it('should call hide the form and clear the data after the category is added', () => {
        expect(wrapper.findComponent('[data-test="add new category"]').exists())
          .toBe(true);
        expect(wrapper.findComponent('[data-test="edit category name"]').exists())
          .toBe(false);
        expect(wrapper.vm.categoryName)
          .toBe('');
      });
    });
  });
});
