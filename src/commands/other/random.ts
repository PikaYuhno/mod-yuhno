import { Client, Message, Permissions } from "discord.js";
import { Constants } from "../../utils/";
import GuildConfig from "../../database/models/GuildConfig";
import Command from "../Command";

export default class Random implements Command {
    public requiredPermission: number = Permissions.FLAGS.SEND_MESSAGES;
    public _name: string = "random";
    public _category: string = "other";
    public _help: string = "Picks a random member";
    public _example: Array<string> = ["random"];

    //TODO:
    // + random config role=roleId perms=[roledId's...]
    public async run(client: Client, args: Array<string>, message: Message) {
        let everyoneRoleId = message.guild.roles.everyone.id;
        if (args[0] === "config") {
            args.shift();
            if (args.length === 0) {
                //return the current configuration.
            }

            const {
                roleId,
                permittedRoleIds,
                invalidRoles,
            } = this.extractConfig(args[0], everyoneRoleId, message);
        }
        let config = (
            await GuildConfig.findOne({
                where: { guildId: message.guild.id },
            })
        ).config;
        let jsonConfig = JSON.parse(config);

        let roleId = jsonConfig.default_role;

        if (!roleId)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Couldn't find the default role!`
            );

        let members = message.guild.members.cache.filter((member) =>
            member.roles.cache.has(roleId)
        );
        let random = Math.floor(Math.random() * Math.floor(members.size));
        let randomUser = null;
        let i = 0;
        for (let memberId of members.keys()) {
            if (i === random) {
                randomUser = memberId;
            }
            i++;
        }
        if (!randomUser)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} There is no random User :P`
            );

        return message.channel.send(
            `${Constants.PREFIX_SUCCESS} Random user is: <@!${randomUser}>`
        );
    }

    public async isRole(roleId: string, message: Message) {
        let role = message.guild.roles.cache.get(roleId);
        if (!role)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Role not found!`
            );
    }
    public extractConfig(
        msg: string,
        everyoneRoleId: string,
        message: Message
    ) {
        const roleId =
            msg.match(/role=\d+/g)[0].replace("role=", "") || everyoneRoleId;
        const permittedRoleIds =
            msg
                .match(/perms=\[\d+(\,\s*\d+)*\]/g)[0]
                .replace("perms=", "")
                .slice(1, -1)
                .replace(/\s/g, "")
                .split(",") || everyoneRoleId;

        const invalidRoles = [];

        const roles = message.guild.roles.cache;
        if (typeof permittedRoleIds !== "string") {
            for (let i = 0; i < permittedRoleIds.length; i++) {
                if (!roles.has(permittedRoleIds[i])) {
                    invalidRoles.push(permittedRoleIds[i]);
                    permittedRoleIds.splice(i, 1);
                }
            }
        }

        return { roleId, permittedRoleIds, invalidRoles };
    }

    public async setConfiguration(
        roldId: string,
        permittedRoleIds: string | Array<string>,
        invalidRoles: Array<string>
    ) {}
}
