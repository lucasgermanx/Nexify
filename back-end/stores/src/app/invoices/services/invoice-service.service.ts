import storeRepository from "@/app/store/repositories/store.repository";
import subscriptionRepository from "@/app/store/repositories/subscription.repository";
import invoiceRepository from "../repositories/invoice-repository";

export const InvoiceWebhookService = (dataPayload) => {
    console.log(dataPayload.event)
    const eventHandlers: Record<string, (payment) => Promise<void>> = {
        'PAYMENT_CREATED': handlePaymentCreated,
        'PAYMENT_CONFIRMED': handlerPaymentConfirmed,
        'PAYMENT_OVERDUE': handlePaymentOverdue,
        'PAYMENT_RECEIVED': handlePaymentReceived,
        'PAYMENT_REFUNDED': handlerPaymentRefunded
    };

    const handler = eventHandlers[dataPayload.event];
    if (handler) {
        return handler(dataPayload.payment);
    } else {
        return
    }
}

const handlePaymentCreated = async (paymentData: any) => {
    const findSubscription = await subscriptionRepository.getSubscriptionBySubscriptionID(paymentData.subscription);

    if (!findSubscription) {
        console.error("Falha na criação do pagamento (findSubscription)")
        return;
    }

    const findInvoice = await invoiceRepository.findInvoiceBySubscriptionID(paymentData.subscription)

    if (findInvoice) {
        return;
    }

    await invoiceRepository.create(paymentData);
    return
}

const handlerPaymentConfirmed = async (paymentData) => {
    const findSubscription = await subscriptionRepository.getSubscriptionBySubscriptionID(paymentData.subscription);
    if (!findSubscription) {
        return;
    }
    await invoiceRepository.updateInvoice(paymentData.id, {
        status: paymentData.status,
        invoiceUrl: paymentData.invoiceUrl || 'Sem dados',
        invoiceNumber: paymentData.invoiceNumber || 'Sem dados',
        paymentDate: paymentData.paymentDate || 'Sem dados',
        creditDate: paymentData.creditDate || 'Sem dados',
        billingType: paymentData.billingType,
        creditCardNumber: parseInt(paymentData?.creditCard?.creditCardNumber) ? parseInt(paymentData?.creditCard?.creditCardNumber) : null,
        creditCardBrand: paymentData?.creditCard?.creditCardBrand ? paymentData?.creditCard?.creditCardBrand : null,
        transactionReceiptUrl: paymentData.transactionReceiptUrl || 'Sem dados',
    });
    await subscriptionRepository.updateStatusBySubscriptionID(paymentData.subscription, 'ACTIVE')
    await storeRepository.storeUpdateStatus(paymentData.externalReference, 'activated')
}

const handlePaymentOverdue = async (payment: any) => {
    const findSubscription = await subscriptionRepository.getSubscriptionBySubscriptionID(payment.subscription);
    if (!findSubscription) {
        return;
    }
    await invoiceRepository.updateInvoice(payment.id, { status: payment.status });
    await subscriptionRepository.updateStatusBySubscriptionID(payment.subscription, 'EXPIRED')
    await storeRepository.storeUpdateStatus(payment.externalReference, 'expired')
}

const handlePaymentReceived = async (payment: any) => {
    const findSubscription = await subscriptionRepository.getSubscriptionBySubscriptionID(payment.subscription);
    if (!findSubscription) {
        return;
    }
    await invoiceRepository.updateInvoice(payment.id, {
        status: payment.status,
        invoiceUrl: payment.invoiceUrl || 'Sem dados',
        invoiceNumber: payment.invoiceNumber || 'Sem dados',
        paymentDate: payment.paymentDate || 'Sem dados',
        creditDate: payment.creditDate || 'Sem dados',
        billingType: payment.billingType,
        creditCardNumber: parseInt(payment?.creditCard?.creditCardNumber) ? parseInt(payment?.creditCard?.creditCardNumber) : null,
        creditCardBrand: payment?.creditCard?.creditCardBrand ? payment?.creditCard?.creditCardBrand : null,
        transactionReceiptUrl: payment.transactionReceiptUrl || 'Sem dados',
    });
    await subscriptionRepository.updateStatusBySubscriptionID(payment.subscription, 'ACTIVE')
    await storeRepository.storeUpdateStatus(payment.externalReference, 'activated')
}

const handlerPaymentRefunded = async (payment: any) => {
    const findSubscription = await subscriptionRepository.getSubscriptionBySubscriptionID(payment.subscription);
    if (!findSubscription) {
        return;
    }
    await invoiceRepository.updateInvoice(payment.id, {
        status: payment.status,
        refundReceiptUrl: payment.transactionReceiptUrl || 'Sem dados',
    });
    await subscriptionRepository.updateStatusBySubscriptionID(payment.subscription, 'INACTIVE')
    await storeRepository.storeUpdateStatus(payment.externalReference, 'cancelled')
}