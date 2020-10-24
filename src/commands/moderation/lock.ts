import { Client, Message, Permissions, GuildMember, User } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Lock implements Command {
    public requiredPermission: any = Permissions.FLAGS.MANAGE_CHANNELS;
    public _name: string = "lock";
    public _category: string = "moderation";
    public _help: string = "Locks a textchannel";
    public _example: Array<string> = ["lock [channelid|"];

    public async run(client: Client, args: Array<string>, message: Message) {
        const channelId = args[0];
        const channel = message.guild.channels.cache.get(channelId);
        if (!channel)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Channel not found!`
            );
        try {
            channel.overwritePermissions([
                {
                    id: message.guild.id,
                    deny: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
            ]);
        } catch (error) {
            console.error(error);
            message.channel.send(
                `${Constants.PREFIX_FAILURE} Something went wrong! Error: ${error}`
            );
        }
        message.channel.send(
            `${Constants.PREFIX_SUCCESS} Successfully locked channel **${channel.name}**!`
        );
    }
}
