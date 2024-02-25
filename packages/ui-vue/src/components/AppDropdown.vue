<script lang="ts" setup>
  import Dropdown from 'primevue/dropdown';
  import AppFormGroup from './AppFormGroup.vue';

  defineOptions({
    inheritAttrs: false,
  });
  defineProps<{
    label: string;
    inputId: string;
  }>();
</script>

<template>
  <AppFormGroup
    :input-id="inputId"
    :label="label"
  >
    <Dropdown v-bind="$attrs">
      <template #dropdownicon>
        <i class="fa-solid fa-caret-down" />
      </template>
    </Dropdown>
  </AppFormGroup>
</template>

<style scoped>
:deep(.p-inputtext) {
  padding-top: 0.28rem;
  padding-bottom: 0.28rem;
}
</style>
