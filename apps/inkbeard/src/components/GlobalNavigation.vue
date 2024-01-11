<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue';

  const isActive = ref(false);
  const links = [
    {
      text: 'home',
      icon: 'fa-duotone fa-house fa-lg',
      to: { name: 'Home' },
    },
  ];
</script>

<template>
  <header :class="{ 'is-active': isActive }">
    <div class="navigation-container">
      <nav>
        <ul class="example-links">
          <li
            v-for="({ icon, text, to }) in links"
            :key="text"
          >
            <RouterLink
              :to="to"
              @click="isActive = false"
            >
              <template v-if="icon">
                <i :class="icon" />
                <span class="mobile-text">{{ text }}</span>
              </template>
              <template v-else>
                {{ text }}
              </template>
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
              <i class="fa-brands fa-github fa-lg" />
            </a>
          </li>
          <li>
            <a
              aria-label="LinkedIn profile link"
              href="https://www.linkedin.com/in/inkbeard/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="fa-brands fa-linkedin fa-lg" />
            </a>
          </li>
          <li>
            <RouterLink
              aria-label="Resume link"
              :to="{ name: 'Resume' }"
            >
              <i class="fa-solid fa-file fa-lg" />
            </RouterLink>
          </li>
        </ul>
      </nav>
      <i
        class="cta-hamburger fa-solid fa-lg"
        :class="`fa-${isActive ? 'xmark' : 'bars'}`"
        tabindex="0"
        @click="isActive = !isActive"
        @keydown="isActive = !isActive"
      />
    </div>
  </header>
</template>

<style scoped>
  a {
    color: white;
    text-decoration: none;
  }

  .cta-hamburger {
    position: absolute;
    top: 20px;
    right: -30px;
    cursor: pointer;
    transition: all .5s ease-in-out;

    .is-active & {
      right: 10px;
      color: white;
    }

    @media (width >= 768px) {
      display: none;
    }
  }

  .example-links {
    li {
      a {
        display: block;
        padding: 10px;
        transition: all .5s ease-in-out;

        &.router-link-active {
          cursor: default;
        }

        &:not(.router-link-active):hover {
          background-color: var(--color-background);
          color: var(--accent-color);

          /* body.dark & {
            color: white;
          } */
        }

        @media (width >= 768px) {
          display: flex;
          align-items: center;
          height: 100%;
        }
      }

      @media (width >= 768px) {
        display: flex;
      }
    }

    @media (width >= 768px) {
      display: flex;
      flex: 1;
      height: 100%;
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
      padding: 0;

      a {
        display: flex;
        justify-content: center;
        width: 20px;
      }
    }
  }

  .mobile-text {
    display: inline-block;
    margin-left: 10px;

    @media (width >= 768px) {
      display: none;
    }
  }

  header {
    position: fixed;
    left: -200px;
    top: 0;
    bottom: 0;
    width: 200px;
    z-index: 10;
    background-color: #323A66;
    transition: left .5s ease-in-out;

    @media (width >= 768px) {
      display: flex;
      align-items: center;
      left: 0;
      width: 100%;
      height: 50px;
    }

    &.is-active {
      left: 0;
    }
  }

  .navigation-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .toggle-wrapper {
    display: flex;
    align-items: center;
    position: fixed;
    top: 20px;
    right: 20px;
    width: 33px;
    height: 17px;
    margin: 0 10px;
    cursor: pointer;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background-color: var(--vt-c-divider-dark-1);

    @media (width >= 768px) {
      position: relative;
      top: inherit;
      right: inherit;
    }
  }

  .toggle-icon {
    transition: all .25s ease;
    border-radius: 100%;
    background-color: rgb(255 255 255 / 70%);

    .toggle-wrapper.is-active & {
      background-color: rgb(0 0 0 / 70%);
      border-color: rgb(0 0 0 / 70%);
      transform: translateX(16px);
    }
  }

  nav {
    position: relative;
    height: 100vh;
    width: 100%;
    padding-top: 40px;

    @media (width >= 768px) {
      display: flex;
      flex: 1;
      align-items: center;
      height: inherit;
      padding-top: 0;
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
</style>
