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
export default class Lock {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.MANAGE_CHANNELS;
    public _category: string = "moderation";

    public _help: string = "Locks a textchannel";
    public _example: Array<string> = ["lock [channelid|"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        const channelId = this._args[0];
        const channel = this._message.guild.channels.cache.get(channelId);
        if (!channel)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Channel not found!`
            );
        try {
            channel.overwritePermissions([
                {
                    id: this._message.guild.id,
                    deny: ["ADD_REACTIONS", "SEND_MESSAGES"],
                },
            ]);
        } catch (error) {
            console.error(error);
            this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Something went wrong! Error: ${error}`
            );
        }
        this._message.channel.send(
            `${Constants.PREFIX_SUCCESS} Successfully locked channel **${channel.name}**!`
        );
    }
}
