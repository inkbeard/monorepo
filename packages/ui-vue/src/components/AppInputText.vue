<script lang="ts" setup>
  import InputText from 'primevue/inputtext';
  import AppFormGroup from './AppFormGroup.vue';

  defineOptions({
    inheritAttrs: false,
  });
  defineProps<{
    label: string;
    labelDescription?: string;
    inputId: string;
  }>();
</script>

<template>
  <AppFormGroup
    :input-id="inputId"
    :label="label"
    :label-description="labelDescription"
  >
    <InputText
      v-bind="$attrs"
      :pt="{
        root: {
          class: 'app-input-text',
        },
      }"
    />
  </AppFormGroup>
</template>
