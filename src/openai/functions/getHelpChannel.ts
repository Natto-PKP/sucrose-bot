import type Discord from 'discord.js';
import { channels } from '../../config';
import { ChatFunction } from '../FunctionService';

interface Params {
  message?: Discord.Message,
  interaction?: Discord.Interaction,
}

export default {
  execute: async ({ message, interaction }: Params) => {
    const channel = message?.channel || interaction?.channel;
    if (!channel) return JSON.stringify({ error: 'No channel found' });

    const result = {
      helpChannelId: channels.helpChannelId,
      alreadyInHelpChannel: channel.id === channels.helpChannelId,
    };

    return JSON.stringify(result);
  },

  data: {
    name: 'getHelpChannel',
    description: 'Get help channel mention when needed',
    parameters: {
      type: 'object',
      properties: { },
    },
  },
} as ChatFunction;
