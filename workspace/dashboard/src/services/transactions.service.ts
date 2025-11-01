import { ITransactionDataResponse } from "@/pages/transactions/@types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

class TransactionService {
  public async getTransactionsData(token: string, store_reference: string): Promise<ITransactionDataResponse> {
    const response = await axios.get(`${API_URL}/store/transactions/data/${store_reference}`, {
      headers: {
        authorization: `${token}`,
      },
    });

    return response.data;
  }

  public async getAllTransaction(token: string, store_reference: string, page:string, pageSize:string): Promise<ITransactionDataResponse> {
    const response = await axios.get(`${API_URL}/store/transactions/list/${store_reference}/?page=${page}&size=${pageSize}`, {
      headers: {
        authorization: `${token}`,
      },
    });

    return response.data;
  }

  public async filterTransactions(token: string, store_reference: string, filter:string, page:string, pageSize:string): Promise<ITransactionDataResponse> {
    const response = await axios.get(`${API_URL}/store/transactions/filter/${store_reference}/${filter}/?page=${page}&size=${pageSize}`, {
      headers: {
        authorization: `${token}`,
      },
    });

    return response.data;
  }

  public async updateTransaction(token:string, data:any): Promise<ITransactionDataResponse> {
    const response = await axios.post(`${API_URL}/store/transaction/update`, {
      ...data,
      automatic_update: data?.automatic_update == "true" ? true : false
    },{
      headers: {
        authorization: `${token}`,
      },
    });

    return response.data;
  }
}

export default new TransactionService()