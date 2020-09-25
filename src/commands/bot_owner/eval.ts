import { Client, Message } from "discord.js";
import { Constants } from "../../utils/";
import dotenv from "dotenv";
dotenv.config();
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
export default class Ban {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = "BOT_OWNER";
    public _category: string = "OWNER";

    public _help: string = "Evals a piece of code";
    public _example: Array<string> = ["eval ```lang ... ```"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        if (this._message.author.id !== process.env.BOT_OWNER) return;
        if (this._args.length === 0) {
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provice the required parameters!`
            );
        }
        if (
            !this._args
                .join(" ")
                .match(/\`\`\`(([a-z0-9-]+?)\n+)?\n*([^]+?)\n*\`\`\`/i)
        ) {
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Parameters are flawed!`
            );
        }
        try {
            const code = this._args.join(" ");
            let m = await Promise.resolve(eval(this.clean(code)));
            if (typeof m === "object") {
                m = JSON.stringify(m, null, 2);
            }
            this._message.channel.send(m, { code: "xl" }).catch((err) => {
                this._message.channel.send(
                    `\`ERROR\` \`\`\`xl\n${err}\n\`\`\``
                );
            });
        } catch (err) {
            this._message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
        }
    }

    private clean(code: string): string {
        /*
         * ```lang
         *
         * ```
         * */
        return code.replace(/js|javascript/, "").slice(3, -3);
    }
}
