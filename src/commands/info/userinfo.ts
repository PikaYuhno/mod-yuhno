import { Client, Message, Permissions, MessageEmbed } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Userinfo implements Command {
    public requiredPermission: number = Permissions.FLAGS.SEND_MESSAGES;
    public _name: string = "userinfo";
    public _category: string = "info";
    public _help: string = "Shows info about a user";
    public _example: Array<string> = ["userinfo", "userinfo [mention|id]"];

    public async run(client: Client, args: Array<string>, message: Message) {
        let user =
            message.mentions.users.first() || client.users.cache.get(args[0]);
        if (args.length === 0 && !user) user = message.author;
        if (!user)
            return message.channel.send(
                Constants.PREFIX_FAILURE + " User not found!"
            );
        const guildMember = message.guild.members.cache.get(user.id);
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

        message.channel.send(embed);
    }
}
