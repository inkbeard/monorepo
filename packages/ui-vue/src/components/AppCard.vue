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
    border: 1px solid #eaeaea;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  }
</style>
