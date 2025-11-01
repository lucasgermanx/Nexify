import { env } from "@/config/env";
import { ICustomerCreate } from "@/interfaces/customer.interface";
import axios from "axios";

class CustomerRepository {
    public async getCustomer(email: string, cpf: string) {
        const customer = await axios.get(`${process.env.ASAAS_API}/customers?email=${email}&cpfCnpj=${cpf}`, {
            headers:{
                access_token: env.ASAAS_TOKEN
            }
        })
        return await customer.data
    }

    public async createCustomer(dataPayload: ICustomerCreate){
        const  customer = await axios.post(`${process.env.ASAAS_API}/customers`, {
            ...dataPayload,
            cpfCnpj: dataPayload.cpf
        },{
            headers:{
                access_token: env.ASAAS_TOKEN
            }
        })
        return customer.data
    }
}

export default new CustomerRepository()