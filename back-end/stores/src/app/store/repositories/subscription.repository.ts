import { Prisma } from "@/config/prisma.config";
import { ISubscriptionCreateEntity } from "@/interfaces/subscription-create.interface";

class SubscriptionRepository {
    public async saveSubscription(subscriptionPayload: ISubscriptionCreateEntity): Promise<any> {
        return Prisma.subscriptions.create({
            data: {
                customer_id: subscriptionPayload.customer,
                store_reference: subscriptionPayload.externalReference,
                subscription_id: subscriptionPayload.id,
                cycle: subscriptionPayload.cycle,
                status: subscriptionPayload.status,
                value: subscriptionPayload.value,
                deleted: subscriptionPayload.deleted,
            },
        });
    }

    public async cancel(subscription_id: string): Promise<any> {
        return Prisma.subscriptions.update({
            where: {
                subscription_id,
            },
            data: {
                deleted: true,
                status: 'INACTIVE',
            },
        });
    }

    public async getSubscriptionByStoreReference(store_reference: string) {
        return await Prisma.subscriptions.findFirst({
            where: {
                store_reference
            }
        })
    }

    public async getSubscriptionBySubscriptionID(subscription_id: string) {
        return await Prisma.subscriptions.findFirst({
            where: {
                subscription_id
            }
        })
    }

    public async updateStatusBySubscriptionID(subscription_id: string, status: string) {
        return await Prisma.subscriptions.update({
            where: {
                subscription_id
            },
            data: {
                status
            }
        })
    }

    public async getLastInvoiceBySubscription(store_reference: string) {
        return await Prisma.subscriptions.findFirst({
            where: {
                store_reference,
            },
            include: {
                invoices: {
                    where: {
                        status: "PENDING",
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                },
            },
        });
    }
}

export default new SubscriptionRepository();
