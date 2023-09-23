import { Logger } from 'discord-sucrose';

/**
 * Custom logger from discord-sucrose.
 */
export default new Logger('custom logger', {
  /**
   * Allow colored logs
   */
  colored: true,

  console,

  /**
   * Allow detailled logs
   */
  verbose: true,
});
