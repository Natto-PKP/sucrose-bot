import { SubCommand } from 'discord-sucrose';
import { SlashCommandSubcommandBuilder } from 'discord.js';

export default new SubCommand({
  label: 'hello_option',

  body: new SlashCommandSubcommandBuilder().setName('hello_option').setDescription('Say hello!'),

  execute: async ({ interaction }) => {
    await interaction.reply({
      content: 'Hello!',
    });
  },
});
