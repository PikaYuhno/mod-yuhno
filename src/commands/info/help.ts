import { Client, Message, MessageEmbed, Permissions } from "discord.js";
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
export default class Help {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.SEND_MESSAGES;
    public _category: string = "info";

    public _help: string = "Info about the commanda";
    public _example: Array<string> = ["help", "help [commandname]"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        if (this._args.length === 1) {
            this.exec();
            return;
        }
        let fields = [];
        //const categories = ["info", "moderation", "configuration"];
        const categories = this._client["categories"];

        let commands = this._client["commands"];
        for (let i = 0; i < categories.length; i++) {
            if (categories[i] === "bot_owner") continue;
            let field = { name: `**${categories[i]}**` };
            let value = "";
            for (let c of commands) {
                if (c.category === "OWNER") continue;
                if (c.category === categories[i]) {
                    value += `${Constants.BULLET_POINT} \`${c.name}\` -> ${c.help} \n`;
                }
            }
            field["value"] = value;
            fields.push(field);
        }

        const embed = new MessageEmbed()
            .setTitle(`All Commands`)
            .addFields(fields);
        this._message.channel.send(embed);
    }
    private exec() {
        const cmd = this._args[0];
        let commands = this._client["commands"];
        let c = commands.find((item) => item.name === cmd);
        if (!c)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Command not found`
            );
        let value = "";
        const embed = new MessageEmbed()
            .setTitle(`Help ${cmd}`)
            .addFields(
                { name: "Help", value: c.help },
                { name: "Examples", value: c.example }
            );
        this._message.channel.send(embed);
    }
}
