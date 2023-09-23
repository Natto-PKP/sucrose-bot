import { Modal } from 'discord-sucrose';
import {
  ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle,
} from 'discord.js';

export default new Modal()
  .setLabel('ticket_builder')
  .setBody(
    new ModalBuilder().setTitle('Ticket').setCustomId('ticket').addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('ticket')
          .setLabel('Ticket name')
          .setPlaceholder('Ticket name')
          .setStyle(TextInputStyle.Short),
      ),
    ),
  )
  .setExecute(async ({ interaction }) => {
    await interaction.reply('You created a ticket!');
  });
