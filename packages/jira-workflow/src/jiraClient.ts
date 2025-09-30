import axios from 'axios';

export class JiraClient {
  private baseUrl: string;

  private email?: string;

  private apiToken?: string;

  private apiVersion: string = '3';

  constructor() {
    this.baseUrl = process.env.JIRA_BASE_URL || '';
    this.email = process.env.JIRA_EMAIL;
    this.apiToken = process.env.JIRA_API_TOKEN;
  }

  async authenticate() {
    if (!this.baseUrl || !this.email || !this.apiToken) {
      const msg = 'JIRA_BASE_URL, JIRA_EMAIL and JIRA_API_TOKEN must be provided';

      // If running inside GitHub Actions, emit an annotation so it appears in the UI
      if (process.env.GITHUB_ACTIONS) {
        console.log(`::error::${msg}`);
      } else {
        // Fall back to a red console message locally
        const red = '\x1b[31m';
        const reset = '\x1b[0m';

        console.error(`${red}${msg}${reset}`);
      }
      throw new Error(msg);
    }
    // Always use Jira Cloud REST v3 for this action
    this.apiVersion = '3';
    try {
      const url = `${this.baseUrl}/rest/api/3/serverInfo`;
      const resp = await axios.get(url, {
        auth: { username: this.email!, password: this.apiToken! },
        headers: { Accept: 'application/json' },
      });

      if (resp.status !== 200) {
        throw new Error(`serverInfo returned ${resp.status}`);
      }
    } catch (err: any) {
      const note = 'This action requires Jira Cloud REST API v3. If you run Jira Server/DC, this action will not function.';

      if (axios.isAxiosError(err) && err.response) {
        console.error('Jira serverInfo check failed', { status: err.response.status, data: err.response.data });
        throw new Error(`Unable to reach Jira Cloud v3 serverInfo: ${err.response.status} - ${JSON.stringify(err.response.data)}\n${note}`);
      }
      throw new Error(`${String(err)}\n${note}`);
    }
    console.info('Using Jira REST API v3');

    return true;
  }

  async searchIssues(jql: string) {
    const url = `${this.baseUrl}/rest/api/3/search/jql`;

    console.log(`::debug::Searching Jira with JQL: ${jql}`);

    try {
      // Use GET as in the documentation example; axios will URL-encode the query param
      const resp = await axios.get(url, {
        params: { jql },
        auth: { username: this.email!, password: this.apiToken! },
        headers: { Accept: 'application/json' },
      });
      const data = resp.data || {};
      const issues = data.issues || data.results || data;

      if (Array.isArray(issues) && issues.length > 0) {
        console.log('all issues: ', JSON.stringify(issues));

        try {
          const keys = issues.map((it: any) => it.key || it.id).slice(0, 20);

          console.info(`Jira search returned ${issues.length} result(s): ${JSON.stringify(keys)}`);
        } catch (e) {
          console.info(`Jira search returned ${Array.isArray(issues) ? issues.length : 0} result(s) for JQL: ${jql}`);
        }
      } else {
        console.info(`Jira search returned no results for JQL: ${jql}`);
        try {
          // Print full response payload for debugging (contains total, warnings)
          console.debug('Jira search response payload:', JSON.stringify(data));
        } catch (e) {
          // ignore stringify errors
        }
      }

      return Array.isArray(issues) ? issues : [];
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Jira search failed', {
          status: err.response.status,
          data: err.response.data,
        });
        const messages = err.response.data?.errorMessages || err.response.data || err.message;

        throw new Error(`Jira search failed: ${err.response.status} - ${JSON.stringify(messages)}`);
      }
      throw err;
    }
  }

  /**
   * Fetch all issues for a JQL using cursor pagination (nextPageToken)
   */
  async searchAllIssues(jql: string, maxResults = 100) {
    const url = `${this.baseUrl}/rest/api/3/search/jql`;
    const all: any[] = [];
    let nextPageToken: string | undefined;

    do {
      const params: any = { jql, maxResults };

      if (nextPageToken) params.nextPageToken = nextPageToken;

      const resp = await axios.get(url, {
        params,
        auth: { username: this.email!, password: this.apiToken! },
        headers: { Accept: 'application/json' },
      });
      const data = resp.data || {};
      const issues = data.issues || data.results || [];

      console.info(`Jira search page: returned ${Array.isArray(issues) ? issues.length : 0} issues; total=${data.total ?? 'unknown'}; nextPageToken=${data.nextPageToken ?? 'none'}`);

      if (Array.isArray(issues) && issues.length) all.push(...issues);

      nextPageToken = data.nextPageToken;
      // safety: break if API doesn't provide nextPageToken but returned fewer than requested
      if (!nextPageToken && Array.isArray(issues) && issues.length < maxResults) break;
    } while (nextPageToken);

    if (all.length === 0) {
      console.info(`Jira search returned no results for JQL: ${jql}`);
    } else {
      const keys = all.map((it: any) => it.key || it.id).slice(0, 20);

      console.info(`Jira search total collected ${all.length} issue(s). Showing up to 20 keys: ${JSON.stringify(keys)}`);
    }

    return all;
  }

  async getTicketStatus(key: string) {
    const url = `${this.baseUrl}/rest/api/${this.apiVersion}/issue/${key}`;

    try {
      const resp = await axios.get(url, {
        auth: { username: this.email!, password: this.apiToken! },
        headers: { Accept: 'application/json' },
      });

      return resp.data.fields.status.name;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Jira getTicketStatus failed', {
          status: err.response.status,
          data: err.response.data,
        });
        const messages = err.response.data?.errorMessages || err.response.data || err.message;

        throw new Error(`Jira getTicketStatus failed: ${err.response.status} - ${JSON.stringify(messages)}`);
      }
      throw err;
    }
  }

  async getLinkedIssues(key: string) {
    const url = `${this.baseUrl}/rest/api/${this.apiVersion}/issue/${key}`;

    try {
      const resp = await axios.get(url, {
        auth: { username: this.email!, password: this.apiToken! },
        headers: { Accept: 'application/json' },
      });

      console.log('::debug:: Issue fields: ', JSON.stringify(resp.data.fields.issuelinks));

      return resp.data.fields.issuelinks;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Jira getLinkedIssues failed', {
          status: err.response.status,
          data: err.response.data,
        });
        const messages = err.response.data?.errorMessages || err.response.data || err.message;

        throw new Error(`Jira getLinkedIssues failed: ${err.response.status} - ${JSON.stringify(messages)}`);
      }
      throw err;
    }
  }
}
