import { vi, describe, test, expect, beforeEach } from 'vitest';
import { main as blockMain } from './blockLink';
import { JiraClient } from './jiraClient';

vi.mock('./jiraClient');
const MockClient = JiraClient as unknown as any;

describe('blockLink action', () => {
  beforeEach(() => {
    process.env.INPUT_JQL = 'project=INK';
    process.env.INPUT_BLOCKER = 'INK-91';
    process.env.INPUT_DRYRUN = 'true';
    MockClient.mockClear?.();
  });

  test('does nothing when no issues', async () => {
    const mockInstance: any = { searchAllIssues: vi.fn().mockResolvedValue([]) };
    MockClient.mockImplementation(() => mockInstance);
    await blockMain();
    expect(mockInstance.searchAllIssues).toHaveBeenCalled();
  });

  test('links when issue missing blocker and dryRun=false', async () => {
    const mockInstance: any = {
      searchAllIssues: vi.fn().mockResolvedValue([{ key: 'INK-1', fields: {} }]),
      getIssueLinks: vi.fn().mockResolvedValue([]),
      createIssueLink: vi.fn().mockResolvedValue(undefined),
    };
    MockClient.mockImplementation(() => mockInstance);
    process.env.INPUT_DRYRUN = 'false';
    await blockMain();
    expect(mockInstance.createIssueLink).toHaveBeenCalled();
  });

  test('skips linking when hasBlockedBy true', async () => {
    const mockInstance: any = {
      searchAllIssues: vi.fn().mockResolvedValue([{ key: 'INK-2', fields: {} }]),
      getIssueLinks: vi.fn().mockResolvedValue([{ outwardIssue: { key: 'INK-91' } }]),
      createIssueLink: vi.fn().mockResolvedValue(undefined),
    };
    MockClient.mockImplementation(() => mockInstance);
    process.env.INPUT_DRYRUN = 'false';
    await blockMain();
    expect(mockInstance.createIssueLink).not.toHaveBeenCalled();
  });

  test('uses inward blockerSide when configured', async () => {
    const mockInstance: any = {
      searchAllIssues: vi.fn().mockResolvedValue([{ key: 'INK-3', fields: {} }]),
      getIssueLinks: vi.fn().mockResolvedValue([]),
      createIssueLink: vi.fn().mockResolvedValue(undefined),
    };
    MockClient.mockImplementation(() => mockInstance);
    process.env.INPUT_DRYRUN = 'false';
    process.env.INPUT_BLOCKERSIDE = 'inward';
    await blockMain();
    expect(mockInstance.createIssueLink).toHaveBeenCalledWith('INK-91', 'INK-3', expect.any(String));
  });

  test('processes multiple issues', async () => {
    const mockInstance: any = {
      searchAllIssues: vi.fn().mockResolvedValue([{ key: 'INK-4', fields: {} }, { key: 'INK-5', fields: {} }]),
      getIssueLinks: vi.fn().mockResolvedValue([]),
      createIssueLink: vi.fn().mockResolvedValue(undefined),
    };
    MockClient.mockImplementation(() => mockInstance);
    process.env.INPUT_DRYRUN = 'false';
    await blockMain();
    expect(mockInstance.createIssueLink).toHaveBeenCalledTimes(2);
  });

  test('handles searchAllIssues throwing', async () => {
    const mockInstance: any = { searchAllIssues: vi.fn().mockRejectedValue(new Error('boom')) };
    MockClient.mockImplementation(() => mockInstance);
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await blockMain();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('uses defaults and shows dry-run message', async () => {
    const mockInstance: any = {
      searchAllIssues: vi.fn().mockResolvedValue([{ key: 'INK-6', fields: {} }]),
      getIssueLinks: vi.fn().mockResolvedValue([]),
      createIssueLink: vi.fn().mockResolvedValue(undefined),
    };
    MockClient.mockImplementation(() => mockInstance);
    delete process.env.INPUT_LINKTYPE;
    delete process.env.INPUT_BLOCKERSIDE;
    process.env.INPUT_DRYRUN = 'true';
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    await blockMain();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('[dry-run]'));
    spy.mockRestore();
  });
});
