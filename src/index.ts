import { Sucrose } from 'discord-sucrose';
import { GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';

import InteractionAutoReplyContent from './contents/InteractionAutoReplyContent';

dotenv.config();

Sucrose.build({
  env: { ext: 'ts', source: 'src' },
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel],

  // # Optional options
  features: { // Custom bot features
    interactions: { // Interactions manager
      autoReply: { // Interaction manager autoReply feature
        active: true, // true per default

        // default: https://github.com/Natto-PKP/discord-sucrose/blob/main/src/contents/InteractionAutoReplyContents.ts
        contents: InteractionAutoReplyContent,
      },
    },
  },
});
