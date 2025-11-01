import React from "react";
import { TransactionsContextType } from "./@types";
import { TransactionContext } from "./provider";

export default function useTransactions(){
    const context =  React.useContext(TransactionContext) as TransactionsContextType
    return context
}