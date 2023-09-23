import type { ButtonData } from 'discord-sucrose';
import { ButtonStyle } from 'discord.js';

export default <ButtonData>{
  label: 'click_me_data',

  body: {
    customId: 'click_me',
    label: 'Click Me!',
    style: ButtonStyle.Primary,
  },

  execute: async ({ interaction }) => {
    await interaction.reply('You clicked the button!');
  },
};
