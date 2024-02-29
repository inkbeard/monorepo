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
  sourceId: number
}

export interface ExpenseList {
  [key: number]: ExpenseInfo;
}

/**
 * Required data for a category.
 */
export interface CategoryInfo {
  color?: string
  id: number
  name: string
}

export interface SourceList {
  [sourceId: number]: string;
}
