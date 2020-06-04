"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Configuration_1 = __importDefault(require("../database/models/Configuration"));
exports.default = async (client, deletedGuild) => {
    await Configuration_1.default.destroy({ where: { guildId: deletedGuild.id } });
    client['guildConfig'].delete(deletedGuild.id);
};
