import { env } from '@/environments/env';
import * as winston from 'winston';

const customLogLevels = {
    levels: {
        error: 1,
        warn: 2,
        info: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    colors: {
        error: 'red',
        warn: 'orange',
        info: 'yellow',
        debug: 'blue',
        verbose: 'white',
        silly: 'purple'
    }
};

export const logger = winston.createLogger({
    level: "debug",
    levels: customLogLevels.levels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.align()
    ),
    transports: [
        new winston.transports.File({
            filename: `./logs/os-debug.log`,
            level: 'debug'
        }),
        new winston.transports.File({
            filename: `./logs/os-info.log`,
            level: 'info'
        }),
        new winston.transports.File({
            filename: `./logs/os-warn.log`,
            level: 'warning'
        }),
        new winston.transports.File({
            filename: `./logs/os-error.log`,
            level: 'error',
            handleExceptions: true
        })
    ]
});

if (env.MODE !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.colorize(),
                winston.format.align(),
                winston.format.printf(info => {
                    let msg = `${info.timestamp}`;
                    msg = `${msg}: ${info.level}`;
                    msg = `${msg}: ${info.message.trim()}`;
                    return msg;
                })
            )
        })
    );
}

winston.addColors(customLogLevels.colors);
logger.debug('Logger: Iniciado com sucesso');