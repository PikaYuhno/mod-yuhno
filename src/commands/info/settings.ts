import { Client, Message, MessageEmbed, Permissions } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Settings implements Command {
    public requiredPermission: number = Permissions.FLAGS.ADMINISTRATOR;
    public _name: string = "settings";
    public _category: string = "info";
    public _help: string = "Shows the current settings";
    public _example: Array<string> = ["settings"];

    public async run(client: Client, args: Array<string>, message: Message) {
        const guildConfig = client["guildConfig"].get(message.guild.id);
        const prefix = guildConfig["prefix"];
        const msgLog = guildConfig["message_log"];
        const embed = new MessageEmbed().setTitle("Settings").setDescription(`
            ${Constants.BULLET_POINT} Prefix: \`${prefix}\`
            ${Constants.BULLET_POINT} Message Log: ${
            msgLog ? `<#${msgLog}>` : "**None**"
        }
            `);
        message.channel.send(embed);
    }
}
