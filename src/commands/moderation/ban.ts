import { Client, Message, Permissions, GuildMember, User } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Ban implements Command {
    public requiredPermission: number = Permissions.FLAGS.BAN_MEMBERS;
    public _name: string = "ban";
    public _category: string = "moderation";
    public _help: string = "Bans a user";
    public _example: Array<string> = [
        "ban [mention|id]",
        "ban [mention|id] [reason]",
    ];

    public async run(client: Client, args: Array<string>, message: Message) {
        if (args.length === 0) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required paramenters.`
            );
        }
        const user =
            message.mentions.users.first() || client.users.cache.get(args[0]);
        args.shift();
        const reason = args.join(" ") || "No reason provided";

        if (!user)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} User was not found.`
            );
        try {
            await message.guild.members.ban(user, { reason });
        } catch (error) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} I don't have the permissions to do that!`
            );
        }
        message.channel.send(
            `${Constants.PREFIX_SUCCESS} ${user.tag} was successfully banned!`
        );
    }
}
