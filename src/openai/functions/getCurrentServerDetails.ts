import type Discord from 'discord.js';
import { ChatFunction } from '../FunctionService';
import { guildId } from '../../config';

interface Params {
  interaction?: Discord.Interaction,
  message?: Discord.Message,
}

export default {
  execute: async (params: Params) => {
    const client = params.interaction?.client || params.message?.client;
    if (!client) return JSON.stringify({ error: 'No client found' });
    const guild = await client.guilds.fetch(guildId)!;

    const result = {
      memberCount: guild.memberCount,
      createdAt: guild.createdAt,
      icon: guild.iconURL({ size: 4096 }),
      banner: guild.bannerURL({ size: 4096 }),
      name: guild.name,
      ruleChannel: guild.rulesChannel,
    };

    return JSON.stringify(result);
  },

  data: {
    name: 'getCurrentServerDetails',
    description: 'Get current server details',
    parameters: {
      type: 'object',
      properties: { },
    },
  },
} as ChatFunction;
