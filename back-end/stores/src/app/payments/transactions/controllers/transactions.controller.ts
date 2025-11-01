import { Request, Response } from "express";
import transactionsServices from "../services/transactions.services";


class TransactionController{
    public async Transactions(request: Request, response: Response){
        try {
            const {store_reference} = request.params
            const getTransactions = await transactionsServices.Transactions(store_reference)
            return response.status(getTransactions.status).json(getTransactions);
        } catch (error) {
            console.log(error)
        }
    }

    public async GetTransactions(request: Request, response: Response){
        try {
            const {store_reference} = request.params
            const page = parseInt(request.query.page as string) || 1;
            const size = parseInt(request.query.size as string) || 1;
            const getTransactions = await transactionsServices.GetTransactions(store_reference, page, size)
            return response.status(getTransactions.status).json(getTransactions);
        } catch (error) {
            console.log(error)
        }
    }

    public async FilterTransactions(request: Request, response: Response){
        try {
            const {store_reference, filter} = request.params
            const page = parseInt(request.query.page as string) || 1;
            const size = parseInt(request.query.size as string) || 1;
            const getTransactions = await transactionsServices.FilterTransaction(store_reference, filter, page, size)
            return response.status(getTransactions.status).json(getTransactions);
        } catch (error) {
            console.log(error)
        }
    }

    public async UpdateTransaction(request: Request, response: Response){
        try {
            const {id, status, automatic_update} = request.body
            const updateTransaction = await transactionsServices.UpdateTransaction({id, status, automatic_update})
            return response.status(updateTransaction.status).json(updateTransaction);
        } catch (error) {
            console.log(error)
        }   
    }
}

export default new TransactionController()