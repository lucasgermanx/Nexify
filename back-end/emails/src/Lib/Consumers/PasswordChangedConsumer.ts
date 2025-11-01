import { PasswordChangedService } from "../Services/PasswordChangedService";
import { Rabbit } from "@/Config/Rabbit";

export const PasswordChangedConsumer = async () => {
    const { ChannelRabbit } = await Rabbit();
    await ChannelRabbit.consume('password_changed', (msg:any) => {
        if (msg) {
            PasswordChangedService(msg.content.toString())
            ChannelRabbit.ack(msg);
        }
    }, { noAck: false })
}