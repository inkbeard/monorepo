<script lang="ts" setup>
  import Dialog from 'primevue/dialog';

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
    <template v-for="(value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </Dialog>
</template>
