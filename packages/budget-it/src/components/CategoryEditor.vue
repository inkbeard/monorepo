<script setup lang="ts">
  import { computed, inject, ref } from 'vue';
  import {
    AppButton,
    AppColorPicker,
    AppConfirmPopup,
    AppInputText,
    useConfirm,
    useToast,
  } from '@inkbeard/ui-vue';
  import type {
    CategoryInfo,
  } from '../types';

  const emits = defineEmits<{
    /**
     * Emit the edited name and description of the category.
     */
    editCategory: [CategoryInfo];
    /**
     * Emit the category id that was deleted.
     */
    deleteCategory: [expenseId: number];
    /**
     * Emit that the editing of the category was canceled.
     */
    cancelEditing: [];
  }>();
  const props = defineProps<{
    /**
     * The total expenses for this category.
     */
    totalExpenses: number;
    /**
     * The expenses for this category.
     */
    categoryExpenses: ({
      amount: number,
      id: number,
      name: string,
    })[];
  }>();
  const confirm = useConfirm();
  const toast = useToast();
  const category = defineModel<CategoryInfo>('category', { required: true });
  const categoryList = inject<CategoryInfo[]>('categoryList', []);
  const categoryName = ref(category.value.name);
  const backgroundColor = ref(category.value.backgroundColor);
  const editableCategory = ref({
    backgroundColor,
    name: categoryName,
  });
  /**
   * The save button is disabled if the name is empty, the name is the same as the original name, or the name is the same as another category.
   */
  const saveIsDisabled = computed(() => (
    !editableCategory.value.name
    || editableCategory.value.name.toLowerCase() === category.value.name.toLowerCase()
    || categoryList.some(({ name }) => (
      name.toLowerCase() === editableCategory.value.name.toLowerCase()
    ))
  ));

  /**
   * Save the category with the new information and cancel editing.
   */
  function saveCategory() {
    category.value.name = categoryName.value;
    category.value.backgroundColor = backgroundColor.value;

    emits('editCategory', {
      backgroundColor: editableCategory.value.backgroundColor,
      id: category.value.id,
      name: editableCategory.value.name,
    });
  }
  /**
   * Cancel the editing of the category and reset the form.
   */
  function cancelEditing() {
    categoryName.value = category.value.name;
    backgroundColor.value = category.value.backgroundColor;
    emits('cancelEditing');
  }
  /**
   * Close the dialog, removed the category and emit the deleted category id.
   */
  function deleteCategory() {
    const index = categoryList.findIndex(({ id }) => id === category.value.id);

    categoryList.splice(index, 1);

    emits('deleteCategory', category.value.id);

    toast.add({
      severity: 'success',
      summary: 'Category deleted',
      detail: `"${categoryName.value}" has been deleted.`,
      life: 5000,
    });
  }
  /**
   * Confirm the deletion of the category.
   */
  function confirmDelete(event: { currentTarget: HTMLElement;
  }) {
    if (!props.totalExpenses && !props.categoryExpenses.length) {
      deleteCategory();
    } else {
      confirm.require({
        target: event.currentTarget,
        group: 'confirmDelete',
        message: `This will permanently delete $${props.totalExpenses} worth of expenses.`,
        icon: 'fa-solid fa-triangle-exclamation text-danger',
        acceptClass: 'p-button-raised p-button-sm p-button-danger',
        acceptIcon: 'fa-solid fa-check',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-raised p-button-sm',
        rejectIcon: 'fa-solid fa-xmark',
        rejectLabel: 'Cancel',
        accept: () => {
          deleteCategory();
        },
      });
    }
  }
</script>

<template>
  <form class="app-form-vertical" @submit.prevent="saveCategory">
    <div class="category-info">
      <AppColorPicker
        v-model="backgroundColor"
        class="category-background"
      />
      <AppInputText
        v-model="editableCategory.name"
        :input-id="`edit-name-${category.id}`"
        label="Name"
      />
    </div>
    <div class="btn-group align-end">
      <AppButton
        data-test="cancel add category"
        icon="fa-solid fa-xmark"
        label="Cancel"
        raised
        severity="secondary"
        text
        @click="cancelEditing"
      />
      <AppButton
        class="submit"
        data-test="submit add category"
        :disabled="saveIsDisabled"
        icon="fa-solid fa-check"
        label="Update"
        raised
        severity="primary"
        @click="saveCategory"
      />
    </div>
    <div class="delete-category">
      <AppButton
        data-test="delete category"
        icon="fa-solid fa-trash-can"
        label="Delete category"
        severity="danger"
        text
        @click="confirmDelete"
      />
    </div>
    <AppConfirmPopup group="confirmDelete" />
  </form>
</template>

<style scoped>
.category-info {
  display: flex;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;
}

.category-background {
  transform: translateY(-5px);
}

::v-deep(.app-form-group)  {
  flex: 1;
}

.delete-category {
  width: 100%;
  margin-top: 1rem;
  padding-top: 1rem;
  text-align: center;
  border-top: 1px solid var(--ink-border-color);
}
</style>
