import { Rabbit } from "@/Config/Rabbit";
import { WelcomeService } from "../Services/WelcomeService";

export const WelcomeConsumer = async () => {
  const { ChannelRabbit } = await Rabbit();

  await ChannelRabbit.consume(
    "welcome",
    (msg: any) => {
      console.log(msg);
      if (msg) {
        WelcomeService(msg.content.toString());
        ChannelRabbit.ack(msg);
      }
    },
    { noAck: false }
  );
  console.log("Consumers - WelcomeConsumers");
};
