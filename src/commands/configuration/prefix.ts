import { Client, Message, Permissions } from "discord.js";
import GuildConfig from "../../database/models/GuildConfig";
import { loadConfiguration, Constants } from "../../utils/";
import Command from "../Command";

export default class Prefix implements Command {
    public requiredPermission: number = Permissions.FLAGS.ADMINISTRATOR;
    public _name: string = "prefix";
    public _category: string = "configuration";
    public _help: string = "Changes your prefix";
    public _example: Array<string> = ["prefix", "prefix <new prefix>"];

    public async run(client: Client, args: Array<string>, message: Message) {
        const guildId = message.guild.id;
        if (args.length === 0)
            return message.channel.send(
                `${Constants.PREFIX_SUCCESS} Your current Prefix is: ${
                    client["guildConfig"].get(guildId).prefix
                }`
            );

        const currentConfig = await GuildConfig.findOne({
            where: { guildId },
        });
        const newConfig = JSON.parse(currentConfig.config);
        newConfig.prefix = args[0];
        await GuildConfig.update(
            { config: JSON.stringify(newConfig) },
            { where: { guildId } }
        );
        loadConfiguration(client);
        message.channel.send(
            `${Constants.PREFIX_SUCCESS} Prefix updated to: ${newConfig.prefix}`
        );
    }
}
