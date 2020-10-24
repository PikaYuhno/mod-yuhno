import { Client, Message, Permissions, TextChannel } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Clear implements Command {
    public requiredPermission: number = Permissions.FLAGS.MANAGE_MESSAGES;
    public _name: string = "clear";
    public _category: string = "moderation";
    public _help: string = "Clears messages";
    public _example: Array<string> = ["clear [amount]"];

    public async run(client: Client, args: Array<string>, message: Message) {
        if (args.length === 0)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required paramenters!`
            );
        const amount: number = parseInt(args[0]);
        if (!amount)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Amount must be a number!`
            );
        if (amount > 100)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Please specify an amount <= 100!`
            );
        const channel: TextChannel = message.channel as TextChannel;
        try {
            const deleted = await channel.bulkDelete(amount);
            message.channel.send(
                `${Constants.PREFIX_SUCCESS} Successfully deleted ${deleted.size} messages!`
            );
        } catch (error) {
            console.error(error);
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Something went wrong! Error: ${error}`
            );
        }
    }
}
