import { Client, GuildMember } from "discord.js";

export default async (client: Client, member: GuildMember) => {
    const config = client['guildConfig'].get(member.guild.id);
    if(!config) return;

    
};