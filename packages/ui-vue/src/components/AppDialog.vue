<script lang="ts" setup>
  import Dialog from 'primevue/dialog';
  import AppIcon from './AppIcon.vue';

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <Dialog
    v-bind="$attrs"
    :pt="{
      root: {
        class: 'app-dialog',
      },
      closeButton: {
        class: 'app-close-dialog',
      },
    }"
  >
    <template
      v-for="(_, name, index) in ($slots as {})"
      :key="index"
      #[name]="scope"
    >
      <slot :name="name" v-bind="{ scope }" />
    </template>
    <template #closeicon>
      <AppIcon
        class="close-icon"
        icon="fa-solid fa-xmark"
      />
    </template>
  </Dialog>
</template>

<style>
.p-dialog-header {
  padding: 0;
}

.p-dialog-title {
  padding: 1.5rem 1.5rem 1rem;
}

.p-dialog-header-icons {
  position: absolute;
  top: -1rem;
  right: -1rem;
}

.p-dialog .p-dialog-content:last-of-type {
  margin-top: .5rem;
}

.app-close-dialog {
  background-color: var(--ink-indigo);
  color: var(--ink-white);
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: var(--ink-black);
  }
}
</style>

<style scoped>
.close-icon {
  margin-top: 1px;
}
</style>
