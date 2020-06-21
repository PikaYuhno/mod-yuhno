"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Configuration_1 = __importDefault(require("../database/models/Configuration"));
exports.default = async (client, guild) => {
    const count = await Configuration_1.default.count({ where: { guildId: guild.id } });
    if (count !== 0)
        return;
    const createdConfig = await Configuration_1.default.create({ guildId: guild.id });
    client['guildConfig'].set(guild.id, JSON.parse(createdConfig.config));
    console.log("-----------GuildConfig------------\n", client['guildConfig']);
};
