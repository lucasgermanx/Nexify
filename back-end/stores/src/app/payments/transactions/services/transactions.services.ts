import { Transaction, TransactionSummary } from "@/interfaces/transactions.entity";
import transactionsRepository from "../repositories/transactions.repository";


class TransactionsService {
  public async Transactions(store_reference: string) {
    const findTransactions = await transactionsRepository.getTransactionByStore(store_reference);

    function filterTransactionsByStatus(transactions: Transaction[], status: string): Transaction[] {
      return transactions.filter(transaction => transaction.status_payment === status);
    }

    function filterOrderDeliverdByStatus(transactions: Transaction[], status: boolean): Transaction[] {
      return transactions.filter(transaction => transaction.order_delivered === status && transaction.status_payment === "approved");
    }

    function summarizeTransactionsByStatus(transactions: Transaction[], name: string, status_payment: string): TransactionSummary[] {
      // Verificar se não há dados em transactions
      if (transactions.length === 0) {
          const currentDate = new Date().toISOString().split("T")[0];
          return [{
              name,
              data: [{ x: currentDate, y: 0 }]
          }];
      }
  
      const summary: { [key: string]: number } = {};
  
      // Agrupar transações por data e status de pagamento
      for (const transaction of transactions) {
          const { status_payment: transactionStatus, createdAt } = transaction;
          const date = new Date(createdAt).toISOString().split("T")[0];
  
          if (transactionStatus === status_payment) {
              if (!summary[date]) {
                  summary[date] = 0;
              }
  
              summary[date]++;
          }
      }
  
      // Obter todas as datas distintas
      const allDates = [...new Set(transactions.map(transaction => new Date(transaction.createdAt).toISOString().split("T")[0]))];
  
      // Criar o array de objetos de resumo, incluindo todas as datas
      const result: TransactionSummary[] = [{
          name,
          data: allDates.map(date => ({
              x: date,
              y: summary[date] || 0
          })),
      }];
  
      return result;
  }
  

    function getTop5UsedCoupons(transactions: Transaction[]): [string[], number[]] {
      const couponCountMap: { [coupon: string]: number } = {};

      // Contar a ocorrência de cada cupom
      for (const transaction of transactions) {
        const { coupon } = transaction;
        if (coupon) {
          couponCountMap[coupon] = (couponCountMap[coupon] || 0) + 1;
        }
      }

      // Ordenar os cupons com base na contagem
      const sortedCoupons = Object.keys(couponCountMap).sort((a, b) => couponCountMap[b] - couponCountMap[a]);

      // Extrair os 5 primeiros cupons e suas contagens
      const top5Coupons = sortedCoupons.slice(0, 5);
      const top5Counts = top5Coupons.map(coupon => couponCountMap[coupon]);

      return [top5Coupons, top5Counts];
    }

    const [couponNames, couponCounts] = getTop5UsedCoupons(findTransactions);
    return {
      message: "Transações carregadas com sucesso",
      status: 200,
      transaction_data: {
        transactions_approved: filterTransactionsByStatus(findTransactions, "approved").length,
        transactions_pending: filterTransactionsByStatus(findTransactions, "pending").length,
        order_delivered: filterOrderDeliverdByStatus(findTransactions, true).length,
        order_not_delivered: filterOrderDeliverdByStatus(findTransactions, false).length
      },
      chart_data: {
        transactions_approved: summarizeTransactionsByStatus(findTransactions, "Transações aprovadas", "approved"),
        transactions_pending: summarizeTransactionsByStatus(findTransactions, "Transações pendentes", "pending"),
        transactions_in_mediation: summarizeTransactionsByStatus(findTransactions, "Transações em disputa", "in_mediation"),
        transactions_cancelled: summarizeTransactionsByStatus(findTransactions, "Transações canceladas", "cancelled"),
        transactions_refunded: summarizeTransactionsByStatus(findTransactions, "Transações reembolsadas", "refunded"),
        couponNames,
        couponCounts
      }
    }
  }

  public async GetTransactions(store_reference: string, page: number, pageSize: number) {
    if (page <= 0 || pageSize <= 0) {
      return {
        status: 500,
        failed: true,
        message: "Verifique os parâmetros informados!"
      };
    }

    const skip = (page - 1) * pageSize;
    const totalCount = await transactionsRepository.totalCount(store_reference);

    if (totalCount === 0) {
      return {
        failed: false,
        status: 200,
        message: "Nenhuma categoria encontrada.",
        categories: []
      };
    }

    const findTransactions = await transactionsRepository.getTransactionByStorePagination(store_reference, skip, pageSize)

    const hasMoreResults = totalCount > pageSize + skip;
    const paginationCount = Math.ceil(totalCount / pageSize);

    if (findTransactions.length === 0) {
      return {
        failed: true,
        status: 500,
        message: "Não foi possível carregar as transações.",
      };
    }

    return {
      message: "Transações carregadas com sucesso",
      status: 200,
      transactions: findTransactions,
      paginationCount,
      hasMoreResults,
    }
  }

  public async FilterTransaction(store_reference: string, filter:string, page: number, pageSize: number) {
    if (page <= 0 || pageSize <= 0) {
      return {
        status: 500,
        failed: true,
        message: "Verifique os parâmetros informados!"
      };
    }

    const skip = (page - 1) * pageSize;
    const totalCount = await transactionsRepository.totalCountFilter(store_reference, filter);

    if (totalCount === 0) {
      return {
        failed: false,
        status: 200,
        message: "Nenhuma transação encontrada.",
        categories: []
      };
    }

    const findTransactions = await transactionsRepository.filterTransactions(filter, store_reference, skip, pageSize)
        
    const hasMoreResults = totalCount > pageSize + skip;
    const paginationCount = Math.ceil(totalCount / pageSize);

    if (findTransactions.length === 0) {
      return {
        failed: true,
        status: 500,
        message: "Não foi possível carregar as transações.",
      };
    }

    return {
      message: "Transações carregadas com sucesso",
      status: 200,
      transactions: findTransactions,
      paginationCount,
      hasMoreResults,
    }
  }

  public async UpdateTransaction(data: any) {
    const findTransactions = await transactionsRepository.getTransactionById(data.id);

    if (!findTransactions) {
      return {
        failed: true,
        status: 200,
        message: "Transação informada não existe em sua loja.",
      };
    }

    for (let x in findTransactions) {
      let updateTransaction = await transactionsRepository.updateTransaction(findTransactions[x]?.id, { status: data.status, automatic_update: data.automatic_update })
      if (!updateTransaction) {
        return {
          failed: true,
          status: 200,
          message: "Não foi possível atualizar a transação informada.",
        };
      }
    }

    return {
      message: "Transação atualizada com sucesso",
      status: 200
    }
  }
}

export default new TransactionsService()
