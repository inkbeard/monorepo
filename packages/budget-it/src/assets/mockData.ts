import type {
  // ExpenseInfo,
  ExpenseList,
  CategoryInfo,
  SourceList,
  // LabelsAndIds,
} from '@/types';

export const categoryList: CategoryInfo[] = [
  {
    backgroundColor: '#b30000',
    id: 1,
    name: 'Entertainment',
  },
  {
    backgroundColor: '#7c1158',
    id: 2,
    name: 'Food',
  },
  {
    backgroundColor: '#4421af',
    id: 3,
    name: 'Housing',
  },
  {
    backgroundColor: '#1a53ff',
    id: 4,
    name: 'Transportation',
  },
  {
    backgroundColor: '#0d88e6',
    id: 5,
    name: 'Utilities',
  },
  {
    backgroundColor: '#00b7c7',
    id: 6,
    name: 'Clothing',
  },
  {
    backgroundColor: '#5ad45a',
    id: 7,
    name: 'Medical',
  },
];

export const expenseList: ExpenseList = {
  1: {
    amount: 2,
    categoryId: 1,
    isHidden: false,
    name: 'Netflix',
    order: 0,
    sourceId: 1,
  },
  2: {
    amount: 2,
    categoryId: 2,
    isHidden: false,
    name: 'HBFC',
    order: 0,
    sourceId: 5,
  },
  3: {
    amount: 1000,
    categoryId: 3,
    description: 'Started with Guaranteed Rate and then refinanced with Better.com.',
    isHidden: false,
    name: 'Mortgage',
    order: 0,
    sourceId: 3,
  },
  4: {
    amount: 30,
    categoryId: 4,
    isHidden: false,
    name: 'Gas',
    order: 0,
    sourceId: 1,
  },
  5: {
    amount: 50,
    categoryId: 5,
    isHidden: false,
    name: 'Target',
    order: 0,
    sourceId: 1,
  },
  7: {
    amount: 2260,
    categoryId: 7,
    description: 'Monthly premium for family of 4.',
    isHidden: false,
    name: 'BCBS',
    order: 0,
    sourceId: 3,
  },
  8: {
    amount: 2,
    categoryId: 1,
    isHidden: false,
    name: 'Hulu',
    order: 1,
    sourceId: 1,
  },
  9: {
    amount: 300,
    categoryId: 2,
    isHidden: false,
    name: 'Jewel',
    order: 1,
    sourceId: 4,
  },
  10: {
    amount: 99,
    categoryId: 4,
    isHidden: false,
    name: 'Metra',
    order: 1,
    sourceId: 1,
  },
};

export const sourceList: SourceList = {
  1: 'Credit Card',
  3: 'Checking Account',
  4: 'Savings Account',
  5: 'Cash',
};
