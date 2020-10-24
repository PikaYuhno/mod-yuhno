import { Client, Message, Permissions, GuildMember, User } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Unban implements Command {
    public requiredPermission: number = Permissions.FLAGS.BAN_MEMBERS;
    public _name: string = "unban";
    public _category: string = "moderation";
    public _help: string = "Unbans a user";
    public _example: Array<string> = [
        "unban [mention|id]",
        "unban [mention|id] [reason]",
    ];

    public async run(client: Client, args: Array<string>, message: Message) {
        if (args.length === 0) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required paramenters.`
            );
        }
        const user =
            message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} User was not found.`
            );

        const bannedUser: User = await message.guild.members.unban(user);

        message.channel.send(
            `${Constants.PREFIX_SUCCESS} ${bannedUser.id} was successfully unbanned!`
        );
    }
}
