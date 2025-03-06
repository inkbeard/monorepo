# @inkbeard/ui-vue

## 0.14.1

### Patch Changes

- ba4bc47: Update dependency vite to ^5.4.14
- 6f956c4: updated readmes for company prefix

## 0.14.0

### Minor Changes

- a69c01e: - Updated `warn` to `warning` for AppAlert severity
  - Added `severity` prop to AppButton

## 0.13.0

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

## 0.12.0

### Minor Changes

- ced6d73: updated the close icon style and positioning.

## 0.11.0

### Minor Changes

- 2b32714: Added base AppCard component template and test.
- 2535f79: Updated h4 font-weight to 600
- ecb4d2a: - Updated vue-tsc to v2
  - Updated to @tsconfig/node20
- cb92d71: Added disabled and modelValue to AppInputNumber props
- dc87cab: Added wrapperClass prop for root level class.
- 2535f79: Added styles to the AppCard component
- 680c3fb: Added the AppCard markup, slots, and tests

## 0.10.0

### Minor Changes

- 55797b1: Pinned typsecript version

## 0.9.0

### Minor Changes

- 0003a29: Updated remaining packages to latest minor/patch

## 0.8.0

### Minor Changes

- ea37d64: Updated vue related packages
- 504690a: Updated vue to latest version

## 0.7.0

### Minor Changes

- fb5d42b: Changed `disabled` AppButton to allow for `number` type.
- 06e0443: Added coverage report

## 0.6.0

### Minor Changes

- 032e60c: Added AppAlert component template and test.
- 6c28879: - Extended PrimeVue's OverlayPanel as AppOverlayPanel.
- 857f73c: Added ResetBudgetIt component, story, test, and example
- d938ec4: Fixed styling for toast w/o summary
- 5504202: Added slotted styles for text buttons in the AppAlert component

## 0.5.0

### Minor Changes

- 06be09b: - Extended PrimeVue's ColorPicker as AppColorPicker.

## 0.4.0

### Minor Changes

- 6128a04: - Extended PrimeVue's Toast as AppToast.
- c961fa1: Updated AppToast with correct icons

## 0.3.0

### Minor Changes

- db65170: - Exporting readme files and changelogs
- 220cdf0: - Extended the `ConfirmPopup` as `AppConfirmPopup`
- 0154322: - Added margin between buttons within btn-groups
- e1c2b95: pinned typescript version to 5.2.2 as workaround for https://github.com/vercel/turbo/issues/6656

## 0.2.0

### Minor Changes

- d743355: - Added primevue's Tooltip to the library export
- 3595fad: - Extended primvevue's `Dialog` component as AppDialog
- d6ba32c: - Added utility class to be used on forms to stack form groups
- 311826f: - Updated extended PrimeVue components to use dynamic slots

## 0.1.0

### Minor Changes

- 3d2f919: - Added ui-theme to ui-vue component package.
  - Replaced old ui-theme with ui-vue component package.
- b6f7d7e: - Added AppInputNumber, AppFormGroup, and AppDropdown to component library
  - Extended InputNumber and AppDropdown from prime vue
- 08307b3: Added `isFullWidth` prop to AppButton
- 3172fb9: - Extending primevue as ui-vue plugin config
- b5a36b7: Bump @vitejs/plugin-vue from 4.5.2 to 5.0.4
- 68e1654: - Added AppButton component
  - exporting main css, which includes the ui-theme
- f3c95ee: - Added size prop to AddButton
  - Updated the theme to be blue instead of green. This distinguishes the success severity from from the primary button color.
- c918309: Removed workspace eslint and replaced with root level package dependency
- e2b4b4e: Add AppIcon component
- 5ff3d62: Added AppInputText component and story
- 08770ee: - Added base ui-vue library package
  - Added stylelint extension
  - Added eslint extension
