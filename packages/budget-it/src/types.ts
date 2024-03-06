/**
 * General information about a particular expense.
 */
export interface ExpenseInfo {
  /**
   * Amount of the expense.
   */
  amount: number
  /**
   * Unique identifier for the category the expense belongs to.
   */
  categoryId: number
  /**
   * Description of the expense.
   */
  description?: string
  /**
   * Unique identifier for the expense.
   */
  id?: number
  /**
   * Name of the expense.
   */
  name: string
  /**
   * Order of the expense in the list.
   */
  order: number
  /**
   * Source Id of the expense that is mapped from the sources store.
   */
  sourceId: NullOrNumber
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
  color?: string
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
 * The default source id that will be applied to expenses if no source is selected.
 */
export type NullOrNumber = null | number;

/**
 * A list of labels and ids used for select options.
 */
export type LabelsAndIds = ({
  id: number
  label: string
})[];
