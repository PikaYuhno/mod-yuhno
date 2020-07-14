import { Client, Message, MessageEmbed, GuildMember, User } from "discord.js";
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
export default class Guilds {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = "BOT_OWNER";
    public _category: string = "OWNER";

    public _help: string = "List all guilds in which the bot is in";
    public _example: Array<string> = ["guilds"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        let guilds = this._client.guilds.cache;
        for (let guild of guilds.values()) {
            const embed = new MessageEmbed()
                .setTitle(guild.name)
                .setDescription(
                    `
                ${Constants.BULLET_POINT} Guild ID: **${guild.id}**
                ${Constants.BULLET_POINT} Owner ID: **${guild.ownerID}**
                ${Constants.BULLET_POINT} Member count: **${
                        guild.members.cache.filter((member) => member.user.bot)
                            .size
                    }**
            `
                )
                .setThumbnail(guild.iconURL());
            this._message.channel.send(embed);
        }
    }
}
