import type { EventHandlerParams } from 'discord-sucrose';

export default ({ args: [member] }: EventHandlerParams<'guildMemberAdd'>) => {
  console.log(`${member.displayName} entered a guild`);
};
