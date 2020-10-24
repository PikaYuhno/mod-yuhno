import { Client, Message, MessageEmbed, Permissions } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class Help implements Command {
    public requiredPermission: number = Permissions.FLAGS.SEND_MESSAGES;
    public _name: string = "help";
    public _category: string = "info";
    public _help: string = "Info about the commanda";
    public _example: Array<string> = ["help", "help [commandname]"];

    public async run(client: Client, args: Array<string>, message: Message) {
        if (args.length === 1) {
            this.exec(client, args, message);
            return;
        }
        let fields = [];
        const categories = client["categories"];

        let commands = client.commands;
        for (let i = 0; i < categories.length; i++) {
            if (categories[i] === "bot_owner") continue;
            let field = { name: `**${categories[i]}**` };
            let value = "";
            for (let [key, c] of commands) {
                if (c._category === "OWNER") continue;
                if (c._category === categories[i]) {
                    value += `${Constants.BULLET_POINT} \`${c._name}\` -> ${c._help} \n`;
                }
            }
            field["value"] = value;
            fields.push(field);
        }

        const embed = new MessageEmbed()
            .setTitle(`All Commands`)
            .addFields(fields);
        message.channel.send(embed);
    }
    private exec(client: Client, args: Array<string>, message: Message) {
        const cmd = args[0];
        let c = client.commands.get(cmd);
        if (!c)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Command not found`
            );
        const embed = new MessageEmbed()
            .setTitle(`Help ${cmd}`)
            .addFields(
                { name: "Help", value: c._help },
                { name: "Examples", value: c._example }
            );
        message.channel.send(embed);
    }
}
