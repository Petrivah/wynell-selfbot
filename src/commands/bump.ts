import { Message } from 'discord.js';
import { CronJob } from 'cron';

import logger from '../logger';

const tasks: Record<string, CronJob> = {};

export default (message: Message, task?: string, ...rest: string[]): void => {
  const [rawCommand] = message.content.split(' ');
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
  } else if (task === 'plan') {
    try {
      tasks[taskID] = new CronJob(rest.join(' '), () => message.channel.send(rawCommand));
    } catch (e) {
      logger.error(`Incorrect cron pattern (channel: ${message.channel.id}, content: "${message.content}")`);
    }
  }
};