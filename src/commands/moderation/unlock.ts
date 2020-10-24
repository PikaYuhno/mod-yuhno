import { Client, Message, Permissions, GuildMember, User } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Unlock implements Command {
    public requiredPermission: number = Permissions.FLAGS.MANAGE_CHANNELS;
    public _name: string = "unlock";
    public _category: string = "moderation";
    public _help: string = "Unlocks a locked textchannel";
    public _example: Array<string> = ["unlock", "unlock [channelid|"];

    public async run(client: Client, args: Array<string>, message: Message) {
        const channelId = args[0] || message.channel.id;
        const channel = message.guild.channels.cache.get(channelId);
        if (!channel)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Channel not found!`
            );
        try {
            channel.overwritePermissions([
                {
                    id: message.guild.id,
                    allow: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
            ]);
        } catch (error) {
            console.error(error);
            message.channel.send(
                `${Constants.PREFIX_FAILURE} Something went wrong! Error: ${error}`
            );
        }
        message.channel.send(
            `${Constants.PREFIX_SUCCESS} Successfully unlocked channel **${channel.name}**!`
        );
    }
}
