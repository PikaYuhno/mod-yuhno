import { Client, Message, Permissions } from "discord.js";
import GuildConfig from "../../database/models/GuildConfig";
import { loadConfiguration, Constants } from "../../utils/";
import Command from "../Command";

export default class SetDefault implements Command {
    public requiredPermission: number = Permissions.FLAGS.ADMINISTRATOR;
    public _name: string = "setdefault";
    public _category: string = "configuration";
    public _help: string = "Sets the default role for the command random";
    public _example: Array<string> = ["setdefault", "setdefault <roleId>"];

    public async run(client: Client, args: Array<string>, message: Message) {
        const guildId = message.guild.id;
        const currentConfig = await GuildConfig.findOne({
            where: { guildId },
        });
        const newConfig = JSON.parse(currentConfig.config);
        if (args.length === 0) {
            if (newConfig.default_role)
                return message.channel.send(
                    `${Constants.PREFIX_SUCCESS} Current default role is ${newConfig.default_role}`
                );
            else
                return message.channel.send(
                    `${Constants.PREFIX_FAILURE} No default role is set!`
                );
        }

        let role = message.guild.roles.cache.get(args[0]);
        if (!role)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Role not found!`
            );
        newConfig.default_role = args[0];
        try {
            await GuildConfig.update(
                { config: JSON.stringify(newConfig) },
                { where: { guildId } }
            );
        } catch (error) {
            console.error(error);
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Something went wrong... Error: ${error}`
            );
        }
        loadConfiguration(client);

        message.channel.send(
            `${Constants.PREFIX_SUCCESS} Successfully set the default role for the command \`random\`.`
        );
    }
}
