<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { AppButton, AppIcon } from '@inkbeard/ui-vue';
  import type { IconDetails } from '../types';

  const props = defineProps<{
    iconDetails: IconDetails;
  }>();

  /**
   * Calculate the URL to the fontawesome icon page.
   */
  const iconHref = computed(() => `https://fontawesome.com/icons/${props.iconDetails.name}?f=${props.iconDetails.family.replace('fa-', '')}&s=${props.iconDetails.style.replace('fa-', '')}`);
  const languages = [
    'inkbeard-ui',
    'html',
    'vue',
    'react',
  ];
  const vueSubNavigation = [
    'array syntax',
    'string syntax',
    'default style',
  ];
  const reactSubNavigation = [
    'global import',
    'individual import',
  ];
  const activeTab = ref(languages[0]);
  /**
   * Calculate the sub navigation based on the active tab for vue and react.
   */
  const subNavigation = computed(() => (
    activeTab.value === 'vue'
      ? vueSubNavigation
      : reactSubNavigation
  ));
  const activeSubTab = ref('');
  const activeVueSubTab = ref('');
  const activeReactSubTab = ref('');
  /**
   * Calculate the individual import syntax for the React icon component by converting the icon name to PascalCase and prepending 'fa'.
   */
  const reactIndividualImport = computed(() => {
    const splitName = props.iconDetails.name.split('-');
    const pascaleCaseName = splitName
      .map((name) => `${name.charAt(0).toUpperCase()}${name.slice(1)}`)
      .join('');

    return `fa${pascaleCaseName}`;
  });
  /**
   * Calculate the array syntax for the Vue icon component by extracting the first character of the family and style.
   */
  const vueArraySyntax = computed(() => {
    const splitFamily = props.iconDetails.family.split('fa-');
    const splitStyle = props.iconDetails.style.split('fa-');

    return `fa${splitFamily[1].charAt(0)}${splitStyle[1].charAt(0)}`;
  });
  const codeExample = computed(() => {
    if (activeTab.value === 'html') {
      return `<i class="${props.iconDetails.icon}"></i>`;
    }

    if (activeTab.value === 'vue') {
      if (activeSubTab.value === 'array syntax') {
        return `<font-awesome-icon :icon="['${vueArraySyntax.value}', '${props.iconDetails.name}']" />`;
      } if (activeSubTab.value === 'string syntax') {
        return `<font-awesome-icon icon="${props.iconDetails.icon}" />`;
      } if (activeSubTab.value === 'default style') {
        return `<font-awesome-icon icon="${props.iconDetails.name}" />`;
      }
    }

    if (activeTab.value === 'react') {
      if (activeSubTab.value === 'global import') {
        return `<FontAwesomeIcon icon="${props.iconDetails.icon}" />`;
      } if (activeSubTab.value === 'individual import') {
        return `<FontAwesomeIcon icon={${reactIndividualImport.value}} />`;
      }
    }

    return `<AppIcon icon="${props.iconDetails.icon}" />`;
  });
  /**
   * Get the href and copy for the icon usage details based on the active tab.
   */
  const usageDetails = computed(() => {
    let href = '';
    let copy = '';

    if (activeTab.value === 'inkbeard-ui') {
      href = 'https://inkbeard-ui-library.vercel.app/?path=/docs/ui-vue-appicon--docs';
      copy = 'Using icons with inkbeard-ui';
    } else if (['react', 'vue'].includes(activeTab.value)) {
      href = `https://docs.fontawesome.com/web/use-with/${activeTab.value}/add-icons`;
      copy = `Using icons with ${activeTab.value.charAt(0).toUpperCase()}${activeTab.value.slice(1)}`;
    }

    return { href, copy };
  });
  /**
   * Handle the navigation click event by setting the active tab and sub tab for vue and react languages.
   */
  const onNavigationClick = (language: string) => {
    if (language === 'vue') {
      if (!activeVueSubTab.value) {
        [activeSubTab.value] = vueSubNavigation;
      } else {
        activeSubTab.value = activeVueSubTab.value;
      }
    } else if (language === 'react') {
      if (!activeReactSubTab.value) {
        [activeSubTab.value] = reactSubNavigation;
      } else {
        activeSubTab.value = activeReactSubTab.value;
      }
    }

    activeTab.value = language;
  };
  /**
   * Handle the sub navigation click event by setting the active sub tab and sub tab for vue and react languages if applicable.
   */
  const onSubNavigationClick = (syntax: string) => {
    if (activeTab.value === 'vue') {
      activeVueSubTab.value = syntax;
    } else if (activeTab.value === 'react') {
      activeReactSubTab.value = syntax;
    }

    activeSubTab.value = syntax;
  };
</script>

<template>
  <h4 class="icon-detail-header">
    <span data-test="icon name">{{ iconDetails.name }}</span>
    <a
      data-test="fontawesome icon link"
      :href="iconHref"
      rel="noopener noreferrer"
      target="_blank"
    >
      <AppIcon
        icon="fa-duotone fa-solid fa-arrow-up-right-from-square"
        size="xs"
      />
      <span style="visibility: hidden">{{ iconDetails.name }}</span>
    </a>
  </h4>
  <div class="icon-details-container">
    <div class="example">
      <AppIcon
        class="example-icon"
        data-test="icon example"
        :icon="iconDetails.icon"
        size="7x"
      />
    </div>
    <div class="icon-details-content">
      <nav>
        <ul class="language-navigation">
          <li
            v-for="language in languages"
            :key="language"
          >
            <AppButton
              class="navigation-item"
              :class="{ active: language === activeTab }"
              :data-test="`click ${language}`"
              :label="language"
              link
              @click="onNavigationClick(language)"
            />
          </li>
        </ul>
        <ul
          v-if="['vue', 'react'].includes(activeTab)"
          class="language-sub-navigation"
        >
          <li
            v-for="subTab in subNavigation"
            :key="subTab"
          >
            <AppButton
              class="sub-navigation-item"
              :class="{ active: subTab === activeSubTab }"
              :data-test="`click ${subTab}`"
              :label="subTab"
              severity="info"
              text
              @click="onSubNavigationClick(subTab)"
            />
          </li>
        </ul>
      </nav>
      <code class="icon-usage" data-test="code example">
        {{ codeExample }}
      </code>
      <div class="footer">
        <AppIcon
          icon="fa-solid fa-info-circle"
          type="info"
        />
        <AppButton link>
          <a
            class="icon-usage-link"
            href="https://fontawesome.com/docs/web/dig-deeper/accessibility"
            rel="noopener noreferrer"
            target="_blank"
          >
            Accessibility + Icons
          </a>
        </AppButton>
        <AppButton
          v-if="usageDetails.href"
          link
          severity="info"
        >
          <a
            class="icon-usage-link"
            data-test="click icon usage"
            :href="usageDetails.href"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ usageDetails.copy }}
          </a>
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-details-container {
  display: flex;
  gap: 2rem;
}

.icon-details-content {
  display: flex;
  flex-direction: column;
  width: 40rem;
  background-color: var(--ink-text-light-1);
  border-radius: .5rem;
  color: var(--ink-white-soft);
  overflow-x: auto;
}

.icon-detail-header {
  display: flex;
  gap: 1rem;
  margin: 0;
}

.example {
  display: flex;
  justify-content: center;
  padding: 0 4rem;
  border: 1px solid var(--ink-border-color);
  border-radius: .5rem;
}

.example-icon {
  display: flex;
  align-items: center;
}

.icon-usage {
  padding: 1rem;
  overflow-x: auto;
  text-wrap: nowrap;
  font-size: 1.1rem;
  font-weight: 700;
}

.language-navigation,
.language-sub-navigation {
  display: flex;
  gap: .5rem;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.language-navigation {
  background-color: var(--ink-black);
  border-radius: .5rem .5rem 0 0;
}

.language-sub-navigation {
  padding: .5rem 0 0 1rem;
}

.navigation-item {
  padding: 1rem 1.5rem;
  color: var(--ink-info-color);
  text-transform: uppercase;
  border-radius: 0;

  &:hover :deep(.p-button-label) {
    text-decoration: none;
    color: var(--ink-white-mute);
  }

  &.active {
    background-color: var(--ink-text-light-1);
    color: var(--ink-white-mute);
  }
}

:deep(.p-button-label) {
  font-weight: 700;
}

.sub-navigation-item {
  text-transform: capitalize;

  &.active {
    color: var(--ink-white-soft);
  }
}

.footer {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .5rem 1rem;
  border-top: .2rem solid var(--ink-black);
}

.icon-usage-link {
  color: var(--ink-info-color);
  text-decoration: none;
  font-weight: 700;
}
</style>
