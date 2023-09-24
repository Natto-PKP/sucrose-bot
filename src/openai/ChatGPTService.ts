import type { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from 'openai/resources/chat';
import {
  FunctionService, MessageService, configMessages, openai,
} from './openai';

const DEFAULT_MODEL = 'gpt-3.5-turbo';
const DEFAULT_TEMPERATURE = 0.9;
const DEFAULT_PRESENCE_PENALTY = -0.5;
const DEFAULT_MAX_TOKENS = 300;

export class ChatGPTService {
  static async send(
    options: Partial<ChatCompletionCreateParamsNonStreaming> = { },
  ) {
    const messages = options.messages || MessageService.getMessages();

    const result = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      max_tokens: DEFAULT_MAX_TOKENS,
      temperature: DEFAULT_TEMPERATURE,
      presence_penalty: DEFAULT_PRESENCE_PENALTY,
      messages,
      functions: FunctionService.array,
      ...options,
    });

    return result;
  }

  static async ask(
    message: ChatCompletionMessageParam,
    options: Partial<ChatCompletionCreateParamsNonStreaming> = { },
  ) {
    const messages = options.messages || [...configMessages];
    return ChatGPTService.send({ ...options, messages: [...messages, message] });
  }
}
