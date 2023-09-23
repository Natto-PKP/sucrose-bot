import { StringSelectMenuData } from 'discord-sucrose';
import { ComponentType } from 'discord.js';

export default <StringSelectMenuData>{
  label: 'select_me_data',

  body: {
    customId: 'select_me',
    placeholder: 'Select an option!',
    type: ComponentType.StringSelect,
    options: [
      {
        label: 'Option 1',
        value: 'option_1',
      },
      {
        label: 'Option 2',
        value: 'option_2',
      },
    ],
  },

  execute: async ({ interaction }) => {
    await interaction.reply('You selected an option!');
  },
};
