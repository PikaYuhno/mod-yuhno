import { Message, Client, TextChannel } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import { Constants } from "../utils/utils";

export default async (
    client: Client,
    oldMessage: Message,
    newMessage: Message
) => {
    if (newMessage.author.bot) return;
    if (!newMessage.guild) return;
    if (oldMessage.content === newMessage.content) return;
    let guildConfig = client["guildConfig"].get(newMessage.guild.id);
    if (!guildConfig) return;
    if (!guildConfig["message_log"]) return;
    const channel = <TextChannel>(
        newMessage.guild.channels.cache.get(guildConfig["message_log"])
    );
    if (!channel) return;

    let currentDate = new Date(Date.now());
    let date = `\`[${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}]\``;

    let msg = `${date} ${Constants.UPDATED} **${newMessage.author.tag}** (ID: ${newMessage.author.id}) __edited__ a message in <#${newMessage.channel.id}>:\n\n`;
    msg += `**From:** \`${oldMessage.content}\`\n`;
    msg += `**To:** \`${newMessage.content}\``;
    channel.send(msg);
};
