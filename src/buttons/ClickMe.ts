import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { Button } from 'discord-sucrose';

export default new Button({
  label: 'click_me',

  body: new ButtonBuilder().setCustomId('click_me').setLabel('Click Me!').setStyle(ButtonStyle.Primary),

  execute: async ({ interaction }) => {
    await interaction.reply('You clicked the button!');
  },
});
