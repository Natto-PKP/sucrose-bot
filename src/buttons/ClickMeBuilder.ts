import { Button } from 'discord-sucrose';
import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default new Button()
  .setLabel('click_me_builder')
  .setBody(new ButtonBuilder().setCustomId('click_me').setLabel('Click Me!').setStyle(ButtonStyle.Primary))
  .setExecute(async ({ interaction }) => {
    await interaction.reply('You clicked the button!');
  });
