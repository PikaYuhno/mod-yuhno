import { Message, Client, TextChannel } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import { Constants } from "../utils/";

export default async (client: Client, deletedMessage: Message) => {
    if (deletedMessage.author.bot) return;
    if (!deletedMessage.guild) return;
    let guildConfig = client["guildConfig"].get(deletedMessage.guild.id);
    if (!guildConfig) return;
    console.log(guildConfig);
    if (!guildConfig["message_log"]) return;
    const channel = <TextChannel>(
        deletedMessage.guild.channels.cache.get(guildConfig["message_log"])
    );
    if (!channel) return;

    let currentDate = new Date(Date.now());
    let date = `\`[${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}]\``;

    let msg = `${date} ${Constants.DELETED} **${deletedMessage.author.tag}** (ID: ${deletedMessage.author.id})'s message has been __deleted__ from <#${deletedMessage.channel.id}>:\n\n`;
    msg += `\`${deletedMessage.content}\``;
    channel.send(msg);
};
