import transactionsRepository from "@/app/payments/transactions/repositories/transactions.repository";
import { Rabbit } from "@/config/rabbit.config";

export const TransactionsConsumer = async () => {
    const { ChannelRabbit } = await Rabbit();

    await ChannelRabbit.consume('fivemarket_callback', async (msg: any) => {
        if (msg) {
            const data = JSON.parse(msg.content.toString())

            if (data) {
                if (data.status == "delivered") {
                    const transactions = await transactionsRepository.getTransactionByReference(data?.transaction_reference)

                    if (transactions?.length == 0) {

                    }

                    for (let x in transactions) {
                        await transactionsRepository.transactionDelivered(transactions[x]?.id)
                    }
                }
            }
            ChannelRabbit.ack(msg);
        }
    }, { noAck: false })

}