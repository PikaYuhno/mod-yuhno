import { Guild, Client, Message, MessageEmbed, Permissions } from "discord.js";
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
export default class ServerInfo {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.SEND_MESSAGES;
    public _category: string = "info";

    public _help: string = "Shows info about a server";
    public _example: Array<string> = ["serverinfo"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        const guild: Guild = this._message.guild;
        const textChannels = guild.channels.cache.filter(
            (c) => c.type === "text"
        ).size;
        const voiceChannels = guild.channels.cache.filter(
            (c) => c.type === "voice"
        ).size;
        const categories = guild.channels.cache.filter(
            (c) => c.type === "category"
        ).size;
        const embed = new MessageEmbed()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL()).setDescription(`
            ${Constants.BULLET_POINT} Guild ID: **${guild.id}**
            ${Constants.BULLET_POINT} Owner: **${guild.owner.user.tag}**
            ${Constants.BULLET_POINT} Creation: **${guild.createdAt}**
            ${Constants.BULLET_POINT} Members: **${guild.memberCount}**
            ${Constants.BULLET_POINT} Channels: **${guild.channels.cache.size}** (${textChannels} Text, ${voiceChannels} Voice, ${categories} Category)
            `);
        this._message.channel.send(embed);
    }
}
