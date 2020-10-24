import { Client, Message, MessageEmbed } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Guilds implements Command {
    public requiredPermission: string = "BOT_OWNER";

    public _name: string = "guilds";
    public _category: string = "OWNER";
    public _help: string = "List all guilds in which the bot is in";
    public _example: Array<string> = ["guilds"];

    public async run(client: Client, args: Array<string>, message: Message) {
        let guilds = client.guilds.cache;
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
                    }**`
                )
                .setThumbnail(guild.iconURL());
            message.channel.send(embed);
        }
    }
}
