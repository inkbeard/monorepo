<script setup lang="ts">
  /**
   * A card style container used to display related content.
   */
</script>

<template>
  <div class="app-card">
    <div
      v-if="$slots.header"
      class="app-card-header"
    >
      <slot name="header" />
    </div>
    <div class="app-card-body">
      <div
        v-if="$slots.title"
        class="app-card-title"
      >
        <slot name="title" />
      </div>
      <div
        v-if="$slots.subTitle"
        class="app-card-sub-title"
      >
        <slot name="subTitle" />
      </div>
      <div
        v-if="$slots.default"
        class="app-card-description"
      >
        <slot />
      </div>
    </div>
    <div
      v-if="$slots.footer"
      class="app-card-footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
  .app-card {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--ink-card-border-color, var(--ink-border-color));
    border-radius: var(--ink-card-border-radius, .25rem);
    background-color: var(--ink-card-light-background-color, var(--ink-white));
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);

    html.dark & {
      background-color: var(--ink-card-dark-background-color, var(--ink-black));
    }
  }

  .app-card-body {
    display: flex;
    flex-direction: column;
    gap: var(--ink-card-padding, .5rem);
    padding: var(--ink-card-padding, 1rem);
  }

  .app-card-title {
    font-size: var(--ink-card-title-font-size, var(--ink-h3-font-size));
    font-weight: var(--ink-card-title-font-weight, var(--ink-h3-font-weight));
    color: var(--ink-card-title-color, var(--ink-color-heading));
  }

  .app-card-sub-title {
    font-size: var(--ink-card-title-font-size, var(--ink-h4-font-size));
    font-weight: var(--ink-card-title-font-weight, var(--ink-h4-font-weight));
    color: var(--ink-card-title-light-color, var(--ink-black-mute));

    html.dark & {
      color: var(--ink-card-title-dark-color, var(--ink-white-mute));
    }
  }

  .app-card-footer {
    border-top: 1px solid var(--ink-card-border-color, var(--ink-border-color));
    padding: var(--ink-card-padding, 1rem);
  }
</style>
