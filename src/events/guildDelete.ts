import { Client, Guild } from 'discord.js';
import Configuration from '../database/models/Configuration';

export default async (client: Client, deletedGuild: Guild) => {
    await Configuration.destroy({ where: { guildId: deletedGuild.id } });
    client['guildConfig'].delete(deletedGuild.id);
}