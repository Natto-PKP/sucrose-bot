import dotenv from 'dotenv';
import client from './client';

dotenv.config();

/**
 * Get discord bot token from environment variables.
 */
const TOKEN = process.env['BOT_TOKEN'] || process.env['DISCORD_TOKEN'] || process.env['TOKEN'];

/**
 * Login to discord with the bot token.
 */
client.login(TOKEN);
