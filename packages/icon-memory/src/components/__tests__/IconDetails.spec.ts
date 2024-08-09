import {
  describe,
  expect,
  it,
} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { icons } from '@/assets/mockData';
import IconDetails from '../IconDetails.vue';

describe('IconDetails', () => {
  const [,,iconDetails] = icons;
  const {
    icon,
    name,
    // pro,
  } = iconDetails;
  const family = iconDetails.family.replace('fa-', '');
  const style = iconDetails.style.replace('fa-', '');
  let wrapper: any;
  const createWrapper = () => {
    wrapper = shallowMount(
      IconDetails,
      {
        props: { iconDetails },
        global: {
          renderStubDefaultSlot: true,
        },
      },
    );
  };

  beforeEach(() => {
    createWrapper();
  });

  describe('header', () => {
    it('should render the icon name', () => {
      expect(wrapper.find('[data-test="icon name"]').text())
        .toBe(name);
    });

    it('should render the fontawesome link', () => {
      expect(wrapper.find('[data-test="fontawesome icon link"]').attributes('href'))
        .toBe(`https://fontawesome.com/icons/t-rex?f=${family}&s=${style}`);
    });
  });

  it('should render an example of the icon', () => {
    expect(wrapper.findComponent('[data-test="icon example"]').attributes('icon'))
      .toBe(icon);
  });

  describe('navigation', () => {
    it('should render the active tab', () => {
      expect(wrapper.find('[data-test="click inkbeard-ui"]').classes())
        .toContain('active');
    });

    it('should change the active tab when clicked', async () => {
      await wrapper.find('[data-test="click html"]').trigger('click');

      expect(wrapper.find('[data-test="click inkbeard-ui"]').classes())
        .not.toContain('active');
      expect(wrapper.find('[data-test="click html"]').classes())
        .toContain('active');
    });

    describe('vue', () => {
      beforeEach(async () => {
        await wrapper.find('[data-test="click vue"]').trigger('click');
      });

      it('should render subtabs for vue', () => {
        expect(wrapper.find('[data-test="click array syntax"]').exists())
          .toBe(true);
        expect(wrapper.find('[data-test="click string syntax"]').exists())
          .toBe(true);
        expect(wrapper.find('[data-test="click default style"]').exists())
          .toBe(true);
      });

      it('should select the "array syntax" subtab if user has not selected previous subtab', () => {
        expect(wrapper.find('[data-test="click array syntax"]').classes())
          .toContain('active');
      });

      it('should keep the active subtab when navigating languages', async () => {
        const subTabNavigation = wrapper.find('[data-test="click string syntax"]');

        await subTabNavigation.trigger('click');

        await wrapper.find('[data-test="click html"]').trigger('click');
        await wrapper.find('[data-test="click vue"]').trigger('click');

        expect(subTabNavigation.classes())
          .toContain('active');
      });
    });

    describe('react', () => {
      beforeEach(async () => {
        await wrapper.find('[data-test="click react"]').trigger('click');
      });

      it('should render subtabs for react', () => {
        expect(wrapper.find('[data-test="click global import"]').exists())
          .toBe(true);
        expect(wrapper.find('[data-test="click individual import"]').exists())
          .toBe(true);
      });

      it('should select the "global import" subtab if user has not selected previous subtab', () => {
        expect(wrapper.find('[data-test="click global import"]').classes())
          .toContain('active');
      });

      it('should keep the active subtab when navigating languages', async () => {
        const subTabNavigation = wrapper.find('[data-test="click individual import"]');

        await subTabNavigation.trigger('click');

        await wrapper.find('[data-test="click html"]').trigger('click');
        await wrapper.find('[data-test="click react"]').trigger('click');

        expect(subTabNavigation.classes())
          .toContain('active');
      });
    });
  });

  describe('code example', () => {
    it('should render the code example properly for "inkbeard-ui', () => {
      expect(wrapper.find('[data-test="code example"]').text())
        .toBe(`<AppIcon icon="fa-${family} fa-${style} fa-${name}" />`);
    });

    it('should render the code example properly for "html', async () => {
      wrapper.vm.activeTab = 'html';

      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-test="code example"]').text())
        .toBe(`<i class="fa-${family} fa-${style} fa-${name}"></i>`);
    });

    describe('vue', () => {
      beforeEach(async () => {
        wrapper.vm.activeTab = 'vue';

        await wrapper.vm.$nextTick();
      });

      it('should render the code example properly for "array syntax"', async () => {
        wrapper.vm.activeSubTab = 'array syntax';

        await wrapper.vm.$nextTick();

        expect(wrapper.find('[data-test="code example"]').text())
          .toBe(`<font-awesome-icon :icon="['fads', '${name}']" />`);
      });

      it('should render the code example properly for "string syntax"', async () => {
        wrapper.vm.activeSubTab = 'string syntax';

        await wrapper.vm.$nextTick();

        expect(wrapper.find('[data-test="code example"]').text())
          .toBe(`<font-awesome-icon icon="fa-${family} fa-${style} fa-${name}" />`);
      });

      it('should render the code example properly for "default style"', async () => {
        wrapper.vm.activeSubTab = 'default style';

        await wrapper.vm.$nextTick();

        expect(wrapper.find('[data-test="code example"]').text())
          .toBe(`<font-awesome-icon icon="${name}" />`);
      });
    });

    describe('react', () => {
      beforeEach(async () => {
        wrapper.vm.activeTab = 'react';

        await wrapper.vm.$nextTick();
      });

      it('should render the code example properly for "global import"', async () => {
        wrapper.vm.activeSubTab = 'global import';

        await wrapper.vm.$nextTick();

        expect(wrapper.find('[data-test="code example"]').text())
          .toBe(`<FontAwesomeIcon icon="fa-${family} fa-${style} fa-${name}" />`);
      });

      it('should render the code example properly for "individual import"', async () => {
        wrapper.vm.activeSubTab = 'individual import';

        await wrapper.vm.$nextTick();

        expect(wrapper.find('[data-test="code example"]').text())
          .toBe('<FontAwesomeIcon icon={faTRex} />');
      });
    });
  });

  describe('footer', () => {
    it('should render icon usage for inkbeard-ui', () => {
      const link = wrapper.find('[data-test="click icon usage"]');

      expect(link.text())
        .toBe('Using icons with inkbeard-ui');
      expect(link.attributes('href'))
        .toBe('https://inkbeard-ui-library.vercel.app/?path=/docs/ui-vue-appicon--docs');
    });

    it('should render icon usage for vue', async () => {
      await wrapper.find('[data-test="click vue"]').trigger('click');

      const link = wrapper.find('[data-test="click icon usage"]');

      expect(link.text())
        .toBe('Using icons with Vue');
      expect(link.attributes('href'))
        .toBe('https://docs.fontawesome.com/web/use-with/vue/add-icons');
    });

    it('should render icon usage for react', async () => {
      await wrapper.find('[data-test="click react"]').trigger('click');

      const link = wrapper.find('[data-test="click icon usage"]');

      expect(link.text())
        .toBe('Using icons with React');
      expect(link.attributes('href'))
        .toBe('https://docs.fontawesome.com/web/use-with/react/add-icons');
    });
  });
});
