// rabbit.ts

import amqp from 'amqplib';
import { env } from './env';

interface RabbitConnection {
  ConnectionRabbit: amqp.Connection;
  ChannelRabbit: amqp.Channel;
}

export const Rabbit = async (): Promise<RabbitConnection> => {
  try {
    const ConnectionRabbit = await amqp.connect(env.RABBIT_URL as string);
    const ChannelRabbit = await ConnectionRabbit.createChannel();

    return { ConnectionRabbit, ChannelRabbit };
  } catch (error) {
    throw error;
  }
};
