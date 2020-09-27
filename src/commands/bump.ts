import { Message } from 'discord.js';
import { CronJob } from 'cron';

import logger from '../logger';

const tasks: Record<string, CronJob> = {};

export default (message: Message, ...args: string[]): void => {
  const [rawCommand] = message.content.split(' ');
  const [task] = args;
  const taskID = message.channel.id;
  message.delete();
  if (task === 'start') {
    try {
      tasks[taskID].start();
    } catch (e) {
      logger.error(`Unable to start the task (channel: ${message.channel.id}, content: "${message.content}")`);
    }
  } else if (task === 'stop') {
    try {
      tasks[taskID].stop();
    } catch (e) {
      logger.error(`Unable to start the task (channel: ${message.channel.id}, content: "${message.content}")`);
    }
  } else if (task !== undefined) {
    try {
      tasks[taskID] = new CronJob(args.join(' '), () => message.channel.send(rawCommand));
      tasks[taskID].start();
    } catch (e) {
      logger.error(`Incorrect cron pattern (channel: ${message.channel.id}, content: "${message.content}")`);
    }
  }
};