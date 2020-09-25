import { Client, Message, Permissions, GuildMember, User } from "discord.js";
import { Constants } from "../../utils/";
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
export default class Ban {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.BAN_MEMBERS;
    public _category: string = "moderation";

    public _help: string = "Bans a user";
    public _example: Array<string> = [
        "ban [mention|id]",
        "ban [mention|id] [reason]",
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
            this._message.mentions.users.first() ||
            this._client.users.cache.get(this._args[0]);
        this._args.shift();
        const reason = this._args.join(" ") || "No reason provided";

        if (!user)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} User was not found.`
            );
        try {
            await this._message.guild.members.ban(user, { reason });
        } catch (error) {
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} I don't have the permissions to do that!`
            );
        }
        this._message.channel.send(
            `${Constants.PREFIX_SUCCESS} ${user.tag} was successfully banned!`
        );
    }
}

