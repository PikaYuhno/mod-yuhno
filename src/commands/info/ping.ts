import { Client, Message, Permissions } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Ping implements Command {
    public requiredPermission: number = Permissions.FLAGS.SEND_MESSAGES;
    public _name: string = "ping";
    public _category: string = "info";
    public _help: string = "Get a bo ping measurement";
    public _example: Array<string> = ["ping"];

    public async run(client: Client, args: Array<string>, message: Message) {
        const sentMsg: Message = await message.channel.send("Pong ?");
        //sentMsg.edit(`Pong! Latency: ${sentMsg.createdTimestamp - message.createdTimestamp}ms. Your server configuration: ${JSON.stringify(client['guildConfig'].get(message.guild.id))}`);
        sentMsg.edit(
            `${Constants.PREFIX_SUCCESS} Pong! Latency: ${
                sentMsg.createdTimestamp - message.createdTimestamp
            }ms. API Latency is ${Math.round(message.client.ws.ping)}ms`
        );
    }
}
