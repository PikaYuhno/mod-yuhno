import { Guild, Client, Message, Permissions } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class MuteRole implements Command {
    public requiredPermission: number = Permissions.FLAGS.MANAGE_ROLES;
    public _category: string = "configuration";
    public _name: string = "muterole";
    public _help: string = "Creates the mute role";
    public _example: Array<string> = ["muterole"];

    public async run(client: Client, args: Array<string>, message: Message) {
        const guild: Guild = message.guild;
        try {
            guild.roles.create({
                data: {
                    name: "Muted",
                    color: "BLACK",
                    permissions: 0,
                },
            });
            message.channel.send(
                `${Constants.PREFIX_SUCCESS} Successfully created **Muterole**!`
            );
        } catch (error) {
            console.error(error);
            message.channel.send(
                `${Constants.PREFIX_FAILURE} Something went wrong! Error: ${error}`
            );
        }
    }
}
