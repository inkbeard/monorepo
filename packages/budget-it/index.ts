import { ConfirmationService, ToastService } from '@inkbeard/ui-vue';
import { useBudgetIt } from './src/components/BudgetIt';
import BudgetIt from './src/components/BudgetIt.vue';
import AddCategory from './src/components/AddCategory.vue';
import AddExpense from './src/components/AddExpense.vue';
import CategoryBreakdown from './src/components/CategoryBreakdown.vue';
import ExpenseCategory from './src/components/ExpenseCategory.vue';
import ExpenseItem from './src/components/ExpenseItem.vue';
import SourceListing from './src/components/SourceListing.vue';
import SourcesEditor from './src/components/SourcesEditor.vue';

export {
  AddCategory,
  AddExpense,
  BudgetIt,
  CategoryBreakdown,
  ExpenseCategory,
  ExpenseItem,
  SourceListing,
  SourcesEditor,
  useBudgetIt,
};

export default {
  install: (app: any) => {
    app.use(ConfirmationService);
    app.use(ToastService);
  },
};
