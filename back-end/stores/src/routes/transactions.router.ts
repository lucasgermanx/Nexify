import transactionsController from '@/app/payments/transactions/controllers/transactions.controller';
import { Application } from 'express';

const TransactionsRouter = (app: Application): void => {
    app.get('/store/transactions/data/:store_reference', transactionsController.Transactions);
    app.get('/store/transactions/list/:store_reference', transactionsController.GetTransactions)
    app.post('/store/transaction/update', transactionsController.UpdateTransaction)
    app.get('/store/transactions/filter/:store_reference/:filter', transactionsController.FilterTransactions)
}

export default TransactionsRouter