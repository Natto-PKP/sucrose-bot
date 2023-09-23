import { SubCommandGroup } from 'discord-sucrose';
import { SlashCommandSubcommandGroupBuilder } from 'discord.js';

import HelloOption from './options/HelloOption';

export default new SubCommandGroup({
  label: 'hello_group',

  body: new SlashCommandSubcommandGroupBuilder()
    .setName('hello_group')
    .setDescription('Say hello!'),

  options: [HelloOption],
});
