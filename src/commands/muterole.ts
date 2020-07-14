import { Guild, Client, Message, Permissions, MessageEmbed } from "discord.js";
import { Constants } from "../utils/utils";

export default class MuteRole {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.MANAGE_ROLES;
    public _category: string = "configuration";

    private _help: string = "Creates the mute role";
    private _example: Array<string> = ["muterole"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        const guild: Guild = this._message.guild;
        try {
            guild.roles.create({
                data: {
                    name: "Muted",
                    color: "BLACK",
                    permissions: 0,
                },
            });
            this._message.channel.send(
                `${Constants.PREFIX_SUCCESS} Successfully created **Muterole**!`
            );
        } catch (error) {
            console.error(error);
            this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Something went wrong! Error: ${error}`
            );
        }
    }
}
