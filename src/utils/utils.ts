import { Client, GuildMember } from "discord.js";
import Configuration from "../database/models/Configuration";
import fs from "fs";
import path from "path";
import util from "util";
const readdir = util.promisify(fs.readdir);

export const loadConfiguration = async (client: Client) => {
    client["guildConfig"] = new Map();
    const data = await Configuration.findAll();
    for (let item of data) {
        client["guildConfig"].set(item.guildId, JSON.parse(item.config));
    }
    console.log("Guild Configurations:", client["guildConfig"]);
};

export const verifyDatabase = async (client: Client) => {
    for (let guild of client.guilds.cache.values()) {
        const count = await Configuration.count({
            where: { guildId: guild.id },
        });
        console.log("Count:", count);
        if (count === 0) {
            const created = await Configuration.create({
                guildId: guild.id,
            });
            console.log(created);
        } else {
            console.log("Everything is fine!");
        }
    }
};

export const registerCommands = async (client: Client) => {
    let files: any = null;
    let commands = [];
    try {
        files = await readdir(path.resolve(__dirname, "../commands"));
        files = files.map((file) => file.split(/\./g)[0]);
        //files = files.filter((file) => file !== "help");
    } catch (error) {
        console.error(error);
    }
    for (let cmd of files) {
        const Command = (await import(`../commands/${cmd}`)).default;
        const c = new Command(this._client, this._args, this._message);
        commands.push({
            name: cmd,
            help: c._help,
            example: c._example,
            category: c._category,
        });
    }
    client["commands"] = commands;
};

export const runCronJob = async () => {};

export const timeConverter = (time: String) => {};

export const Constants = {
    PREFIX_SUCCESS: "\\🟢",
    PREFIX_FAILURE: "\\🔴",
    BULLET_POINT: "🔸",
    DELETED: "🟥",
    UPDATED: "🟨",
};
