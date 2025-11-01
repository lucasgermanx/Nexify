import { ICustomerCreate } from "@/interfaces/customer.interface";
import customerRepository from "../repositories/customer.repository";

export const CustomerCreateService = async (dataPayload:ICustomerCreate) => {
    const getCustomer = await customerRepository.getCustomer(dataPayload.email, dataPayload.cpf)

    if (getCustomer.totalCount != 0) {
        return {
            failed: true,
            message: "Ops! Parece que os dados informados já estão registrados na base de dados da Asaas. Tente alterar os dados e tente novamente.",
        }
    }

    const createCustomer = await customerRepository.createCustomer(dataPayload)

    if (createCustomer.id == undefined) {
        return {
            failed: true,
            message: "Ops! Parece que o usuário não foi registrado no sistema da Asaas. Tente novamente."
        }
    }

    return {
        customer_id: createCustomer.id,
        status: "created"
    }
}