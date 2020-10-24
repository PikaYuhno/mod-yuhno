import { Client, Message, Permissions } from "discord.js";
import { Constants, loadConfiguration } from "../../utils/";
import GuildConfig from "../../database/models/GuildConfig";
import Command from "../Command";

export default class MessageLog implements Command {
    public requiredPermission: number = Permissions.FLAGS.MANAGE_CHANNELS;
    public _name: string = "messagelog";
    public _category: string = "configuration";
    public _help: string = "Sets the channel for the message log";
    public _example: Array<string> = ["messagelog [channelid|"];

    public async run(client: Client, args: Array<string>, message: Message) {
        const channelId = args[0];
        const channel = message.guild.channels.cache.get(channelId);
        if (!channel)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Channel not found!`
            );
        else if (channel.type !== "text")
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Channel has to be a text channel`
            );
        const currentConfig = await GuildConfig.findOne({
            where: { guildId: message.guild.id },
        });
        const newConfig = JSON.parse(currentConfig.config);
        newConfig["message_log"] = channelId;
        console.log("new Config:", newConfig);
        await GuildConfig.update(
            { config: JSON.stringify(newConfig) },
            { where: { guildId: message.guild.id } }
        );
        loadConfiguration(client);

        message.channel.send(
            `${Constants.PREFIX_SUCCESS} Message Logs will now be sent in <#${channel.id}> !`
        );
    }
}
