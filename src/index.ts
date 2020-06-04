import { Client, Message } from 'discord.js';
const client = new Client();
import env from 'dotenv';
env.config();
import fs from 'fs';
import path from 'path';
(() => {
    fs.readdir(path.resolve(__dirname, 'events'), async (err, files) => {
        if (err) throw err;
        for (let i = 0; i < files.length; i++) {
            type EventType = "guildCreate" | "message" | "messageDelete" | "messageUpdate" | "ready";
            let eventName: EventType = <EventType>files[i].split(".")[0];
            let action = (await import(`./events/${eventName}`)).default;
            client.on(eventName, action.bind(null, client));
        }
    })
})()


client.login(process.env.CLIENT_TOKEN);