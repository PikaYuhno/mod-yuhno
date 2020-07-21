import { Client, Message, Permissions, GuildMember, User } from "discord.js";
import { Constants, loadConfiguration } from "../utils/utils";
import Configuration from "../database/models/Configuration";
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
export default class MessageLog {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.MANAGE_CHANNELS;
    public _category: string = "configuration";

    public _help: string = "Sets the channel for the message log";
    public _example: Array<string> = ["messagelog [channelid|"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        const channelId = this._args[0];
        const channel = this._message.guild.channels.cache.get(channelId);
        if (!channel)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Channel not found!`
            );
        else if (channel.type !== "text")
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Channel has to be a text channel`
            );
        const currentConfig = await Configuration.findOne({
            where: { guildId: this._message.guild.id },
        });
        const newConfig = JSON.parse(currentConfig.config);
        newConfig["message_log"] = channelId;
        console.log("new Config:", newConfig);
        await Configuration.update(
            { config: JSON.stringify(newConfig) },
            { where: { guildId: this._message.guild.id } }
        );
        loadConfiguration(this._client);

        this._message.channel.send(
            `${Constants.PREFIX_SUCCESS} Message Logs will now be sent in <#${channel.id}> !`
        );
    }
}
