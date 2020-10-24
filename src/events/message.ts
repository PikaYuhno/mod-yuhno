import { Message, Client } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import { Constants } from "../utils/";

export default async (client: Client, message: Message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    let prefix = client["guildConfig"].get(message.guild.id).prefix;

    /**const escapeRegex = (str: string) =>
        str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");*/
    const prefixRegex = new RegExp(`^<@!${client.user.id}>\s*$`);
    if (prefixRegex.test(message.content))
        return message.reply(
            `My Prefix is \`${prefix}\`, try \`${prefix}help\` for more information`
        );

    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/\s+/g);
    let cmd = args.shift().toLowerCase();

    if (!client.commands.get(cmd) || !client.paths.get(cmd)) return;

    const Command = (await import(client.paths.get(cmd))).default;
    const c = new Command();
    if (
        (typeof c.requiredPermission !== "string" &&
            message.member.hasPermission(c.requiredPermission)) ||
        (typeof c.requiredPermission === "string" &&
            c.requiredPermission === "BOT_OWNER" &&
            process.env.BOT_OWNER === message.author.id)
    ) {
        c.run(client, args, message);
    } else {
        return message.channel.send(
            `${Constants.PREFIX_FAILURE} You don't have the permission to execute this command!`
        );
    }
};
