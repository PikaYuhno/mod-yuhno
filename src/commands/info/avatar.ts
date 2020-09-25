import { Client, Message, Permissions, MessageEmbed } from "discord.js";
import { Constants } from "../../utils/";

export default class Avatar {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.SEND_MESSAGES;
    public _category: string = "info";

    private _help: string = "Shows the avatar of the provided user";
    private _example: Array<string> = ["prefix", "prefix <new prefix>"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        if (this._args.length === 0) {
            const user = this._message.author;
            const embed = new MessageEmbed()
                .setTitle(`${user.tag}'s avatar`)
                .setImage(user.avatarURL());
            return this._message.channel.send(embed);
        }
        const input = this._args[0];
        const user =
            this._message.mentions.users.first() ||
            this._client.users.cache.get(input) ||
            this._client.users.cache.find(
                (user) => user.tag === input || user.username === input
            );
        if (!user)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} User not found`
            );
        const embed = new MessageEmbed()
            .setTitle(`${user.tag}'s avatar`)
            .setImage(user.avatarURL({ dynamic: true, size: 1024 }));
        this._message.channel.send(embed);
    }
}
