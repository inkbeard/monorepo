<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { ref, watch, onBeforeMount } from 'vue';
  import AppIcon from '@/components/AppIcon.vue';

  const darkMode = ref(false);
  const isActive = ref(false);
  const projects = [
    {
      label: 'Budget It',
      route: 'BudgetIt',
    },
    {
      label: 'GBT Mad Libs',
      route: 'GbtMadLibs',
    },
    {
      label: 'Icon Memory',
      route: 'IconMemory',
    },
  ];

  watch(darkMode, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('dark');
      window.sessionStorage.setItem('darkMode', String(true));
    } else {
      document.documentElement.classList.remove('dark');
      window.sessionStorage.removeItem('darkMode');
    }
  });

  onBeforeMount(() => {
    if (window.sessionStorage.getItem('darkMode')) {
      darkMode.value = true;
    }
  });
</script>

<template>
  <header>
    <div class="navigation-container" :class="{ 'is-active': isActive }">
      <nav>
        <ul class="example-links">
          <li>
            <RouterLink
              class="home-link"
              :to="{ name: 'Home' }"
              @click="isActive = false"
            >
              <AppIcon icon="fa-duotone fa-house" />
              inkbeard
            </RouterLink>
          </li>
          <li
            v-for="({ label, route }) in projects"
            :key="route"
          >
            <RouterLink
              :to="{ name: route }"
              @click="isActive = false"
            >
              {{ label }}
            </RouterLink>
          </li>
        </ul>
        <ul class="external-links">
          <li>
            <a
              aria-label="GitHub profile link"
              href="https://github.com/inkbeard"
              rel="noopener noreferrer"
              target="_blank"
            >
              <AppIcon icon="fa-brands fa-github" />
            </a>
          </li>
          <li>
            <a
              aria-label="LinkedIn profile link"
              href="https://www.linkedin.com/in/inkbeard/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <AppIcon icon="fa-brands fa-linkedin" />
            </a>
          </li>
          <li>
            <RouterLink
              aria-label="Resume link"
              :to="{ name: 'Resume' }"
            >
              <AppIcon icon="fa-solid fa-file" />
            </RouterLink>
          </li>
        </ul>
      </nav>
      <i
        class="cta-hamburger fa-solid"
        :class="`fa-${isActive ? 'xmark' : 'bars'}`"
        @click="isActive = !isActive"
        @keydown="isActive = !isActive"
      />
      <button
        class="toggle-wrapper"
        :class="{ 'is-active': darkMode }"
        type="button"
        @click="darkMode = !darkMode"
      >
        <span class="toggle-icon">
          <AppIcon
            :icon="`fa-solid fa-${darkMode ? 'moon' : 'sun-bright'}`"
            size="sm"
          />
        </span>
      </button>
    </div>
  </header>
</template>

<style scoped>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    @media (width >= 768px) {
      display: flex;
    }
  }

  a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: var(--ink-white);
    transition: all .5s ease-in-out;

    &.home-link {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &.router-link-active:not(.home-link) {
      cursor: default;
      text-decoration: underline;
    }

    html.dark & {
      color: var(--ink-black);
    }

    @media (width >= 768px) {
      color: var(--ink-black);

      html.dark & {
        color: var(--ink-white);
      }
    }
  }

  header {
    border-bottom: 1px solid var(--color-border);
    width: 100%;

    @media (width >= 768px) {
      display: flex;
      align-items: center;
    }
  }

  nav {
    position: fixed;
    left: -200px;
    top: 0;
    bottom: 0;
    width: 200px;
    height: 100vh;
    padding-top: 40px;
    transition: all .5s ease-in-out;
    background-color: var(--ink-black);
    color: var(--ink-white);

    .is-active & {
      left: 0;
      background-color: var(--ink-black);

      html.dark & {
        background-color: var(--ink-white);
      }
    }

    @media (width >= 768px) {
      position: relative;
      display: flex;
      flex: 1;
      justify-content: space-between;
      left: 0;
      align-items: center;
      height: inherit;
      padding-top: 0;
      background-color: transparent;
    }
  }

  .cta-hamburger {
    z-index: 10;
    cursor: pointer;
    transition: all .5s ease-in-out;

    .is-active & {
      margin-left: 160px;
      color: var(--ink-white);

      html.dark & {
        color: var(--ink-black);
      }
    }

    @media (width >= 768px) {
      display: none;
    }
  }

  .external-links {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 20px 30px;

    @media (width >= 768px) {
      position: relative;
      width: 90px;
      margin-left: 0;
      padding: 0;

      a {
        display: flex;
        justify-content: center;
        width: 20px;
      }
    }
  }

  .navigation-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 10px;

    @media (width >= 768px) {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  .toggle-wrapper {
    display: flex;
    align-items: center;

    /* position: fixed; */

    /* top: 20px; */

    /* right: 20px; */
    width: 37px;
    height: 22px;

    /* margin: 0 10px; */
    margin-left: 10px;
    padding: 0;
    cursor: pointer;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background-color: var(--ink-divider-dark-1);

    @media (width >= 768px) {
      position: relative;
      top: inherit;
      right: inherit;
    }

    &:hover {
      border-color: var(--color-border-hover);
    }
  }

  .toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .25s ease;
    width: 19px;
    height: 19px;
    border-radius: 100%;
    background-color: rgb(255 255 255 / 70%);

    .toggle-wrapper.is-active & {
      background-color: rgb(0 0 0 / 70%);
      border-color: rgb(0 0 0 / 70%);
      transform: translateX(16px);
    }
  }
</style>
