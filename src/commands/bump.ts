import { Message } from 'discord.js';

export default (message: Message, ...args: string[]): void => {
  message.delete();
};