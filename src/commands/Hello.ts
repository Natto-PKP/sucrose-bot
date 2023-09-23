import { ChatInput } from 'discord-sucrose';
import { SlashCommandBuilder } from 'discord.js';

export default new ChatInput({
  label: 'hello',

  body: new SlashCommandBuilder().setName('hello').setDescription('Say hello!'),

  execute: async ({ interaction }) => {
    await interaction.reply({
      content: 'Hello!',
    });
  },
});
