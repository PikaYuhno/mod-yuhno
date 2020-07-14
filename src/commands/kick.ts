import { Client, Message, Permissions, GuildMember } from "discord.js";
import { Constants } from "../utils/utils";
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
export default class Kick {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.KICK_MEMBERS;
    public _category: string = "moderation";

    public _help: string = "Kicks a user";
    public _example: Array<string> = [
        "kick [mention|id]",
        "kick [mention|id] [reason]",
    ];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        if (this._args.length === 0) {
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required paramenters.`
            );
        }
        const user =
            this._message.mentions.members.first() ||
            this._message.guild.members.cache.get(this._args[0]);
        this._args.shift();
        const reason: string = this._args.join(" ") || "No reason provided";
        if (!user)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} User was not found.`
            );

        const kickedMember: GuildMember = await user.kick(reason);
        this._message.channel.send(
            `${Constants.PREFIX_SUCCESS} ${kickedMember.user.tag} was successfully kicked!`
        );
    }
}

