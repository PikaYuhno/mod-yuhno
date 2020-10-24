import { Client, Message, Permissions, GuildMember, User } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Softban implements Command {
    public requiredPermission: number = Permissions.FLAGS.BAN_MEMBERS;

    public _name: string = "softban";
    public _category: string = "moderation";
    public _help: string = "Bans a user and then unbanns him";
    public _example: Array<string> = [
        "softban [mention|id]",
        "softban [mention|id] [reason]",
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
            await message.guild.members.unban(user, "Unban Softban");
        } catch (error) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Something went wrong...`
            );
        }
        message.channel.send(
            `${Constants.PREFIX_SUCCESS} ${user.tag} was successfully softbanned!`
        );
    }
}
