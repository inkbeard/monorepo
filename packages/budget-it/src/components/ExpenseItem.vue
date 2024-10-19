<script setup lang="ts">
  import { inject, ref } from 'vue';
  import {
    AppButton,
    AppDialog,
    AppInputNumber,
    AppDropdown,
    Tooltip,
  } from '@inkbeard/ui-vue';
  import type {
    ExpenseInfo,
    LabelsAndIds,
  } from '../types';
  import ExpenseEditor from './ExpenseEditor.vue';

  const props = defineProps<{
    /**
     * The expense ID.
     */
    expenseId: number;
  }>();
  const alphabaticSourceList = inject<LabelsAndIds>('alphabaticSourceList', []);
  const expense = defineModel<ExpenseInfo>('expense', { required: true });
  const expenseAmount = ref(expense.value.amount);
  const isEditing = ref(false);
  const vTooltip = Tooltip;
</script>

<template>
  <div class="expense-item">
    <div class="information-container">
      <h4
        v-tooltip.top="expense.description"
        class="expense-item-name font-size-p"
        :class="{ 'has-description': expense.description }"
      >
        {{ expense.name }}
      </h4>
      <AppButton
        icon="fa-solid fa-pencil"
        text
        @click="isEditing = true"
      />
    </div>
    <form class="expense-item-form" @submit.prevent>
      <AppInputNumber
        v-model="expenseAmount"
        v-tooltip.bottom="expense.isHidden ? 'This expense is hidden and cannot be editted.' : ''"
        currency="USD"
        :disabled="expense.isHidden"
        :input-id="`${expense.categoryId}-${expense.name}`"
        label="Amount"
        mode="currency"
        @blur="expense.amount = expenseAmount"
      />
      <AppDropdown
        :key="expense.sourceId"
        v-model="expense.sourceId"
        v-tooltip.bottom="expense.isHidden ? 'This expense is hidden and cannot be editted.' : ''"
        :disabled="expense.isHidden"
        input-id="expense-source"
        label="Source"
        option-label="label"
        option-value="id"
        :options="alphabaticSourceList"
      />
    </form>
    <AppDialog
      v-model:visible="isEditing"
      :header="`Edit ${expense.name}`"
      modal
      :style="{ width: '30rem' }"
    >
      <ExpenseEditor
        v-model:expense="expense"
        :expense-id="props.expenseId"
        @cancel-editing="isEditing = false"
        @delete-expense="isEditing = false"
        @edit-expense="isEditing = false"
      />
    </AppDialog>
  </div>
</template>

<style scoped>
.expense-item {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--ink-border-color);
}

.information-container {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .5rem 1rem 0;
}

.expense-item-name {
  margin: 0;
}

.has-description {
  cursor: help;
  text-decoration: underline;
}

.expense-item-form {
  display: flex;
  flex: 1;
  gap: 1rem;
  padding: .0 1rem 1rem;

  > * {
    flex: 1;
  }
}

.delete-expense {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ink-border-color);
}
</style>
