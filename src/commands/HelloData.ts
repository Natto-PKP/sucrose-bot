import { ChatInputData } from 'discord-sucrose';

export default <ChatInputData>{
  label: 'hello_data',

  body: {
    name: 'hello',
    description: 'Say hello!',
  },

  execute: async ({ interaction }) => {
    await interaction.reply({
      content: 'Hello!',
    });
  },
};
