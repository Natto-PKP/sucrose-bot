import { StringSelectMenu } from 'discord-sucrose';
import { StringSelectMenuBuilder } from 'discord.js';

export default new StringSelectMenu({
  label: 'select_me',

  body: new StringSelectMenuBuilder().setCustomId('select_me').setPlaceholder('Select an option!').addOptions([
    {
      label: 'Option 1',
      value: 'option_1',
    },
    {
      label: 'Option 2',
      value: 'option_2',
    },
  ]),

  execute: async ({ interaction }) => {
    await interaction.reply('You selected an option!');
  },
});
