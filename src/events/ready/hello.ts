import { Event } from 'discord-sucrose';

export default new Event('ready', {
  label: 'hello',

  execute: async ({ client }) => {
    console.log(`Logged in as ${client.user?.username}!`);
  },
});
