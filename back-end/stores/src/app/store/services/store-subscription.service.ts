import subscriptionRepository from "../repositories/subscription.repository"

export const StoreSubscription = async (store_reference: string) => {
    const findSubscription = await subscriptionRepository.getLastInvoiceBySubscription(store_reference)
    return {
        failed: false,
        status: 200,
        subscription: findSubscription,
        message: "Assinatura recuperada com sucesso!"
    }
}