import { Client, Message, Permissions, GuildMember, User } from "discord.js";
import { Constants } from "../../utils/";
import Configuration from "../../database/models/Configuration";

export default class Random {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.BAN_MEMBERS;
    public _category: string = "other";

    public _help: string = "Picks a random member";
    public _example: Array<string> = ["random"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        let config = (
            await Configuration.findOne({
                where: { guildId: this._message.guild.id },
            })
        ).config;
        let jsonConfig = JSON.parse(config);

        let roleId = jsonConfig.default_role;

        if (!roleId)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Couldn't find the default role!`
            );

        let members = this._message.guild.members.cache.filter((member) =>
            member.roles.cache.has(roleId)
        );
        let random = Math.floor(Math.random() * Math.floor(members.size));
        let randomUser = null;
        let i = 0;
        for (let memberId of members.keys()) {
            if (i === random) {
                randomUser = memberId;
            }
            i++;
        }
        if (!randomUser)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} There is no random User :P`
            );

        return this._message.channel.send(
            `${Constants.PREFIX_SUCCESS} Random user is: <@!${randomUser}>`
        );
    }
}
