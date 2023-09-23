"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const discord_sucrose_1 = tslib_1.__importDefault(require("discord-sucrose"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const sucrose = new discord_sucrose_1.default({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
    partials: [discord_js_1.Partials.Channel],
});
exports.default = sucrose;
console.log('Hello, world!');
