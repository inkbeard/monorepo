import { JiraClient } from './jiraClient';

export async function main() {
  const jql = process.env.INPUT_JQL || process.env.JQL || '';
  const blocker = process.env.INPUT_BLOCKER || 'INK-91';
  const linkType = process.env.INPUT_LINKTYPE || process.env.LINK_TYPE || 'Blocks';
  const blockerSide = (process.env.INPUT_BLOCKERSIDE || process.env.BLOCKER_SIDE || 'outward').toLowerCase();
  const dryRun = ((process.env.INPUT_DRYRUN || process.env.DRY_RUN || 'true').toLowerCase() === 'true');

  if (!jql) {
    console.error('No JQL provided via input `jql` or JQL env var');
    process.exitCode = 1;
    return;
  }

  const client = new JiraClient();

  try {
    const issues = await client.searchAllIssues(jql, 50);
    if (!issues.length) {
      console.info('No issues returned by JQL');
      return;
    }

    for (const issue of issues) {
      const key = issue.key;
      const status = issue.fields?.status?.name || 'unknown';
      console.info(`Issue ${key} status: ${status}`);
      const links = await client.getIssueLinks(key);

      const hasBlockedBy = links.some((l: any) => {
        const inward = l.inwardIssue?.key;
        const outward = l.outwardIssue?.key;
        const typeName = l.type?.name || '';
        return (
          inward === blocker || outward === blocker ||
          typeName.toLowerCase().includes('block')
        );
      });

      if (!hasBlockedBy) {
        console.info(`Would link ${key} -> ${blocker} as 'is blocked by' (linkType=${linkType})${dryRun ? ' [dry-run]' : ''}`);
        if (!dryRun) {
          // Decide which side to put blocker on
          if (blockerSide === 'inward') {
            // inwardIssue = blocker, outwardIssue = issue
            await client.createIssueLink(blocker, key, linkType);
          } else {
            // outwardIssue = blocker, inwardIssue = issue
            await client.createIssueLink(key, blocker, linkType);
          }
          console.info(`Linked ${key} -> ${blocker}`);
        }
      } else {
        console.info(`${key} already linked to ${blocker}`);
      }
    }
  } catch (err: any) {
    console.error('Error while ensuring links:', err?.message || err);
    process.exitCode = 1;
  }
}

// Only run main when executed directly
declare const require: any;
if (typeof require !== 'undefined' && require.main === module) {
  main();
}
