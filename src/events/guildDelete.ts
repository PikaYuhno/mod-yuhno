import { Client, Guild } from "discord.js";
import GuildConfig from "../database/models/GuildConfig";

export default async (client: Client, deletedGuild: Guild) => {
    await GuildConfig.destroy({ where: { guildId: deletedGuild.id } });
    client["guildConfig"].delete(deletedGuild.id);
};

