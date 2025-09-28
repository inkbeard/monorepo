export interface JiraTicket {
  id: string;
  key: string;
  fields: {
    summary?: string;
    status?: { name: string };
  };
}
