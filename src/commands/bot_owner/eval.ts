import { Client, Message } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";
import dotenv from "dotenv";
dotenv.config();

export default class Eval implements Command {
    public requiredPermission: string = "BOT_OWNER";
    public _name: string = "eval";
    public _category: string = "OWNER";
    public _help: string = "Evals a piece of code";
    public _example: Array<string> = ["eval ```lang ... ```"];

    public async run(client: Client, args: Array<string>, message: Message) {
        if (message.author.id !== process.env.BOT_OWNER) return;
        if (args.length === 0) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provice the required parameters!`
            );
        }
        if (
            !args
                .join(" ")
                .match(/\`\`\`(([a-z0-9-]+?)\n+)?\n*([^]+?)\n*\`\`\`/i)
        ) {
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Parameters are flawed!`
            );
        }
        try {
            const code = args.join(" ");
            let m = await Promise.resolve(eval(this.clean(code)));
            if (typeof m === "object") {
                m = JSON.stringify(m, null, 2);
            }
            message.channel.send(m, { code: "xl" }).catch((err) => {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
        }
    }

    private clean(code: string): string {
        return code.replace(/js|javascript/, "").slice(3, -3);
    }
}
