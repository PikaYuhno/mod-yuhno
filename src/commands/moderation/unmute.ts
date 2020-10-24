import { Client, Message, Permissions } from "discord.js";
import { Constants, unMuteUser } from "../../utils/";
import Command from "../Command";

export default class Unmute implements Command {
    public requiredPermission: number = Permissions.FLAGS.MUTE_MEMBERS;
    public _name: string = "unmute";
    public _category: string = "moderation";
    public _help: string = "Unmutes a user";
    public _example: Array<string> = ["unmute [mention|id]"];

    public async run(client: Client, args: Array<string>, message: Message) {
        if (args.length <= 0) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required paramenters!`
            );
        }
        const guildMember =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);
        args.shift();
        if (!guildMember)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} User not found!`
            );

        const mutedRole = message.guild.roles.cache.find(
            (role) => role.name === "Muted"
        );
        if (!mutedRole) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} No Muted role exists! (Consult help for usage info)`
            );
        }

        if (!guildMember.roles.cache.find((r) => r.id === mutedRole.id)) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} ${guildMember.user.tag} is not muted!`
            );
        }
        unMuteUser(mutedRole.id, guildMember, message.guild.id);
        message.channel.send(
            `${Constants.PREFIX_SUCCESS} Successfully unmuted **${guildMember.user.tag}**!`
        );
    }
}
