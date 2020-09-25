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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const utils_1 = require("../utils/");
exports.default = async (client, message) => {
    if (message.author.bot)
        return;
    if (!message.guild)
        return;
    //    console.log("-----------Messge------------\n");
    let prefix = client["guildConfig"].get(message.guild.id).prefix;
    //    console.log("Prefix:", prefix);
    //    console.log("Config", client["guildConfig"].get(message.guild.id));
    /**const escapeRegex = (str: string) =>
        str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");*/
    const prefixRegex = new RegExp(`^<@!${client.user.id}>\s*$`);
    if (prefixRegex.test(message.content))
        return message.reply(`My Prefix is \`${prefix}\`, try \`${prefix}help\` for more information`);
    if (!message.content.startsWith(prefix))
        return;
    let args = message.content.slice(prefix.length).trim().split(/\s+/g);
    let cmd = args.shift().toLowerCase();
    //Check if command exist
    if (!client["commands"].find((c) => c.name === cmd))
        return;
    //   console.log("Command:", cmd, "Args:", args);
    const Command = (await Promise.resolve().then(() => __importStar(require(client["commands"].find((c) => c.name === cmd).path)))).default;
    const c = new Command(client, args, message);
    if ((typeof c.requiredPermission !== "string" &&
        message.member.hasPermission(c.requiredPermission)) ||
        (typeof c.requiredPermission === "string" &&
            c.requiredPermission === "BOT_OWNER" &&
            process.env.BOT_OWNER === message.author.id)) {
        c.run();
    }
    else {
        console.log(`User: ${message.member.user} doesn't have the Permission!`);
        return message.channel.send(`${utils_1.Constants.PREFIX_FAILURE} You don't have the permission to execute this command!`);
    }
};
