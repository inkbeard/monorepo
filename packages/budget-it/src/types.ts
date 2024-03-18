export interface BaseExpenseInfo {
  /**
   * Description of the expense.
   */
  description?: string
  /**
   * Name of the expense.
   */
  name: string
}

/**
 * General information about a particular expense.
 */
export interface ExpenseInfo extends BaseExpenseInfo {
  /**
   * Amount of the expense.
   */
  amount: number
  /**
   * Unique identifier for the category the expense belongs to.
   */
  categoryId: number
  /**
   * Unique identifier for the expense.
   */
  id?: number
  /**
   * Order of the expense in the list.
   */
  order: number
  /**
   * Source Id of the expense that is mapped from the sources store.
   */
  sourceId: number
}

/**
 * A dictionary of expenses with a `[expenseId]: ExpenseInfo` pair.
 */
export interface ExpenseList {
  [key: string]: ExpenseInfo;
}

/**
 * Required data for a category.
 */
export interface CategoryInfo {
  backgroundColor: string
  id: number
  name: string
}

/**
 * A dictionary of sources with a `[sourceId]: sourceName` pair.
 */
export interface SourceList {
  [sourceId: string]: string;
}

/**
 * A list of labels and ids used for select options.
 */
export type LabelsAndIds = ({
  id: number
  label: string
})[];
