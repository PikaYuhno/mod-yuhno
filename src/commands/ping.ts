import { Client, Message, Permissions } from "discord.js";
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
export default class Ping {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.SEND_MESSAGES;
    public _category: string = "info";

    public _help: string = "Get a bo ping measurement";
    public _example: Array<string> = ["ping"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        const sentMsg: Message = await this._message.channel.send("Pong ?");
        //sentMsg.edit(`Pong! Latency: ${sentMsg.createdTimestamp - this._message.createdTimestamp}ms. Your server configuration: ${JSON.stringify(this._client['guildConfig'].get(this._message.guild.id))}`);
        sentMsg.edit(
            `${Constants.PREFIX_SUCCESS} Pong! Latency: ${
                sentMsg.createdTimestamp - this._message.createdTimestamp
            }ms. API Latency is ${Math.round(this._message.client.ws.ping)}ms`
        );
    }
}

