import { Prisma } from "@/config/prisma.config";
import { encryptData } from "@/utils/crypto-utils";
import axios from "axios";

class PicPayRepository {
    public async updateToken(store_reference: string, picpayToken: string, sellerToken: string) {
        return await Prisma.picPay.create({
            data: {
                store_reference,
                picpayToken: encryptData(picpayToken),
                sellerToken: encryptData(sellerToken),
            },
        });
    }

    public async getTokens(store_reference: string) {
        return await Prisma.picPay.findFirst({
            where: {
                store_reference: store_reference,
            }
        })
    }

    public async getPayment(payment_id: string, token: string) {
        const response = await axios.get(`https://appws.picpay.com/ecommerce/public/payments/${payment_id}/status`, {
            headers: {
                "x-picpay-token": token,
            }
        });
        const data = response.data;
        return data
    }

    public async generateLink(preferences: any, picpaytoken: string) {
        const response = await axios.post("https://appws.picpay.com/ecommerce/public/payments", preferences, {
            headers: {
                "Content-Type": "application/json",
                "x-picpay-token": picpaytoken,
            },
        });
        return response
    }
}

export default new PicPayRepository()