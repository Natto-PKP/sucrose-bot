import { Logger } from 'discord-sucrose';
import type { EventHandlerParams } from 'discord-sucrose';

export default async ({ sucrose }: EventHandlerParams<'ready'>) => {
  Logger.write("I'm connected !");

  await sucrose.commands.define('eval');
};
