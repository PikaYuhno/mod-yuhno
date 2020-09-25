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
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils/");
const dbconnection_1 = require("./database/connection/dbconnection");
const util_1 = __importDefault(require("util"));
const client = new discord_js_1.Client();
dotenv_1.default.config();
const readdir = util_1.default.promisify(fs_1.default.readdir);
const connectionTest = async () => {
    let retries = 5;
    while (retries) {
        try {
            dbconnection_1.createConnection();
            await dbconnection_1.sequelize.authenticate();
            break;
        }
        catch (error) {
            //            console.error(error);
            retries -= 1;
            await new Promise((res, rej) => {
                setTimeout(res, 2000);
            });
        }
    }
};
(async () => {
    await connectionTest();
    await utils_1.registerCommands(client);
    await utils_1.runAllCrons(client);
    fs_1.default.readdir(path_1.default.resolve(__dirname, "events"), async (err, files) => {
        if (err)
            throw err;
        for (let i = 0; i < files.length; i++) {
            let eventName = files[i].split(".")[0];
            let action = (await Promise.resolve().then(() => __importStar(require(`./events/${eventName}`)))).default;
            client.on(eventName, action.bind(null, client));
        }
    });
})();
client.login(process.env.CLIENT_TOKEN);
