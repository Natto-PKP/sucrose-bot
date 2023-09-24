import { ChatInput } from 'discord-sucrose';
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

export default new ChatInput({
  label: 'ask',

  permissions: [{
    label: 'channel',
    type: 'CHANNEL',
    allowed: ['1155074221702127726'],
  }],

  body: {
    name: 'ask',
    description: 'Ask a question to the bot',
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: 'question',
        type: ApplicationCommandOptionType.String,
        description: 'The question you want to ask',
        required: true,
      },
    ],
  },

  execute: async () => {

  },
});
