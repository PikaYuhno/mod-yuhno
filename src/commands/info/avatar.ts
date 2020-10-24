import { Client, Message, Permissions, MessageEmbed } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Avatar implements Command {
    public requiredPermission: number = Permissions.FLAGS.SEND_MESSAGES;
    public _name: string = "avatar";
    public _category: string = "info";
    public _help: string = "Shows the avatar of the provided user";
    public _example: Array<string> = ["prefix", "prefix <new prefix>"];

    public async run(client: Client, args: Array<string>, message: Message) {
        if (args.length === 0) {
            const user = message.author;
            const embed = new MessageEmbed()
                .setTitle(`${user.tag}'s avatar`)
                .setImage(user.avatarURL({ dynamic: true, size: 1024 }));
            return message.channel.send(embed);
        }
        const input = args[0];
        const user =
            message.mentions.users.first() ||
            client.users.cache.get(input) ||
            client.users.cache.find(
                (user) => user.tag === input || user.username === input
            );
        if (!user)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} User not found`
            );
        const embed = new MessageEmbed()
            .setTitle(`${user.tag}'s avatar`)
            .setImage(user.avatarURL({ dynamic: true, size: 1024 }));
        message.channel.send(embed);
    }
}
