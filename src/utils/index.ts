import { Client, GuildMember } from "discord.js";
import Configuration from "../database/models/Configuration";
import fs from "fs";
import path from "path";
import util from "util";
const readdir = util.promisify(fs.readdir);
import cron from "node-cron";
import Schedules from "../database/models/Schedules";

export const loadConfiguration = async (client: Client) => {
    client["guildConfig"] = new Map();
    const data = await Configuration.findAll();
    for (let item of data) {
        client["guildConfig"].set(item.guildId, JSON.parse(item.config));
    }
    console.log("Guild Configurations:", client["guildConfig"]);
};

export const runAllCrons = async (client: Client) => {
    const schedules = await Schedules.findAll();
    for (let schedule of schedules) {
        let finish = new Date(schedule.finish);
        cron.schedule(dateToPattern(finish), async () => {
            const guild = client.guilds.cache.get(schedule.guildId);
            const member = guild.members.cache.get(schedule.userId);
            unMuteUser(
                await getMutedRoleByGuildId(client, schedule.guildId),
                member,
                guild.id
            );
        });
    }
};

export const getMutedRoleByGuildId = async (client: Client, id: string) => {
    return client.guilds.cache
        .get(id)
        .roles.cache.find((role) => role.name === "Muted").id;
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

export const loadCommands = async (client: Client) => {
    let paths = new Map();
    let categories = await readdir(
        path.resolve(__dirname, "../commands")
    ).catch((err) => {
        throw err;
    });

    client["categories"] = categories;
    for (let i = 0; i < categories.length; i++) {
        let cmds = await readdir(
            path.resolve(__dirname, "../commands", categories[i])
        );
        for (let j = 0; j < cmds.length; j++) {
            let commandName = cmds[j].split(".")[0] as string;
            paths.set(
                commandName,
                path.resolve(__dirname, "../commands", categories[i], cmds[j])
            );
        }
    }
    return paths;
};

//TODO: Change path
export const registerCommands = async (client: Client) => {
    let files: Map<string, string> = await loadCommands(client);
    let commands = [];
    for (let [key, value] of files) {
        const Command = (await import(value)).default;
        const c = new Command(this._client, this._args, this._message);
        commands.push({
            name: key,
            path: value,
            help: c._help,
            example: c._example,
            category: c._category,
        });
    }
    client["commands"] = commands;
};

export const runCronJob = async (
    pattern: string,
    mutedRole: string,
    member: GuildMember,
    guildId: string
) => {
    /*
     * STEPS:
     * - execute Cron Job
     * - save time in the database
     * - save cronjob inmemory with the user id
     */

    let job = cron.schedule(pattern, () => {
        this.unMuteUser(mutedRole, member, guildId);
    });
    await Schedules.create({
        guildId,
        userId: member.id,
        finish: patternToDate(pattern),
    });
    let entry = {
        guildId,
        userId: member.id,
        job,
    };
    crons.push(entry);
};

export const crons = [];

export const patternToDate = (pattern: string) => {
    // * * * * * *
    let arr = pattern.split(" ");
    let date = new Date();
    date.setSeconds(parseInt(arr[0]));
    date.setMinutes(parseInt(arr[1]));
    date.setHours(parseInt(arr[2]));
    return date.toString();
};

export const dateToPattern = (date: Date) => {
    // date obj
    let pattern = `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${
        date.getMonth() + 1
    } *`;
    return pattern;
};

export const unMuteUser = async (
    mutedRole: string,
    member: GuildMember,
    guildId: string
) => {
    await member.roles.remove(mutedRole);
    await Schedules.destroy({ where: { guildId, userId: member.id } });
    let index = crons.findIndex(
        (el) => el.guildId === guildId && el.userId === member.id
    );
    if (!index) return;
    crons.splice(index, 1);
};

export const timeConverter = (time: String) => {
    // time = 242d
    // Regex: (w|d|h|min)
    let durationSplittet = time.split(/(w|d|h|min)/g);
    console.log(durationSplittet);
    let t = parseInt(durationSplittet[0]);
    let unit = durationSplittet[1];
    let date = new Date();

    if (t > 1000) {
        throw new Error("Duration is too long!");
    } else if (t < 0) {
        throw new Error("Duration can't be a negative number!");
    } else if (t === 0) {
        throw new Error("Duration can't be 0!");
    } else if (!t) {
        throw new Error("None");
    } else if (!unit) {
        date.setMinutes(date.getMinutes() + 1);
        return date;
    }

    //let seconds = 0;
    switch (unit) {
        case "w":
            //seconds = t * 7 * 24 * 60 * 60;
            date.setDate(date.getDate() + t * 7);
        case "d":
            //seconds = t * 24 * 60 * 60;
            date.setDate(date.getDate() + t);
        case "h":
            //seconds = t * 60 * 60;
            date.setHours(date.getHours() + t);
        case "min":
            //seconds = t * 60 * 60;
            date.setMinutes(date.getMinutes() + t);
    }

    return date;
};

export const Constants = {
    PREFIX_SUCCESS: "\\🟢",
    PREFIX_FAILURE: "\\🔴",
    BULLET_POINT: "🔸",
    DELETED: "🟥",
    UPDATED: "🟨",
};
