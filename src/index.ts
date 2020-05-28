import { Client, Message } from 'discord.js';
const client = new Client();
import env from 'dotenv';
env.config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg: Message) => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(process.env.CLIENT_TOKEN);