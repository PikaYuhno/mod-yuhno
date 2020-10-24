import { Client, Guild } from "discord.js";
import GuildConfig from "../database/models/GuildConfig";

export default async (client: Client, guild: Guild) => {
    const count = await GuildConfig.count({ where: { guildId: guild.id } });
    if (count !== 0) return;
    const createdConfig = await GuildConfig.create({ guildId: guild.id });
    client["guildConfig"].set(guild.id, JSON.parse(createdConfig.config));
    console.log("-----------GuildConfig------------\n", client["guildConfig"]);
};

