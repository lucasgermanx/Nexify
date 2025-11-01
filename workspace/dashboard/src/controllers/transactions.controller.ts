import { ITransactionDataResponse } from "@/pages/transactions/@types";
import transactionsService from "@/services/transactions.service";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class TransactionController {
  public async getDataTransactions(store_reference:string): Promise<ITransactionDataResponse | undefined> { 
    const token = cookies.get("fm_token");
    if (!token) return undefined;
    return await transactionsService.getTransactionsData(token, store_reference);
  }

  public async getAllTransactions(store_reference:string, page:string, pageSize:string): Promise<ITransactionDataResponse | undefined> { 
    const token = cookies.get("fm_token");
    if (!token) return undefined;
    return await transactionsService.getAllTransaction(token, store_reference, page, pageSize);
  }

  public async filterTransactions(store_reference:string, filter:string, page:string, pageSize:string): Promise<ITransactionDataResponse | undefined> { 
    const token = cookies.get("fm_token");
    if (!token) return undefined;
    return await transactionsService.filterTransactions(token, store_reference, filter, page, pageSize);
  }

  public async updateTransaction(data:any): Promise<ITransactionDataResponse | undefined> { 
    const token = cookies.get("fm_token");
    if (!token) return undefined;
    return await transactionsService.updateTransaction(token, data);
  }
}

export default new TransactionController();
