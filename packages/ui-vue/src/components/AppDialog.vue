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
      <AppIcon icon="fa-solid fa-xmark" />
    </template>
  </Dialog>
</template>

<style>
.p-dialog-header-close {
  transform: translate(.5rem, -.5rem);
}
</style>
