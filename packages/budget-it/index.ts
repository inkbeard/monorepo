import { ConfirmationService, ToastService } from '@inkbeard/ui-vue';
import AddCategory from './src/components/AddCategory.vue';
import AddExpense from './src/components/AddExpense.vue';
import BudgetIt from './src/components/BudgetIt.vue';
import CategoryBreakdown from './src/components/CategoryBreakdown.vue';
import ExpenseCategory from './src/components/ExpenseCategory.vue';
import ExpenseItem from './src/components/ExpenseItem.vue';
import SourceListing from './src/components/SourceListing.vue';
import SourcesBreakdown from './src/components/SourcesBreakdown.vue';
import SourcesEditor from './src/components/SourcesEditor.vue';
import ResetBudgetIt from './src/components/ResetBudgetIt.vue';

export {
  AddCategory,
  AddExpense,
  BudgetIt,
  CategoryBreakdown,
  ExpenseCategory,
  ExpenseItem,
  ResetBudgetIt,
  SourceListing,
  SourcesBreakdown,
  SourcesEditor,
};

export default {
  install: (app: any) => {
    app.use(ConfirmationService);
    app.use(ToastService);
  },
};
