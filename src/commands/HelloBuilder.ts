import { ChatInput } from 'discord-sucrose';
import { SlashCommandBuilder } from 'discord.js';

export default new ChatInput()
  .setLabel('hello_builder')
  .setBody(new SlashCommandBuilder().setName('hello').setDescription('Say hello!'))
  .setExecute(async ({ interaction }) => {
    await interaction.reply({
      content: 'Hello!',
    });
  });
