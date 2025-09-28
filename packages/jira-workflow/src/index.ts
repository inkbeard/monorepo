import { JiraClient } from './jiraClient';
import { getJqlQuery } from './jql';
import { JiraTicket } from './types';

async function main() {
    const jiraClient = new JiraClient();

    try {
        await jiraClient.authenticate();

        const jqlQuery = getJqlQuery();
        const tickets: JiraTicket[] = await jiraClient.searchAllIssues(jqlQuery);

        for (const ticket of tickets) {
            const idOrKey = (ticket as any).key || (ticket as any).id;
            const status = await jiraClient.getTicketStatus(idOrKey);
            console.log(`Ticket ${idOrKey}: ${status}`);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        process.exitCode = 1;
    }
}

main();
