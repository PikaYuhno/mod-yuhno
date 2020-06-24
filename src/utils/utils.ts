import { Client } from 'discord.js';
import Configuration from '../database/models/Configuration';

export const loadConfiguration = async (client: Client) => {
    client['guildConfig'] = new Map();
    const data = await Configuration.findAll();
    for (let item of data) {
        client['guildConfig'].set(item.guildId, JSON.parse(item.config));
    }
    console.log("Guild Configurations:", client['guildConfig']);
}

export const verifyDatabase = async (client: Client) => {
    for (let guild of client.guilds.cache.values()) {
        const count = await Configuration.count({ where: { guildId: guild.id } });
        console.log("Count:", count);
        if (count === 0) {
            const created = await Configuration.create({
                guildId: guild.id,
            });
            console.log(created);
        } else {
            console.log('Everything is fine!');
        }
    }
}

export const Constants = {
    "PREFIX_SUCCESS": "\\🟢",
    "PREFIX_FAILURE": "\\🔴"
}