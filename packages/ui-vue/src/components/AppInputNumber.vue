<script lang="ts" setup>
  import InputNumber from 'primevue/inputnumber';
  import AppFormGroup from './AppFormGroup.vue';

  defineOptions({
    inheritAttrs: false,
  });
  defineProps<{
    /**
     * Whether the input should be disabled. (this is a PrimeVue prop but needed here for better unit testing.)
     */
    disabled?: boolean;
    /**
     * The label used for the `<label>` field.
     */
    label: string;
    /**
     * The id for the input associated with the label and form.
     */
    inputId: string;
    /**
     * The copy used for the label popover.
     */
    labelDescription?: string;
    /**
     * The model to be passed to the input. (this is a PrimeVue prop but needed here for better unit testing.)
     */
    modelValue: number;
    /**
     * The class to apply to the wrapper element.
     */
    wrapperClass?: string;
  }>();
</script>

<template>
  <AppFormGroup
    :class="wrapperClass"
    :input-id="inputId"
    :label="label"
    :label-description="labelDescription"
  >
    <InputNumber
      v-bind="{
        ...$attrs,
        disabled,
        modelValue,
      }"
      :pt="{
        root: {
          class: 'app-input-number',
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
    </InputNumber>
  </AppFormGroup>
</template>
