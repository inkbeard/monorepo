import { JiraClient } from './jiraClient';
import { getJqlQuery } from './jql';
import { JiraTicket } from './types';

async function main() {
    const jiraClient = new JiraClient();

    try {
        await jiraClient.authenticate();

        const jqlQuery = getJqlQuery();
        const tickets: JiraTicket[] = await jiraClient.searchIssues(jqlQuery);

        for (const ticket of tickets) {
            const status = await jiraClient.getTicketStatus(ticket.key);
            console.log(`Ticket ${ticket.key}: ${status}`);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        process.exitCode = 1;
    }
}

main();
