import type Discord from 'discord.js';
import { ChatFunction } from '../FunctionService';
import { guildId } from '../../config';

interface Params {
  interaction?: Discord.Interaction,
  message?: Discord.Message,
  search?: string,
  self?: boolean,
}

const getResult = (
  user: Discord.User,
  member?: Discord.GuildMember | Discord.APIInteractionGuildMember | null,
) => {
  const result = {
    id: user?.id,
    username: user?.username,
    pseudo: user?.displayName,
    discriminator: user?.discriminator,
    avatarUrl: user?.displayAvatarURL({ size: 4096 }),
    bannerUrl: user?.bannerURL({ size: 4096 }),
    highestRoleName: (member?.roles as Discord.GuildMemberRoleManager)?.highest.name,
    bot: user?.bot,
    createdAt: user?.createdAt,
  };

  return result;
};

export default {
  execute: async (params: Params) => {
    const client = params.interaction?.client || params.message?.client;
    if (!client) return JSON.stringify({ error: 'No client found' });
    const guild = await client.guilds.fetch(guildId)!;

    if (params.self) {
      const user = params.interaction?.client.user || params.message?.client.user;
      const member = guild.members.me;
      return JSON.stringify(getResult(user!, member));
    } if (params.search) {
      if (/^\d{17,19}$/.test(params.search)) {
        const member = await guild.members.fetch(params.search).catch(() => null);
        if (!member) return JSON.stringify({ error: 'No member found' });
        return JSON.stringify(getResult(member.user, member));
      }

      const members = await guild.members.search({ query: params.search, limit: 1 });
      const member = members.first();
      if (!member) return JSON.stringify({ error: 'No member found' });
      return JSON.stringify(getResult(member.user, member));
    }

    const user = params.interaction?.user || params.message?.author;
    const member = params.interaction?.member || params.message?.member;

    return JSON.stringify(getResult(user!, member));
  },

  data: {
    name: 'getUserInfo',
    description: 'Get user information',
    parameters: {
      type: 'object',
      properties: {
        self: {
          type: 'boolean',
          description: 'Get information about the bot itself',
        },
        search: {
          type: 'string',
          description: 'Search for a user, like "natto_pkp" or "Nat\'" or "570642674151981135"',
        },
      },
    },
  },
} as ChatFunction;
