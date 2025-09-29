import axios from 'axios';
import { JiraClient } from './jiraClient';

import { vi, describe, test, expect, beforeEach } from 'vitest';
vi.mock('axios');
const mockedAxios = axios as any;

describe('JiraClient success paths', () => {
  beforeEach(() => {
    process.env.JIRA_BASE_URL = 'https://example.atlassian.net';
    process.env.JIRA_EMAIL = 'me@example.com';
    process.env.JIRA_API_TOKEN = 'token';
    mockedAxios.get.mockReset();
  });

  test('searchIssues returns issues when data.issues present', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { issues: [{ key: 'INK-10' }], total: 1 } });
    const c = new JiraClient();
    const res = await c.searchIssues('project=INK');
    expect(Array.isArray(res)).toBe(true);
    expect(res[0].key).toBe('INK-10');
  });

  test('searchIssues returns issues when data.results present', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { results: [{ key: 'INK-11' }] } });
    const c = new JiraClient();
    const res = await c.searchIssues('project=INK');
    expect(res[0].key).toBe('INK-11');
  });

  test('getTicketStatus returns status name on success', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { fields: { status: { name: 'Done' } } } });
    const c = new JiraClient();
    const status = await c.getTicketStatus('INK-10');
    expect(status).toBe('Done');
  });
});
