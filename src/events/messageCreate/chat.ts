import { Event } from 'discord-sucrose';
import { ChannelType, MessageType } from 'discord.js';
import { MessageService, FunctionService, specificConversationChannelTypes } from '../../openai/openai';
import { ChatGPTService } from '../../openai/ChatGPTService';

export default new Event('messageCreate', {
  label: 'chat',

  execute: async ({ args: [msg] }) => {
    const { content } = msg;
    if (msg.author.bot || !content.length) return;

    const channelType = msg.channel.type;

    if (channelType !== ChannelType.DM) {
      // Check if the bot is mentionned or called
      const isMentionned = msg.mentions.users.has(msg.client.user!.id);
      const isCalled = /sucrose/.test(content.toLowerCase());
      const isReplyMessage = msg.type === MessageType.Reply;
      const isReplyToMe = isReplyMessage && (
        await msg.channel.messages.fetch(msg.reference!.messageId!).catch(() => null)
      )?.author.id === msg.client.user!.id;
      if (!isMentionned && !isCalled && !isReplyToMe) return;
    }

    // Start typing
    msg.channel.sendTyping();

    // Get conversation
    const isSpecificConversation = specificConversationChannelTypes.includes(channelType);
    const conversationId = isSpecificConversation ? msg.channel.id : msg.author.id;

    // Create conversation if it doesn't exist
    if (conversationId && !MessageService.conversations.has(conversationId)) {
      MessageService.createConversation(conversationId);
    }

    // Add user message to the list
    MessageService.addMessage({ role: 'user', content: `${msg.author.id} ${content}` }, conversationId);

    // Send message to OpenAI
    const response = await ChatGPTService.send({
      user: msg.author.id,
      messages: MessageService.getMessages(conversationId),
    });

    // Add response message to the list
    const responseMessage = response.choices[0].message;
    MessageService.addMessage(responseMessage, conversationId);

    // If the response is a function call, execute it
    if (responseMessage.function_call) {
      // Execute the function
      const result = await FunctionService.execute(responseMessage.function_call.name, {
        functionCall: responseMessage.function_call,
        message: msg,
      });

      // If the function returns a result, send it
      if (result) {
        // Add function result message to the list
        MessageService.addMessage({ role: 'function', content: result, name: responseMessage.function_call.name }, conversationId);

        // Send function result message
        const response2 = await ChatGPTService.send({
          user: msg.author.id,
          messages: MessageService.getMessages(conversationId),
          functions: undefined,
        });

        // Add response message to the list
        const response2Message = response2.choices[0].message;
        MessageService.addMessage(response2Message, conversationId);

        // Reply to the user
        await msg.reply(response2Message.content!);
      }
    } else await msg.reply(responseMessage.content!); // Reply to the user
  },
});
