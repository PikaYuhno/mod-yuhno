import { Client, Message, Permissions, GuildMember, User } from "discord.js";
import { Constants } from "../utils/utils";
import Configuration from "../database/models/Configuration";
//Command:
/**
 * private _client: Client;
 * private _cmd: string;
 * private _args: Array<string>;
 * private _message: Message;
 * private _permission: Permissions;
 * private _help: string;
 * private _examples: Array<string>;
 *
 * public async run();
 */
export default class Mute {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.MUTE_MEMBERS;
    public _category: string = "moderation";

    public _help: string = "Mutes a user";
    public _example: Array<string> = ["mute [mention|id] [reason]"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        if (this._args.length <= 0) {
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required paramenters!`
            );
        }
        const guildMember =
            this._message.mentions.members.first() ||
            this._message.guild.members.cache.get(this._args[0]);
        if (!guildMember)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} User not found!`
            );

        const mutedRole = this._message.guild.roles.cache.find(
            (role) => role.name === "Muted"
        );
        if (!mutedRole) {
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} No Muted role exists! (Consult help for usage info)`
            );
        }

        if (guildMember.roles.cache.find((r) => r.id === mutedRole.id)) {
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} ${guildMember.user.tag} is already muted!`
            );
        }
    }
}