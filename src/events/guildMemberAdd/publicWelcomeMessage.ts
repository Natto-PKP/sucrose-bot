import { Event } from 'discord-sucrose';
import { ChannelType } from 'discord.js';
import { configMessages } from '../../openai/MessageService';
import { channels } from '../../config';
import { ChatGPTService } from '../../openai/ChatGPTService';

const conversation = [...configMessages];

export default new Event('guildMemberAdd', {
  label: 'publicWelcomeMessage',

  execute: async ({ args: [member] }) => {
    if (member.user.bot) return;

    const channel = await member.guild.channels.fetch(channels.generalChannelId);
    if (!channel || channel.type !== ChannelType.GuildText) return;

    const response = await ChatGPTService.ask(
      { role: 'user', content: `Fais seulement une ou deux phrases de bienvenue pour <@${member.id}>. Fais un accueil légèrement hésitant. Utilises au moins un émoji.` },
      { messages: conversation, functions: undefined },
    );

    const { content } = response.choices[0].message;
    if (content?.length) await channel.send(content);
  },
});
