"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
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
class Ping {
    constructor(client, args, message) {
        this.requiredPermission = discord_js_1.Permissions.FLAGS.SEND_MESSAGES;
        this._example = [
            "ping"
        ];
        this._client = client;
        this._args = args;
        this._message = message;
    }
    async run() {
        const sentMsg = await this._message.channel.send("Pong ?");
        sentMsg.edit(`Pong! Latency: ${sentMsg.createdTimestamp - this._message.createdTimestamp}ms. Your server configuration: ${JSON.stringify(this._client['guildConfig'].get(this._message.guild.id))}`);
    }
}
exports.default = Ping;
