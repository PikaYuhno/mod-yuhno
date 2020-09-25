import { Client, Message, Permissions, TextChannel } from "discord.js";
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
export default class Clear {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.MANAGE_MESSAGES;
    public _category: string = "moderation";

    public _help: string = "Clears messages";
    public _example: Array<string> = ["clear [amount]"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        if (this._args.length === 0)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required paramenters!`
            );
        const amount: number = parseInt(this._args[0]);
        if (!amount)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Amount must be a number!`
            );
        if (amount > 100)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Please specify an amount <= 100!`
            );
        const channel: TextChannel = this._message.channel as TextChannel;
        try {
            const deleted = await channel.bulkDelete(amount);
            this._message.channel.send(
                `${Constants.PREFIX_SUCCESS} Successfully deleted ${deleted.size} messages!`
            );
        } catch (error) {
            console.error(error);
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Something went wrong! Error: ${error}`
            );
        }
    }
}
