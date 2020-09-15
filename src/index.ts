import { Client, ClientEvents } from "discord.js";
const client = new Client();
import env from "dotenv";
env.config();
import fs from "fs";
import path from "path";
import { registerCommands, runAllCrons } from "./utils/utils";
import {
    sequelize,
    createConnection,
} from "./database/connection/dbconnection";
import util from "util";
const readdir = util.promisify(fs.readdir);

const connectionTest = async () => {
    let retries = 5;
    while (retries) {
        try {
            createConnection();
            await sequelize.authenticate();
            break;
        } catch (error) {
            console.error(error);
            retries -= 1;
            await new Promise((res, rej) => {
                setTimeout(res, 2000);
            });
        }
    }
};

const readCommands = async () => {
    let commands = new Map();
    let categories = await readdir(path.resolve(__dirname, "commands"));
    console.log("Categories:", categories);
    //for (let i = 0; i < categories.length; i++) {}
    /**fs.readdir(path.resolve(__dirname, "commands"), async (err, files) => {
        if (err) throw err;
        for (let i = 0; i < files.length; i++) {
            let commandName = files[i].split(".")[0] as string;
            commands.set(commandName);
        }
    });*/
};

(() => {
    connectionTest();
    registerCommands(client);
    runAllCrons(client);
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
