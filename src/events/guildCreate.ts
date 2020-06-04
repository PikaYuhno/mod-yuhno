import { Client, Guild } from 'discord.js';
import Configuration from '../database/models/Configuration';

export default async (client: Client, guild: Guild) => {
    const count = await Configuration.count({ where: { guildId: guild.id } });
    if (count !== 0) return;
    const createdConfig = await Configuration.create({ guildId: guild.id });
    client['guildConfig'].set(guild.id, JSON.parse(createdConfig.config));
    console.log("-----------GuildConfig------------\n", client['guildConfig']);
}