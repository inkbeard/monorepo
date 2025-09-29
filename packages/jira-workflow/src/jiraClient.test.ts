import { vi, describe, test, expect, beforeEach } from 'vitest';
import axios from 'axios';
import { JiraClient } from './jiraClient';

vi.mock('axios');
const mockedAxios = axios as unknown as { get: any; post: any };

describe('JiraClient', () => {
  beforeEach(() => {
    process.env.JIRA_BASE_URL = 'https://example.atlassian.net';
    process.env.JIRA_EMAIL = 'me@example.com';
    process.env.JIRA_API_TOKEN = 'token';
    mockedAxios.get?.mockReset?.();
    mockedAxios.post?.mockReset?.();
  });

  test('authenticate succeeds when serverInfo returns 200', async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 200, data: {} });
    const c = new JiraClient();
    await expect(c.authenticate()).resolves.toBe(true);
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  test('searchAllIssues paginates and returns issues', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { issues: [{ key: 'INK-1' }], total: 2 } })
      .mockResolvedValueOnce({ data: { issues: [{ key: 'INK-2' }], total: 2 } });

    const c = new JiraClient();
    const issues = await c.searchAllIssues('project=INK');
    expect(issues.length).toBe(2);
  });

  test('getIssueLinks returns links', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { fields: { issuelinks: [{ type: { name: 'Blocks' } }] } } });
    const c = new JiraClient();
    const links = await c.getIssueLinks('INK-1');
    expect(links.length).toBe(1);
  });

  test('createIssueLink posts payload', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 201 });
    const c = new JiraClient();
    await c.createIssueLink('INK-1', 'INK-2', 'Blocks');
    expect(mockedAxios.post).toHaveBeenCalled();
  });
});
