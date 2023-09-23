import { ModalData } from 'discord-sucrose';
import { ComponentType, TextInputStyle } from 'discord.js';

export default <ModalData>{
  label: 'ticket_data',

  body: {
    title: 'Ticket',
    customId: 'ticket',
    components: [
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.TextInput,
            customId: 'ticket',
            label: 'Ticket name',
            placeholder: 'Ticket name',
            style: TextInputStyle.Short,
          },
        ],
      },
    ],
  },

  execute: async ({ interaction }) => {
    await interaction.reply('You created a ticket!');
  },
};
