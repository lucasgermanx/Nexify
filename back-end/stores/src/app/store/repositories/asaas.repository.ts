import { env } from "@/config/env";
import { ISubscriptionCreate, ISubscriptionUpdate } from "@/interfaces/subscription-create.interface";
import axios from "axios";

export class asaasRepository {
    public async createNewSubscription(subscriptionPayload: ISubscriptionCreate) {
        const subscription = await axios.post(`${process.env.ASAAS_API}/subscriptions`, {
            ...subscriptionPayload,
            billingType: 'undefined'
        }, {
            headers: {
                access_token: env.ASAAS_TOKEN
            }
        })
        return subscription.data
    }

    public async cancelSubscription(subscription_id:string) {
        const subscription = await axios.delete(`${process.env.ASAAS_API}/subscriptions/${subscription_id}`, {
            headers: {
                access_token: env.ASAAS_TOKEN
            }
        })
        return subscription.data
    }

    public async updateSubscription(subscriptionPayload: ISubscriptionUpdate) {
        const subscription = await axios.put(`${process.env.ASAAS_API}/subscriptions`, {
            ...subscriptionPayload,
        }, {
            headers: {
                access_token: env.ASAAS_TOKEN
            }
        })
        return subscription.data
    }
}

export default new asaasRepository()