import { config } from 'dotenv';
import { Client } from 'discord.js';

import createLogger from './logger';

config();

const client = new Client();
const logger = createLogger();

client.on('ready', () => {
  logger.info(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.TOKEN);