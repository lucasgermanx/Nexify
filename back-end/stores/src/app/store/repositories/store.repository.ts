import { Prisma } from "@/config/prisma.config";
import { IStoreCreate } from "@/interfaces/store-create.interface";
import { StoreUpdateEntity } from "@/interfaces/store-update.interface";
import { encryptData } from "@/utils/crypto-utils";
import { v4 as uuidv4 } from "uuid";

class StoreRepository {
    public async findStoreBySubdomain(subdomain: string): Promise<any> {
        return await Prisma.stores.findUnique({
            where: {
                store_subdomain: subdomain,
            }
        });
    }

    public async filterStore(value: string): Promise<any[]> {
        return await Prisma.stores.findMany({
            where: {
                OR: [
                    {
                        store_name: {
                            equals: value,
                        },
                    },
                    {
                        store_subdomain: {
                            equals: value,
                        },
                    },
                    {
                        store_domain: {
                            equals: value,
                        },
                    },
                    {
                        store_reference: {
                            equals: value,
                        },
                    },
                    {
                        user_reference: {
                            equals: value || '0',
                        },
                    },
                ],
            },
            include: {
                contents: true,
                mercadopago: true,
                picpay: true
            }
        });
    }

    public async createStore(store: IStoreCreate, reference: string): Promise<any> {
        return await Prisma.stores.create({
            data: {
                ...store,
                store_reference: reference,
                store_subdomain: store.store_subdomain + '.fivemarket.com.br',
                store_token: encryptData(uuidv4()),
                due_date: store.due_date ? new Date(store.due_date) : null,
                contents: {
                    create: [
                        {
                            title: store.store_name,
                            partials: {
                                create: {}
                            }
                        },
                    ],
                },
            }
        });
    }

    public async storeFindByReference(store_reference: string): Promise<any> {
        return await Prisma.stores.findUnique({
            where: {
                store_reference: store_reference
            },
        });
    }

    public async storeWithSameDomain(store_reference: string, store_domain: string): Promise<any> {
        return await Prisma.stores.findFirst({
            where: {
                store_domain: store_domain,
            },
        });
    }

    public async storeWithSameSubdomain(store_reference: string, store_subdomain: string): Promise<any> {
        return await Prisma.stores.findFirst({
            where: {
                store_subdomain: store_subdomain,
            },
        });
    }

    public async storeUpdate(store: StoreUpdateEntity): Promise<any> {
        return await Prisma.stores.update({
            where: {
                store_reference: store.store_reference,
            },
            data: store,
        });
    }

    public async storeUpdateStatus(store_reference: string, status: string): Promise<any> {
        return await Prisma.stores.update({
            where: {
                store_reference: store_reference,
            },
            data: {
                store_status: status
            },
        });
    }
}

export default new StoreRepository