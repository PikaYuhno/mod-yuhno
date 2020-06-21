import { Message, Client } from 'discord.js';
import fs from 'fs';
import path from 'path';
import util from 'util';
const readdir = util.promisify(fs.readdir);

export default async (client: Client, message: Message) => {
    if (message.author.bot) return;
    console.log("-----------Messge------------\n");
    let prefix = client['guildConfig'].get(message.guild.id).prefix;
    console.log("Prefix:", prefix);
    console.log("Config", client['guildConfig'].get(message.guild.id));

    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/\s+/g);
    let cmd = args.shift().toLowerCase();
    try {
        const files = await readdir(path.resolve(__dirname, "../commands"));
        if (!files.map(file => file.split(/\./g)[0]).includes(cmd)) return;
    } catch (error) {
        console.error(error);
    }

    console.log("Command:", cmd, "Args:", args);
    const Command = (await import(`../commands/${cmd}`)).default;
    const c = new Command(client, args, message);
    if ((typeof c.requiredPermission !== 'string' && message.member.hasPermission(c.requiredPermission))
        || typeof c.requiredPermission === 'string' && c.requiredPermission === 'BOT_OWNER') {
        c.run();
    }
}