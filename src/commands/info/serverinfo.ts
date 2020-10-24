import { Guild, Client, Message, MessageEmbed, Permissions } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class ServerInfo implements Command {
    public requiredPermission: number = Permissions.FLAGS.SEND_MESSAGES;
    public _name: string = "serverinfo";
    public _category: string = "info";
    public _help: string = "Shows info about a server";
    public _example: Array<string> = ["serverinfo"];

    public async run(client: Client, args: Array<string>, message: Message) {
        const guild: Guild = message.guild;
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
        message.channel.send(embed);
    }
}
