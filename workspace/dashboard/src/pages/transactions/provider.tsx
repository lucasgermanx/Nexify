/* eslint-disable */

import React, { useState } from "react";

import { IPagination } from "@/@types/general.type";
import transactionsController from "@/controllers/transactions.controller";
import { useManageStore } from "@/core/client/hooks/select-store-zuustand";
import { toast } from "sonner";
import { TransactionsContextType } from "./@types";

export const TransactionContext = React.createContext<TransactionsContextType | null>(null);

export const TransactionProvider = (props: any) => {
    const {store_reference} = useManageStore()
    const [transactionData, setTransactionData] = useState( {
        "transactions_approved": '0',
            "transactions_pending": '0',
            "order_delivered":'0',
            "order_not_delivered":'0'
      })

    const [chartData, setChartData] = useState<any>()
    const [transactions, setTransactions] = useState<any>()
    const [paginationFilter, setPaginationFilter] = useState<IPagination>()
    
    const ProviderGetDataTransactions = async () => {
        try {
            if(!store_reference)
                return
            
            const response = await transactionsController.getDataTransactions(store_reference)
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível criar sua postagem. Tente novamente mais tarde!");
            }

            //@ts-ignore
            setTransactionData(response?.transaction_data)
            setChartData(response?.chart_data)
        } catch (error) {
           console.log(error)
        }
    }

    const ProviderGetAllTransactions = async (page:string) => {
        try {
            if(!store_reference)
                return
            const response = await transactionsController.getAllTransactions(store_reference, page ? page : '1', '12')
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível criar sua postagem. Tente novamente mais tarde!");
            }

            setTransactions(response.transactions)
            setPaginationFilter({
                paginationCount: response.paginationCount,
                hasMoreResults: response.hasMoreResults
              })
        } catch (error) {
           console.log(error)
        }
    }

    const ProviderFilterTransactions = async (page:string, filter:string) => {
        try {
            if(!store_reference)
                return
            const response = await transactionsController.filterTransactions(store_reference, filter, page ? page : '1', '1')
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível criar sua postagem. Tente novamente mais tarde!");
            }

            setTransactions(response.transactions)
            setPaginationFilter({
                paginationCount: response.paginationCount,
                hasMoreResults: response.hasMoreResults
              })
        } catch (error) {
           console.log(error)
        }
    }

    const ProviderUpdateTransaction = async (data:any) => {
        try {
            if(!store_reference)
                return
            const response = await transactionsController.updateTransaction(data)
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível criar sua postagem. Tente novamente mais tarde!");
            }

            ProviderGetAllTransactions('1')
            toast.success(response?.message)
        } catch (error) {
           console.log(error)
        }
    }

    React.useEffect(()=>{
        ProviderGetDataTransactions()
        ProviderGetAllTransactions('1')
    }, [store_reference])

    return (
        <TransactionContext.Provider value={{ProviderGetDataTransactions, ProviderGetAllTransactions, ProviderFilterTransactions, ProviderUpdateTransaction, transactionData, chartData, transactions, paginationFilter}}>
            {props.children}
        </TransactionContext.Provider>
    );
};
