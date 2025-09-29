import axios from 'axios';
import { JiraClient } from './jiraClient';

import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
vi.mock('axios');
const mockedAxios = axios as any;

describe('JiraClient error and edge paths', () => {
  afterEach(() => {
    delete process.env.JIRA_BASE_URL;
    delete process.env.JIRA_EMAIL;
    delete process.env.JIRA_API_TOKEN;
    vi.restoreAllMocks();
  });

  test('authenticate throws when env missing and logs', async () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const c = new JiraClient();
    await expect(c.authenticate()).rejects.toThrow(/must be provided/);
    spy.mockRestore();
  });

  test('authenticate handles axios error with response', async () => {
    process.env.JIRA_BASE_URL = 'https://example.atlassian.net';
    process.env.JIRA_EMAIL = 'me@example.com';
    process.env.JIRA_API_TOKEN = 'token';

    const err = { response: { status: 410, data: { errorMessages: ['migrate'] } } } as any;
    mockedAxios.get.mockRejectedValueOnce(err);
  vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const c = new JiraClient();
    await expect(c.authenticate()).rejects.toThrow(/Unable to reach Jira Cloud v3/);
  });

  test('searchIssues returns empty array when no issues and logs debug', async () => {
    process.env.JIRA_BASE_URL = 'https://example.atlassian.net';
    process.env.JIRA_EMAIL = 'me@example.com';
    process.env.JIRA_API_TOKEN = 'token';

    mockedAxios.get.mockResolvedValueOnce({ data: {} });
    const c = new JiraClient();
    const res = await c.searchIssues('project=INK');
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(0);
  });

  test('searchIssues throws with axios response error messages', async () => {
    process.env.JIRA_BASE_URL = 'https://example.atlassian.net';
    process.env.JIRA_EMAIL = 'me@example.com';
    process.env.JIRA_API_TOKEN = 'token';

    const err = { response: { status: 400, data: { errorMessages: ['bad jql'] } } } as any;
    mockedAxios.get.mockRejectedValueOnce(err);
  vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const c = new JiraClient();
    await expect(c.searchIssues('bad')).rejects.toThrow(/Jira search failed/);
  });

  test('searchAllIssues returns empty when no issues in first page', async () => {
    process.env.JIRA_BASE_URL = 'https://example.atlassian.net';
    process.env.JIRA_EMAIL = 'me@example.com';
    process.env.JIRA_API_TOKEN = 'token';

    mockedAxios.get.mockResolvedValueOnce({ data: { issues: [], total: 0 } });
    const c = new JiraClient();
    const res = await c.searchAllIssues('project=INK');
    expect(res).toEqual([]);
  });

  test('getTicketStatus throws with axios error response', async () => {
    process.env.JIRA_BASE_URL = 'https://example.atlassian.net';
    process.env.JIRA_EMAIL = 'me@example.com';
    process.env.JIRA_API_TOKEN = 'token';

    const err = { response: { status: 404, data: { errorMessages: ['not found'] } } } as any;
    mockedAxios.get.mockRejectedValueOnce(err);
  vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const c = new JiraClient();
    await expect(c.getTicketStatus('NOPE')).rejects.toThrow(/Jira getTicketStatus failed/);
  });
});
