<script lang="ts" setup>
  import InputNumber from 'primevue/inputnumber';
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
    <InputNumber
      v-bind="$attrs"
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
