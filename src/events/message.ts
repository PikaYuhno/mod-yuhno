import { Message, Client } from 'discord.js';
import fs from 'fs';
import path from 'path';
//TODO: Check if command actually exists
export default async (client: Client, message: Message) => {
    console.log("-----------Messge------------\n");
    if (message.author.bot) return;
    let prefix = client['guildConfig'].get(message.guild.id).prefix;
    console.log("Prefix:", prefix);
    console.log("Config", client['guildConfig'].get(message.guild.id));
    if (!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/\s+/g);
    let cmd = args.shift().toLowerCase();
    console.log("Command:", cmd, "Args:", args);
    const Command = (await import(`../commands/${cmd}`)).default;
    const c = new Command(client, args, message);
    if ((typeof c.requiredPermission !== 'string' && message.member.hasPermission(c.requiredPermission))
        || typeof c.requiredPermission === 'string' && c.requiredPermission === 'BOT_OWNER') {
        c.run();
    }
}