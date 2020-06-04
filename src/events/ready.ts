import { Client } from 'discord.js';
import { loadConfiguration, verifyDatabase } from '../utils/utils';
export default async (client: Client) => {
    await verifyDatabase(client);
    await loadConfiguration(client);
    console.log(`Logged in as ${client.user.tag}`);
}
