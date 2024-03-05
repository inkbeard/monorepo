# @inkbeard/budget-it

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
