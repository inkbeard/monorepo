<script setup lang="ts">
  /**
   * An AppButton component that is meant to clear all the data of the Budget It application.
   */

  import {
    AppButton,
    AppToast,
    useConfirm,
    useToast,
    AppConfirmPopup,
  } from '@inkbeard/ui-vue';
  import { inject } from 'vue';
  import type {
    CategoryInfo,
    ExpenseList,
    SourceList,
  } from '../types';

  export interface Props {
    /**
     * The data attribute to use for the button.
     */
    btnDataAttr?: string,
    /**
     * Whether the button should take up the full width of its container.
     */
    isFullWidth?: boolean;
    /**
     * The text to display on the button.
     */
    label?: string;
  }

  withDefaults(defineProps<Props>(), {
    btnDataAttr: 'reset budget it',
    isFullWidth: false,
    label: 'Reset data',
  });

  const categoryList = inject<CategoryInfo[]>('categoryList', []);
  const confirm = useConfirm();
  const expenseList = inject<ExpenseList>('expenseList', {});
  const sourceList = inject<SourceList>('sourceList', {});
  const toast = useToast();

  function deleteData() {
    Object.keys(expenseList).forEach((key) => delete expenseList[key]);
    Object.keys(sourceList).forEach((key) => delete expenseList[key]);
    categoryList.length = 0;

    toast.add({
      severity: 'success',
      detail: 'All data has been deleted.',
      life: 5000,
    });
  }
  /**
   * Confirm resetting the Budget It application data.
   */
  function confirmReset(event: { currentTarget: HTMLElement;
  }) {
    confirm.require({
      target: event.currentTarget,
      group: 'confirmReset',
      message: 'This will permanently delete all categories, sources, and expenses!',
      icon: 'fa-solid fa-triangle-exclamation text-danger',
      acceptClass: 'p-button-raised p-button-sm p-button-danger',
      acceptIcon: 'fa-solid fa-check',
      acceptLabel: 'Reset',
      rejectClass: 'p-button-secondary p-button-raised p-button-sm',
      rejectIcon: 'fa-solid fa-xmark',
      rejectLabel: 'Cancel',
      accept: () => deleteData(),
    });
  }
</script>

<template>
  <AppButton
    :data-test="btnDataAttr"
    icon="fa-solid fa-exclamation-triangle"
    :is-full-width="isFullWidth"
    :label="label"
    severity="danger"
    @click="confirmReset"
  />
  <AppConfirmPopup group="confirmReset" />
  <AppToast />
</template>
