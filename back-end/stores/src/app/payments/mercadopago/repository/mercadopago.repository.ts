import { Prisma } from "@/config/prisma.config";
import { encryptData } from "@/utils/crypto-utils";
import axios from "axios";

class MercadoPagoRepository {
    public async updateToken(store_reference: string, token: string) {
        return await Prisma.mercadoPago.create({
            data: {
                store_reference,
                access_token: encryptData(token),
            },
        });
    }

    public async getTokens(store_reference: string) {
        return await Prisma.mercadoPago.findFirst({
            where: {
                store_reference: store_reference,
            }
        })
    }

    public async getPayment(payment_id: string, token: string) {
        const response = await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data;
        return data
    }
}

export default new MercadoPagoRepository()