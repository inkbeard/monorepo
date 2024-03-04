<script lang="ts" setup>
  import InputText from 'primevue/inputtext';
  import AppFormGroup from './AppFormGroup.vue';

  defineOptions({
    inheritAttrs: false,
  });
  defineProps<{
    /**
     * The label for the input.
     */
    label: string;
    /**
     * The description for the label that will appear in a tooltip.
     */
    labelDescription?: string;
    /**
     * The id for the input that will be used to associate the label with the input.
     */
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
