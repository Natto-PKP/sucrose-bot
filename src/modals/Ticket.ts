import { Modal } from 'discord-sucrose';
import {
  ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle,
} from 'discord.js';

export default new Modal({
  label: 'ticket',

  body: new ModalBuilder().setTitle('Ticket').setCustomId('ticket').addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId('ticket')
        .setLabel('Ticket name')
        .setPlaceholder('Ticket name')
        .setStyle(TextInputStyle.Short),
    ),
  ),

  execute: async ({ interaction }) => {
    await interaction.reply('You created a ticket!');
  },
});
