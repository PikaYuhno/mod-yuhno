"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
exports.default = async (client) => {
    await utils_1.verifyDatabase(client);
    await utils_1.loadConfiguration(client);
    console.log(`Logged in as ${client.user.tag}`);
};
