import { Client, Message, Permissions, MessageEmbed } from "discord.js";
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

export default class Userinfo {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.SEND_MESSAGES;
    public _category: string = "info";

    public _help: string = "Shows info about a user";
    public _example: Array<string> = ["userinfo", "userinfo [mention|id]"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        let user =
            this._message.mentions.users.first() ||
            this._client.users.cache.get(this._args[0]);
        if (this._args.length === 0 && !user) user = this._message.author;
        if (!user)
            return this._message.channel.send(
                Constants.PREFIX_FAILURE + " User not found!"
            );
        const guildMember = this._message.guild.members.cache.get(user.id);
        const bp = Constants.BULLET_POINT;
        let userInfo = `
        ${bp} Discord ID: **${user.id}**
        ${bp} Roles: ${guildMember.roles.cache
            .map((role) => {
                return `\`${role.name}\``;
            })
            .join(" ")} 
        ${bp} Guild Join Date: **${guildMember.joinedAt}**
        ${bp} Status: **${
            guildMember.presence.status === "dnd"
                ? "DO_NOT_DISTURB"
                : guildMember.presence.status.toUpperCase()
        }**
        `;

        const embed = new MessageEmbed()
            .setColor(guildMember.displayHexColor)
            .setTitle(user.tag)
            .setThumbnail(user.avatarURL())
            .setDescription(userInfo);

        this._message.channel.send(embed);
    }
}
