import { ActivationAccountService } from "@/Lib/Services/ActivationAccountService";
import { Rabbit } from "@/Config/Rabbit";

export const ActivationAccountConsumer = async () => {
  const { ChannelRabbit } = await Rabbit();
  await ChannelRabbit.consume(
    "activate_account",
    (msg: any) => {
      if (msg) {
        ActivationAccountService(msg.content.toString());
        ChannelRabbit.ack(msg);
      }
    },
    { noAck: false }
  );
};
