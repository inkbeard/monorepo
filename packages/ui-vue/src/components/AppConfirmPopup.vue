<script lang="ts" setup>
  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <ConfirmPopup
    v-bind="$attrs"
    :pt="{
      root: {
        class: 'app-confirm-popup',
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
  </ConfirmPopup>
</template>
