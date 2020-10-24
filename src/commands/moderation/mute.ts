import { Client, Message, Permissions, GuildMember, Role } from "discord.js";
import {
    Constants,
    timeConverter,
    runCronJob,
    dateToPattern,
} from "../../utils/";
import Command from "../Command";

export default class Mute implements Command {
    public requiredPermission: any = Permissions.FLAGS.MUTE_MEMBERS;
    public _name: string = "mute";
    public _category: string = "moderation";
    public _help: string = "Mutes a user";
    public _example: Array<string> = ["mute [mention|id] [reason]"];

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

        if (guildMember.roles.cache.find((r) => r.id === mutedRole.id)) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} ${guildMember.user.tag} is already muted!`
            );
        }

        // $mute @Someone 3d this is a reason
        let argString = args.join(" ");

        if (argString.match(/\d+(w|d|h|min)/g)) {
            // 199min
            let duration = args.shift();
            try {
                console.log("Dur", duration);
                let dateDur: Date = timeConverter(duration);
                let pattern = dateToPattern(dateDur);
                runCronJob(
                    pattern,
                    mutedRole.id,
                    guildMember,
                    message.guild.id
                );
                let reason = args.join(" ") || "No reason was provided";
                this.mute(
                    mutedRole,
                    guildMember,
                    `${Constants.PREFIX_SUCCESS} Successfully muted **${
                        guildMember.user.tag
                    }** until ${dateDur.toUTCString()}`,
                    args,
                    message
                );
            } catch (error) {
                if (error.message === "None") {
                    this.mute(
                        mutedRole,
                        guildMember,
                        `${Constants.PREFIX_SUCCESS} Successfully muted **${guildMember.user.tag}**`,
                        args,
                        message
                    );
                    return;
                }
                message.channel.send(
                    `${Constants.PREFIX_FAILURE} ${error.message}}`
                );
            }
        } else {
            this.mute(
                mutedRole,
                guildMember,
                `${Constants.PREFIX_SUCCESS} Successfully muted **${guildMember.user.tag}**`,
                args,
                message
            );
        }
    }
    private mute(
        mutedRole: Role,
        guildMember: GuildMember,
        msg: string,
        args: Array<string>,
        message: Message
    ) {
        let reason = args.join(" ") || "No reason was provided";
        guildMember.roles.add(mutedRole);
        message.channel.send(msg);
    }
}
