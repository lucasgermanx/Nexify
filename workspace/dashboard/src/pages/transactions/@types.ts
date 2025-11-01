import { IPagination } from "@/@types/general.type";

export interface ITransactionDataResponse {
  failed: boolean;
  transaction_data?: {
    transactions_approved: string;
    transactions_pending: string;
    order_delivered: string;
    order_not_delivered: string;
  };
  chart_data?: any;
  transactions?:any
  message: string;
  paginationCount: number;
  hasMoreResults: boolean;
}

export type TransactionsContextType = {
  ProviderGetDataTransactions: () => void;
  transactionData:{
    transactions_approved: string;
    transactions_pending: string;
    order_delivered: string;
    order_not_delivered: string;
  }
  chartData:any
  transactions: any;
  paginationFilter: IPagination | undefined;
  ProviderGetAllTransactions: (page:any) => void;
  ProviderFilterTransactions: (page:any, filter:string) => void;
  ProviderUpdateTransaction: (data:any) => void;
};
