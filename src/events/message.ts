import { Message, Client } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import { Constants } from "../utils/utils";

export default async (client: Client, message: Message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    console.log("-----------Messge------------\n");
    let prefix = client["guildConfig"].get(message.guild.id).prefix;
    console.log("Prefix:", prefix);
    console.log("Config", client["guildConfig"].get(message.guild.id));

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(
        `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content))
        return message.reply(
            `My Prefix is \`${prefix}\`, try \`${prefix}help\` for more information`
        );

    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/\s+/g);
    let cmd = args.shift().toLowerCase();

    //Check if command exist
    if (!client["commands"].find((c) => c.name === cmd)) return;

    console.log("Command:", cmd, "Args:", args);
    const Command = (await import(`../commands/${cmd}`)).default;
    const c = new Command(client, args, message);
    if (
        (typeof c.requiredPermission !== "string" &&
            message.member.hasPermission(c.requiredPermission)) ||
        (typeof c.requiredPermission === "string" &&
            c.requiredPermission === "BOT_OWNER" &&
            process.env.BOT_OWNER === message.author.id)
    ) {
        c.run();
    } else {
        console.log("Dont' have permissnio");
        return message.channel.send(
            `${Constants.PREFIX_FAILURE} You don't have the permission to execute this command!`
        );
    }
};
