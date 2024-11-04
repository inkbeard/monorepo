# @inkbeard/budget-it

## 1.3.0

### Minor Changes

- a69c01e: removed `primary` severity from buttons

## 1.2.0

### Minor Changes

- 24f9b55: - Added vitest and recommended rules
  - Added spacing vue rules
  - Fixed all rule violations
- b366e1f: - updated interfaces to types for consistency
  - destructure vue props
  - updated to node v22
  - updated eslint rules for consistency
  - added vitest eslint rules
  - added prop jsdocs

## 1.1.0

### Minor Changes

- ecb4d2a: - Updated vue-tsc to v2
  - Updated to @tsconfig/node20

## 1.0.0

### Major Changes

- 4c52861: Cleaned up readme and released

### Minor Changes

- 55797b1: Pinned typsecript version

## 0.12.0

### Minor Changes

- 0003a29: Updated remaining packages to latest minor/patch

## 0.11.0

### Minor Changes

- ea37d64: Updated vue related packages
- 6fbaedd: Updated @rushstack/eslint-patch to latest
- 504690a: Updated vue to latest version
- 504690a: Updated all packages to their latest versions.

## 0.10.0

### Minor Changes

- a53fdb7: Added vitest coverage

## 0.9.0

### Minor Changes

- b9b9d02: [ink-79] Disabled inputs for ExpenseItem when expense is hidden.
- d4e71e7: [ink-77] Added option to hide/show expenses
- a8c84bf: [ink-78] Ignore hidden expense when calculating totals

## 0.8.0

### Minor Changes

- 857f73c: Added ResetBudgetIt component, story, test, and example
- 1bad85a: Added AppAlert for empty category
- 2e0d59a: [ink-76] Cleared sourceList object with deleting data in ResetBudgetIt
- f210c1d: Disabled "Add expense" button and added tooltip if no sources

## 0.7.1

### Patch Changes

- d3770a4: [ink-74] delete category on delete confirm

## 0.7.0

### Minor Changes

- 6a6553e: - Added CategoryEditor for editing category name and background color
  - Replaced the delete button on the ExpenseCategory component with an edit button that opens the CategoryEditor
- 1f596e0: Updated language for adding category button
- f911fc4: - Added color picker to the AddCategory component
  - Added background color to the CategoryInfo interface
  - Added backgroundColor option to the addCategory function
- a6665ea: Added CategoryBreakdown component
- b65376f: Updated wording for ExpenseEditor's save button
- c0b2a67: Added category color to title
- e8c8529: Added SourcesBreakdown

## 0.6.0

### Minor Changes

- 0a5d6bc: Added toast confirmation to category deletion
- 0e676cd: Added toast message to successful expense deletion
- a97e938: Added toast to successful source deletion

## 0.5.0

### Minor Changes

- db65170: - Exporting readme files and changelogs
- a69a601: - Added `ConfirmationService` installation to the plugin installation.
  - Added confirmation of expense deletion
- 1369a92: Added confirmation popup when deleting categories
- d91bbe4: - Added delete button and logic for expense item
- e1c2b95: pinned typescript version to 5.2.2 as workaround for https://github.com/vercel/turbo/issues/6656
- a69a601: - Added ExpenseEditor component
  - Replaced expense form in ExpenseItem component with ExpenseEditor
- 8450a8f: - Added `raised` property for buttons in the AddExpense component

## 0.4.0

### Minor Changes

- c675847: - [INK-67] added "currency" and "mode" props for the expense amount components
- 0e38e69: - Added AddExpense component to the ExpenseCategory component
- 2c8727f: - Moved the category delete button next to the title
- 10ae8cd: Added AddExpense component
- c6a082d: - [INK-68] removed `labelDescription` prop from the "amount" input component
- e47d42a: - Added dialog for editing expense names and descriptions
  - Added emit for ExpenseCategory as an example
- 49e686b: Updated `isActive` local ref to be `isAdding` model
- 1190571: - [ink-71] fixed expense category not adding expenses
  - Added <BaseExpenseInfo> and extended <ExpenseInfo> to include it
- 8550cc9: - indented the expense items for the ExpenseCategory component
  - Moved the expense edit button next to the name
  - Replaced the expense name with "Amount" for label for the "amount" input
  - Added the expense name to the top of the expenseItem component
- c9e423e: - removed <NullOrNumber>
  - Added logic to add new new expenses from the AddExpense component
  - updated defaultSourceId to be a required <number>
- 5705f5f: - Updated prop documentation
  - Updated `isOpen` to be a v-model

## 0.3.0

### Minor Changes

- 3d2f919: - Added ui-theme to ui-vue component package.
  - Replaced old ui-theme with ui-vue component package.
- e9ccea6: Added sources store foundation
- 19ddeea: - replaced SourcesEditor store with props.
  - exporting SourcesEditor component
- 6ac40c8: Replaced buttons with AppButton for AddCategory
- 5edb8a9: Replaced buttons with AppButton for ExpenseCategory
- 41d0939: Moved types to its own folder
- 867a453: - Updated SourceListing to rely on prop data instead of store data
  - Exporting SourceListing component as part of the library
- ebab5f8: replaced ExpenseCategory props with inject logic
- dd9c6d5: Added total expenses to expense category
- ebfa74b: - Added description to ExpenseItem interface
  - Added temporary icon/logic for expense description
  - Added some test descriptions
- 2200a42: - Added default logic to the addSource action
  - Removed emits in the SourceListing
  - Added isEditing model to SourceListing for communication to the parent and self
  - Added default checkbox new source logic
  - Added icon to quickly make existing sources the default
  - Removed store logic in the SourceEditor
- b5a36b7: Bump @vitejs/plugin-vue from 4.5.2 to 5.0.4
- f7b28e4: - Moved ExpenseItem store logic to be props
- 1c8eeec: - Added LabelAndIds type and adjusted alphabatical sources to use this type
  - Updated ExpenseItem to use inject instead of props
- fc89e60: - Added BudgetIt component and exporting
  - BudgetIt component takes props and provides them to the children
  - AddCategory is injected with data and methods to mutate the data
- 81ff104: - Added getter for getting an alphabatized list of sources
  - Added dropdown for the sources in the expense items
- 3a58361: - Exporting AddCategory component
  - Updated AddCategory component to rely on props/emits instead of a store
- 4bb1d79: Changed ExpanseItem to change store on input blur
- a721908: - moved sourcesWithExpenses logic to source store
  - added SourceListing component
  - moved new source logic to SourceListing component
- 68e1654: Replaced ui-theme with ui-vue exported styles
- b2258e3: prevent expense item from submitting on enter
- c918309: Removed workspace eslint and replaced with root level package dependency
- b6f7d7e: Replaced form elements in ExpenseItem component to AppInputNumber and AppDropdown from the vue-ui library.
- f3c95ee: Replaced buttons with AppButton for SourcesListing and SourceEditor
- 08b34c2: Updated id to be optional on the ExpenseInfo interface
- 3172fb9: - replaced dependency on primevue
  - replaced primevue config with ui-vue config
- 5a6d37d: - Added NullOrNumber union type
  - Updated SourceListing component to use injected data instead of props
- ebb23de: - Added a source management area
  - Added logic to delete any source that is not being used by an expense
- 1b9a62b: - Removed the App and stores
  - updated the README for how to use the package.
- 3305c0f: Added ability to add sources
- bbb4992: - Added tooltip directive
  - Added tooltip to expense description
- a84430d: Replaced local styles with @inkbeard/ui-theme

### Patch Changes

- a402b2c: Bump vue from 3.4.15 to 3.4.18

## 0.2.0

### Minor Changes

- 5e672b1: Associated Expense Items with the expense store
- 3605c5d: Added categories store and move all logic to it.
- 1c39150: Added expenses pinia store and test
- 9022b41: added category store unit test
- db29e2d: Added ExpenseCategory unit test

## 0.1.0

### Minor Changes

- 64cf569: - Updated background for categories to white with a black text color.
  - Added marging to bottom to the categories.
- 8f8eee9: Added category expense rendering
- 9314524: Added ability to add new categories
- 054db48: Added logic to delete a listed category
- 7763774: - Updated buttons to fontawesome icons
  - Added expense item component with editable input
