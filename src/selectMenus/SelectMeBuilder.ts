import { StringSelectMenu } from 'discord-sucrose';
import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';

export default new StringSelectMenu()
  .setLabel('select_me_builder')
  .setBody(new StringSelectMenuBuilder().setCustomId('select_me').setPlaceholder('Select an option!').addOptions([
    new StringSelectMenuOptionBuilder().setLabel('Option 1').setValue('option_1'),
    new StringSelectMenuOptionBuilder().setLabel('Option 2').setValue('option_2'),
  ]))
  .setExecute(async ({ interaction }) => {
    await interaction.reply('You selected an option!');
  });
