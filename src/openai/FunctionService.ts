import Discord from 'discord.js';
import type { ChatCompletionCreateParams, ChatCompletionMessage } from 'openai/resources/chat';

import getUserInfo from './functions/getUserInfo';
import getCurrentServerDetails from './functions/getCurrentServerDetails';
import getHelpChannel from './functions/getHelpChannel';
import getNPMPackage from './functions/getNPMPackage';

export interface ChatFunction {
  execute: (params: unknown) => Promise<string> | string;
  data: ChatCompletionCreateParams.Function;
}

export interface HandleFunctionParams {
  functionCall: ChatCompletionMessage.FunctionCall;
  interaction?: Discord.Interaction;
  message?: Discord.Message;
}

export class FunctionService {
  static collection = new Discord.Collection<string, ChatFunction>();

  static get array() {
    return this.collection.map((f) => f.data);
  }

  static async execute(fn: string | ChatFunction, options: HandleFunctionParams) {
    const functionName = typeof fn === 'string' ? fn : fn.data.name;
    if (!this.collection.has(functionName)) return null;

    const params = JSON.parse(options.functionCall.arguments || '{ }');

    const result = await this.collection.get(functionName)!.execute({
      ...options,
      ...params,
    });

    return result;
  }
}

const functions = {
  getUserInfo,
  getCurrentServerDetails,
  getHelpChannel,
  getNPMPackage,
};

Object.values(functions).forEach((fn) => FunctionService.collection.set(fn.data.name, fn));
