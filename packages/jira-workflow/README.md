Jira Workflow Actions

This package exposes multiple local actions:

- `action.yml` — Jira JQL Search (original)
- `action-block-link.yml` — Ensure issues found by JQL are linked to a blocker

action-block-link inputs:
- `jql` (required) — JQL to find issues
- `blocker` (optional) — blocker issue key (default `INK-91`)
- `linkType` (optional) — link type name to create (default `Blocks`)
- `blockerSide` (optional) — `outward` (default) or `inward` to control which side the blocker is placed on
- `dryRun` (optional) — `true` (default) to avoid creating links; set to `false` to actually create links

Make sure to provide `JIRA_BASE_URL`, `JIRA_EMAIL`, and `JIRA_API_TOKEN` as secrets or env variables when using the actions.
