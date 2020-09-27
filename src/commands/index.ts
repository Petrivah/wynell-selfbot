import { Message } from 'discord.js';

import bump from './bump';

export default (message: Message, argv: string[]): void => {
  const [name, ...args]: [string?, ...string[]] = argv;
  switch (name) {
    case 'bump':
      return bump(message, ...args);
    default:
      return;
  }
}