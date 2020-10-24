import { Client, Message } from "discord.js";

export default interface Command {
    requiredPermission: string | number;
    _name: string;
    _help: string;
    _category: string;
    _example: Array<String>;

    run: (client: Client, args: Array<string>, message: Message) => void;
}
