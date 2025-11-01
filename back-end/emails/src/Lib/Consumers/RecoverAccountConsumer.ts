import { Rabbit } from "@/Config/Rabbit";
import { RecoverAccountService } from "../Services/RecoverAccountService";

export const RecoverAccountConsumer = async () => {
    const { ChannelRabbit } = await Rabbit();

    await ChannelRabbit.consume('recover_account', (msg:any) => {
        if (msg) {
            RecoverAccountService(msg.content.toString())
            ChannelRabbit.ack(msg);
        }
    }, { noAck: false })
}