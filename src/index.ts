import { config } from 'dotenv';
import { Client } from 'discord.js';

import createLogger from './logger';
import runCommand from './commands';

config();

const client = new Client();
const logger = createLogger();

client.on('ready', () => {
  logger.info(`Logged in as ${client.user?.tag}`);
});

client.on('message', (message) => {
  const prefix = process.env.PREFIX ?? '';
  const isCommand = (message.author.id === client.user?.id && message.content.startsWith(prefix));
  if (isCommand) {
    const argv = message.content.slice(prefix.length).split(' ');
    runCommand(message, argv);
  }
});

client.login(process.env.TOKEN);