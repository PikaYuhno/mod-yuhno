"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDatabase = exports.loadConfiguration = void 0;
const Configuration_1 = __importDefault(require("../database/models/Configuration"));
exports.loadConfiguration = async (client) => {
    client['guildConfig'] = new Map();
    const data = await Configuration_1.default.findAll();
    for (let item of data) {
        client['guildConfig'].set(item.guildId, JSON.parse(item.config));
    }
    console.log("Guild Configurations:", client['guildConfig']);
};
exports.verifyDatabase = async (client) => {
    for (let guild of client.guilds.cache.values()) {
        const count = await Configuration_1.default.count({ where: { guildId: guild.id } });
        console.log("Count:", count);
        if (count === 0) {
            const created = await Configuration_1.default.create({
                guildId: guild.id,
            });
            console.log(created);
        }
        else {
            console.log('Everything is fine!');
        }
    }
};
