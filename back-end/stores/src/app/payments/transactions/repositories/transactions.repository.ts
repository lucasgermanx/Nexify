import { Prisma } from "@/config/prisma.config";

class TransactionsRepository {
    public async createTransactions(transaction: any) {
        return await Prisma.transactions.create({
            data: {
                transaction_reference: transaction.transaction_reference,
                buyer: transaction.buyer,
                store_reference: transaction.store_reference,
                product_reference: transaction.product_reference,
                price_paid: `${transaction.price_paid}`,
                coupon: transaction.coupon,
                coupon_discount: transaction.coupon_discount,
                coupon_type: transaction.coupon_type,
                form_of_payments: transaction.form_of_payments,
                collector_id: transaction.collector_id,
                variable: transaction.variable,
                quantity: transaction.quantity
            }
        })
    }

    public async getTransactionByReference(transaction_reference: string) {
        return await Prisma.transactions.findMany({
            where: {
                transaction_reference
            },
            include: {
                product: true
            }
        })
    }

    public async updateStatusTransactions(id: number, status: string) {
        return await Prisma.transactions.update({
            where: {
                id
            },
            data: {
                status_payment: status
            }
        })
    }


    public async getTransactionByStore(store_reference: string) {
        return await Prisma.transactions.findMany({
            where: {
                store_reference
            },
            include: {
                product: true
            }
        })
    }

    public async totalCount(store_reference: string) {
        return await Prisma.transactions.count({
            where: {
                store_reference: store_reference,
            },
        });
    }

    public async getTransactionById(transaction_id: number) {
        return await Prisma.transactions.findMany({
            where: {
                id: parseInt(`${transaction_id}`)
            },
            include: {
                product: true
            }
        })
    }

    public async updateTransaction(transaction_id: number, data: any) {
        return Prisma.transactions.update({
            where: {
                id: parseInt(`${transaction_id}`)
            },
            data: {
                automatic_update: data.automatic_update,
                status: data.stauts
            }
        })
    }

    public async filterTransactions(filter: string, store_reference: string, skip: number, pageSize: number) {
        return await Prisma.transactions.findMany({
            where: {
                store_reference: store_reference,
                OR: [{
                    transaction_reference: {
                        contains: filter
                    }
                }, {
                    product_reference: {
                        contains: filter
                    }
                }, {
                    buyer: {
                        contains: filter
                    }
                }]
            },
            skip,
            take: pageSize,
            include: {
                product: true
            }
        })
    }

    public async totalCountFilter(store_reference: string, filter: string) {
        return await Prisma.transactions.count({
            where: {
                store_reference: store_reference,
                OR: [{
                    transaction_reference: {
                        contains: filter
                    }
                }, {
                    product_reference: {
                        contains: filter
                    }
                }, {
                    buyer: {
                        contains: filter
                    }
                }]
            },
        });
    }

    public async getTransactionByStorePagination(store_reference: string, skip: number, take: number) {
        return await Prisma.transactions.findMany({
            where: {
                store_reference
            },
            skip,
            take: take,
            include: {
                product: true
            }
        })
    }

    public async transactionDelivered(id: number) {
        return await Prisma.transactions.update({
            where: {
                id: id
            },
            data: {
                order_delivered: true
            }
        })
    }
}

export default new TransactionsRepository()