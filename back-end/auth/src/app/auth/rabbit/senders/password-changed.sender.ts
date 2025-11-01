import { Rabbit } from "@/config/rabbit.config";

export const PasswordChangedSender = async (
  data: string,
  emailQueue: string
) => {
  const { ChannelRabbit } = await Rabbit();

  const exchange = "email_exchange";
  const message = JSON.stringify(data);

  await ChannelRabbit.assertExchange(exchange, "direct");
  await ChannelRabbit.assertQueue(emailQueue);
  await ChannelRabbit.bindQueue(emailQueue, exchange, emailQueue);
  ChannelRabbit.publish(exchange, emailQueue, Buffer.from(message));
};
