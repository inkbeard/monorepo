import { JiraClient } from './jiraClient';
import { getJqlQuery } from './jql';
import { JiraTicket } from './types';

export async function main() {
    const jiraClient = new JiraClient();

    try {
        await jiraClient.authenticate();

        const jqlQuery = getJqlQuery();
        if (!jqlQuery) {
            console.error('No JQL provided via input `jql` or JQL env var');
            process.exitCode = 1;
            return;
        }

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

// Only run main if this file is executed directly
declare const require: any;
if (typeof require !== 'undefined' && require.main === module) {
    main();
}
