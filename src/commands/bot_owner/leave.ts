import { Client, Message } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Leave implements Command {
    public requiredPermission: string = "BOT_OWNER";
    public _name: string = "leave";
    public _category: string = "OWNER";
    public _help: string = "Leaves a guild";
    public _example: Array<string> = ["leave [guildid]"];

    public async run(client: Client, args: Array<string>, message: Message) {
        if (args.length === 0) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required parameters!`
            );
        }
        const guild = client.guilds.cache.get(args[0]);
        if (!guild)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Guild not found!`
            );
        guild
            .leave()
            .then((g) => {
                message.channel.send(
                    `${Constants.PREFIX_SUCCESS} Successfully left the guild **${g.name}**`
                );
            })
            .catch((err) => {
                message.channel.send(
                    `${Constants.PREFIX_FAILURE} Failed to leave server!`
                );
                console.error(err);
            });
    }
}
