import { Rabbit } from "@/config/rabbit.config";

class RabbitMQRepository {

    public async createChannel(queueName: string) {
        const { ConnectionRabbit, ChannelRabbit } = await Rabbit();
        await ChannelRabbit.assertExchange('fivemarket', 'direct');
        await ChannelRabbit.assertQueue(queueName);
        await ConnectionRabbit.close();
    }

    public async sendMessageToQueue(queueName: string, message: any) {
        try {
            const { ConnectionRabbit, ChannelRabbit } = await Rabbit();
            const jsonMessage = JSON.stringify(message);
            await ChannelRabbit.bindQueue(queueName, 'fivemarket', queueName);
            await ChannelRabbit.publish('fivemarket', queueName, Buffer.from(jsonMessage));
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}

export default new RabbitMQRepository()