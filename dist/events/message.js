"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.default = async (client, message) => {
    console.log("-----------Messge------------\n");
    if (message.author.bot)
        return;
    let prefix = client['guildConfig'].get(message.guild.id).prefix;
    console.log("Prefix:", prefix);
    console.log("Config", client['guildConfig'].get(message.guild.id));
    console.log("Content:", message.content);
    if (!message.content.startsWith(prefix))
        return;
    let args = message.content.slice(prefix.length).trim().split(/s+/g);
    let cmd = args.shift().toLowerCase();
    fs_1.default.readdir(path_1.default.resolve(__dirname, '../commands/'), async (err, files) => {
        if (err)
            throw err;
        for (let i = 0; i < files.length; i++) {
            const Command = (await Promise.resolve().then(() => __importStar(require(`../commands/${cmd}`)))).default;
            const c = new Command(client, args, message);
            if ((typeof c.requiredPermission !== 'string' && message.member.hasPermission(c.requiredPermission))
                || typeof c.requiredPermission === 'string' && c.requiredPermission === 'BOT_OWNER') {
                c.run();
            }
        }
    });
};
