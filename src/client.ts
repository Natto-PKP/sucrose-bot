import { Sucrose } from 'discord-sucrose';
import { GatewayIntentBits, Partials } from 'discord.js';
import { extname } from 'path';

/**
 * Similar to the Client class from discord.js, but with more features
 */
const client = new Sucrose({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.User,
    Partials.Reaction,
  ],
});

/**
 * The environment the bot is running in
 */
export const ENV = extname(__filename) === '.ts' ? 'development' : 'production';
export const SRC = ENV === 'development' ? 'src' : 'dist';

/**
 * This block of code will run when the bot is ready
 * It's temporary util i found a better way to do this
 */
client.once('ready', async () => {
  /**
   * Load all interactions, events and others things
   * It'll load all files from the folders below for each manager
   */
  await client.interactions.buttons.load({ path: `${SRC}/buttons` });
  await client.interactions.commands.load({ path: `${SRC}/commands` });
  await client.interactions.modals.load({ path: `${SRC}/modals` });
  await client.interactions.selectMenus.load({ path: `${SRC}/selectMenus` });
  await client.interactions.cooldowns.load({ path: `${SRC}/cooldowns` });
  await client.interactions.permissions.load({ path: `${SRC}/permissions` });

  // await client.interactions.commands.deploy('ask', '713172382042423352');

  /**
   * Load all events
   */
  await client.events.load({ path: `${SRC}/events`, depth: 2 });
  client.events.listenAll();
  client.emit('ready' as any, client);
});

export default client;
