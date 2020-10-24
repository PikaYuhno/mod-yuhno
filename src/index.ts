import { Client, ClientEvents } from "discord.js";
import env from "dotenv";
import fs from "fs";
import path from "path";
import { registerCommands, runAllCrons } from "./utils/";
import { sequelize, createConnection } from "./database/connection/";
import Command from "./commands/Command";
import util from "util";

const client = new Client();
env.config();

declare module "discord.js" {
    export interface Client {
        commands: Map<string, Command>;
        paths: Map<string, string>;
        guildConfig: Map<string, object>;
        categories: Array<string>;
    }
}

const readdir = util.promisify(fs.readdir);

const connectionTest = async () => {
    let retries = 5;
    while (retries) {
        try {
            createConnection();
            await sequelize.authenticate();
            break;
        } catch (error) {
            retries -= 1;
            await new Promise((res, rej) => {
                setTimeout(res, 2000);
            });
        }
    }
};

(async () => {
    await connectionTest();
    await registerCommands(client);
    await runAllCrons(client);
    fs.readdir(path.resolve(__dirname, "events"), async (err, files) => {
        if (err) throw err;
        for (let i = 0; i < files.length; i++) {
            let eventName = files[i].split(".")[0] as keyof ClientEvents;
            let action = (await import(`./events/${eventName}`)).default;
            client.on(eventName, action.bind(null, client));
        }
    });
})();

client.login(process.env.CLIENT_TOKEN);
