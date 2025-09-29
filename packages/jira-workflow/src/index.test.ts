import { vi, describe, test, expect, beforeEach } from 'vitest';
import { main as indexMain } from './index';
import { JiraClient } from './jiraClient';

vi.mock('./jiraClient');
const MockClient = JiraClient as unknown as { mockClear: () => void; mockImplementation: (fn: any) => void } & any;

describe('index action', () => {
  beforeEach(() => {
    delete process.env.INPUT_JQL;
    delete process.env.JQL;
    MockClient.mockClear?.();
  });

  test('exits when no jql', async () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await indexMain();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('handles client authenticate error', async () => {
    process.env.INPUT_JQL = 'project=INK';
    const mockInstance: any = {
      authenticate: vi.fn().mockRejectedValue(new Error('auth fail')),
    };
    MockClient.mockImplementation(() => mockInstance);
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await indexMain();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('calls client when jql provided', async () => {
    process.env.INPUT_JQL = 'project=INK';
    const mockInstance: any = {
      authenticate: vi.fn().mockResolvedValue(true),
      searchAllIssues: vi.fn().mockResolvedValue([{ key: 'INK-1' }]),
      getTicketStatus: vi.fn().mockResolvedValue('To Do'),
    };
    MockClient.mockImplementation(() => mockInstance);
  const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await indexMain();
    expect(mockInstance.searchAllIssues).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
