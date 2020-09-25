import { Client, Message, Permissions, GuildMember } from "discord.js";
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
        console.log(
            "Bot's permissions:",
            this._message.member.guild.me.permissions
        );
        console.log("User's permissions:", this._message.member.permissions);

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

        let kickedMember: GuildMember;
        try {
            kickedMember = await user.kick(reason);
        } catch (error) {
            console.error(error);
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} I don't have the permissions to do that!`
            );
        }
        this._message.channel.send(
            `${Constants.PREFIX_SUCCESS} ${kickedMember.user.tag} was successfully kicked!`
        );
    }
}
