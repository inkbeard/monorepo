export function getJqlQuery(): string {
  // Default placeholder; workflows can pass JQL via input/env in the future
  return process.env.INPUT_JQL || process.env.JQL || 'project = MYPROJ ORDER BY created DESC';
}
