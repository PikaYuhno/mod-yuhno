import { Client, Message, Permissions, GuildMember } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Kick implements Command {
    public requiredPermission: number = Permissions.FLAGS.KICK_MEMBERS;
    public _name: string = "kick";
    public _category: string = "moderation";
    public _help: string = "Kicks a user";
    public _example: Array<string> = [
        "kick [mention|id]",
        "kick [mention|id] [reason]",
    ];

    public async run(client: Client, args: Array<string>, message: Message) {
        console.log("Bot's permissions:", message.member.guild.me.permissions);
        console.log("User's permissions:", message.member.permissions);

        if (args.length === 0) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required paramenters.`
            );
        }
        const user =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);
        args.shift();
        const reason: string = args.join(" ") || "No reason provided";
        if (!user)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} User was not found.`
            );

        let kickedMember: GuildMember;
        try {
            kickedMember = await user.kick(reason);
        } catch (error) {
            console.error(error);
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} I don't have the permissions to do that!`
            );
        }
        message.channel.send(
            `${Constants.PREFIX_SUCCESS} ${kickedMember.user.tag} was successfully kicked!`
        );
    }
}
