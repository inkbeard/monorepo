export function getJqlQuery(): string {
  return process.env.INPUT_JQL || process.env.JQL || '';
}
