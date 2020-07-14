import { Client, Message, Permissions, GuildMember, User } from "discord.js";
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
export default class Unban {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.BAN_MEMBERS;
    public _category: string = "moderation";

    public _help: string = "Unbans a user";
    public _example: Array<string> = [
        "unban [mention|id]",
        "unban [mention|id] [reason]",
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
        if (!user)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} User was not found.`
            );

        const bannedUser: User = await this._message.guild.members.unban(user);

        this._message.channel.send(
            `${Constants.PREFIX_SUCCESS} ${bannedUser.id} was successfully unbanned!`
        );
    }
}

