import { createLogger, format, transports } from 'winston';

export default createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({
          level: true
        }),
        format.timestamp({
          format: 'YYYY/MM/DD hh:mm:ss'
        }),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${(level)}]: ${message}`;
        })
      )
    })
  ]
});