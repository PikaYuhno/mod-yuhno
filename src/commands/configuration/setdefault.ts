import { Client, Message, Permissions } from "discord.js";
import Configuration from "../../database/models/Configuration";
import { loadConfiguration, Constants } from "../../utils/";

export default class SetDefault {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.ADMINISTRATOR;
    public _category: string = "configuration";

    public _help: string = "Sets the default role for the command random";
    public _example: Array<string> = ["setdefault", "setdefault <roleId>"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        const guildId = this._message.guild.id;
        const currentConfig = await Configuration.findOne({
            where: { guildId },
        });
        const newConfig = JSON.parse(currentConfig.config);
        if (this._args.length === 0) {
            if (newConfig.default_role)
                return this._message.channel.send(
                    `${Constants.PREFIX_SUCCESS} Current default role is ${newConfig.default_role}`
                );
            else
                return this._message.channel.send(
                    `${Constants.PREFIX_FAILURE} No default role is set!`
                );
        }

        let role = this._message.guild.roles.cache.get(this._args[0]);
        if (!role)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Role not found!`
            );
        newConfig.default_role = this._args[0];
        try {
            await Configuration.update(
                { config: JSON.stringify(newConfig) },
                { where: { guildId } }
            );
        } catch (error) {
            console.error(error);
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Something went wrong... Error: ${error}`
            );
        }
        loadConfiguration(this._client);

        this._message.channel.send(
            `${Constants.PREFIX_SUCCESS} Successfully set the default role for the command \`random\`.`
        );
    }
}
