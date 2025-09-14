# @inkbeard/icon-memory

## 0.6.0

### Minor Changes

- f9cf717: updated dependencies

## 0.5.1

### Patch Changes

- ba4bc47: Update dependency vite to ^5.4.14

## 0.5.0

### Minor Changes

- a69c01e: removed `primary` severity from buttons

## 0.4.0

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

## 0.3.0

### Minor Changes

- 040c0ae: - Updated IconCard component to use `isActive` v-model instead of relying on the `gameHasStarted` state
  - Updated MatchedCards to account for both `isActive` and `isMatched` states
  - Updated IconMemory logic to account for `isActive` v-model prop.
- bdea47d: Added IconDetails modal to the MatchedCards component
- 47d00df: - Updated the icon array of strings to be an object with icon information.
  - Updated all components to use `iconId` instead of `cardId`
- 6b904dd: - Moved types to appropriate file
  - Adjusted all type paths
  - Cleaned up some documentation
  - Updated the mockData
- 20ab127: Added IconDetails component, tests, and story
- 6dba90d: Added finished game screen
- 034da94: - updated mockData
  - moved types to file
- 9f9373e: - Updated layout of starting board
  - Updated tests
  - Updated the TimeCounter watch to account for 'oldValue'

## 0.2.0

### Minor Changes

- 80e4aff: added TimeCounter component and unit test
- 2b583fa: - Added MatchCards component, tests, and story
  - Added 'pro' prop to the IconCard
- 4073f3d: Added section and logic for matched pairs in the game section
- 54a4b4a: Added TurnCounter markup, styles, and test
- 7217c00: Fixed issue with `isActive` being a model instead of a prop
- ade77e6: Added counting logic to IconMemory
- c51cd32: Implemented TimeCounter into IconMemory

## 0.1.0

### Minor Changes

- 549a193: Set max pairs to 20
- 40b65ad: Added base template for icon-memory.
- 2df5b5b: Added basic IconMemory component
- 2cffda9: - Added game board starting logic and tests
  - Added calcuation logic and tests for flipped cards
- 709a835: Added card interactions, styles, and tests
- 65fbc7c: - Added the GameSetup component and tests
  - Added an AppInputNumber for the pair count
  - Added a cta to start the game
