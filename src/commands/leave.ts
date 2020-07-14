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
export default class Leave {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = "BOT_OWNER";
    public _category: string = "OWNER";

    public _help: string = "Leaves a guild";
    public _example: Array<string> = ["leave [guildid]"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        if (this._args.length === 0) {
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required parameters!`
            );
        }
        const guild = this._client.guilds.cache.get(this._args[0]);
        if (!guild)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Guild not found!`
            );
        guild
            .leave()
            .then((g) => {
                this._message.channel.send(
                    `${Constants.PREFIX_SUCCESS} Successfully left the guild **${g.name}**`
                );
            })
            .catch((err) => {
                this._message.channel.send(
                    `${Constants.PREFIX_FAILURE} Failed to leave server!`
                );
                console.error(err);
            });
    }
}
