import { Client, Message, Permissions } from "discord.js";
import Configuration from "../../database/models/Configuration";
import { loadConfiguration, Constants } from "../../utils/";

export default class Prefix {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.ADMINISTRATOR;
    public _category: string = "configuration";

    public _help: string = "Changes your prefix";
    public _example: Array<string> = ["prefix", "prefix <new prefix>"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        const guildId = this._message.guild.id;
        if (this._args.length === 0)
            return this._message.reply(
                `${Constants.PREFIX_SUCCESS} Your current Prefix is: ${
                    this._client["guildConfig"].get(guildId).prefix
                }`
            );

        const currentConfig = await Configuration.findOne({
            where: { guildId },
        });
        const newConfig = JSON.parse(currentConfig.config);
        newConfig.prefix = this._args[0];
        await Configuration.update(
            { config: JSON.stringify(newConfig) },
            { where: { guildId } }
        );
        loadConfiguration(this._client);
        this._message.reply(
            `${Constants.PREFIX_SUCCESS} Prefix updated to: ${newConfig.prefix}`
        );
    }
}

