import OpenAI from 'openai';

export * from './FunctionService';
export * from './MessageService';

export const openai = new OpenAI();
