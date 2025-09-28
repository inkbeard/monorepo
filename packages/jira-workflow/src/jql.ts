export function getJqlQuery(): string {
  // Default placeholder; workflows can pass JQL via input/env in the future
  console.log('::debug::Retrieving JQL query from INPUT_JQL, JQL env var, or default');
  console.log(`::debug::INPUT_JQL='${process.env.INPUT_JQL}'`);
  console.log(`::debug::JQL='${process.env.JQL}'`);
  return process.env.INPUT_JQL || process.env.JQL || 'project = inkbeard ORDER BY created DESC';
}
