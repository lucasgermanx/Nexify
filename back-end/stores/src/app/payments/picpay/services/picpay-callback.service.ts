import productsRepository from "@/app/products/repositories/products.repository";
import rabbitMqRepository from "@/app/rabbit-mq/rabbit-mq.repository";
import storeRepository from "@/app/store/repositories/store.repository";
import variablesRepository from "@/app/variables/repositories/variables.repository";
import transactionsRepository from "../../transactions/repositories/transactions.repository";
import picpayRepository from "../repositories/picpay.repository";
import { decryptData } from "@/utils/crypto-utils";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const PicPayCallbackService = async (callback: any, store_reference: string) => {
    try {
        if (!callback || !callback.referenceId) {
            console.error("O termo ID não foi recebido: (PicPay)", store_reference);
            return;
        }

        await delay(5000);

        const findStore = await storeRepository.storeFindByReference(store_reference)

        if (!findStore) {
            console.error("Loja não encontrada: (PicPay)", store_reference);
            return;
        }

        const getTokens = await picpayRepository.getTokens(store_reference);
        if (!getTokens) {
            console.error("Tokens não encontrados para a loja: (PicPay)", store_reference);
            return;
        }

        const getPayments = await picpayRepository.getPayment(callback.referenceId, decryptData(getTokens.picpayToken));
        if (!getPayments) {
            console.error("Pagamento não encontrado para o ID: (PicPay)", callback.id);
            return;
        }

        const getTransactions = await transactionsRepository.getTransactionByReference(getPayments.referenceId);
        if (getTransactions.length === 0) {
            console.error("Transação não encontrada para a referência: (PicPay)", getPayments.external_reference);
            return;
        }

        if (getTransactions[0]?.automatic_update !== true) {
            console.log("Atualização automática não permitida para a transação: (PicPay)", getPayments.referenceId);
            return;
        }

        await rabbitMqRepository.createChannel(findStore.store_token);

        for (let x in getTransactions) {
            if (getPayments.status == 'paid') {
                const findProduct = await productsRepository.findProductByReference(store_reference, getTransactions[x].product_reference)
                await productsRepository.updateStock(getTransactions[x].product_reference, parseInt(findProduct[0].product_stock) - parseInt(getTransactions[x].quantity))
            }

            const updateTransaction = await transactionsRepository.updateStatusTransactions(getTransactions[x].id, getPayments.status == "paid" ? "approved" : getPayments.status);

            if (!updateTransaction) {
                console.log("Não foi possível atualizar a transação: (PicPay)");
                return;
            }

            const getVariables = await variablesRepository.findVariableByReference(store_reference, getTransactions[x].variable);

            if (getVariables.length == 0) {
                console.log("Nenhuma variável encontrada (PicPay)");
                return;
            }

            await rabbitMqRepository.sendMessageToQueue(findStore.store_token, {
                transaction_reference: getPayments.referenceId,
                buyer: getTransactions[x].buyer,
                status_payment: getPayments.status == "paid" ? "approved" : getPayments.status,
                variable: {
                    variable_reference: getVariables[0].variable_reference,
                    quantity: getVariables[0].quantity,
                    commands: JSON.parse(getVariables[0].commands)
                }
            });
        }

        console.log("Pagamento atualizado com sucesso. (PicPay)")
        return;
    } catch (error) {
        console.error("Erro ao processar o callback:", error);
    }
};
