import { Client, Message, MessageEmbed, Permissions } from "discord.js";
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
export default class Settings {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.ADMINISTRATOR;
    public _category: string = "info";

    public _help: string = "Shows the current settings";
    public _example: Array<string> = ["settings"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        const guildConfig = this._client["guildConfig"].get(
            this._message.guild.id
        );
        const prefix = guildConfig["prefix"];
        const msgLog = guildConfig["message_log"];
        const embed = new MessageEmbed().setTitle("Settings").setDescription(`
            ${Constants.BULLET_POINT} Prefix: \`${prefix}\`
            ${Constants.BULLET_POINT} Message Log: ${
            msgLog ? `<#${msgLog}>` : "**None**"
        }
            `);
        this._message.channel.send(embed);
    }
}
