import React, { useState } from "react";

import { useForm } from "react-hook-form";
import useTransactions from "../hook";

export const TransactionsActions = () => {
    const { register, watch } = useForm();
    const {ProviderGetAllTransactions, transactions, paginationFilter, ProviderFilterTransactions} = useTransactions()
    const [isFiltering, setFiltering] = useState(false);
  
    const handlePageChange = (pageNumber: string) => {
      if (!isFiltering) {
        ProviderGetAllTransactions(pageNumber);
      } else {
        ProviderFilterTransactions(pageNumber, watch("value"));
      }
    };
  
    React.useEffect(() => {
      if (watch("value")?.length != 0) {
        setFiltering(true);
        ProviderFilterTransactions('1', watch("value"));
      } else {
        setFiltering(false);
        ProviderGetAllTransactions('1');
      }
    }, [watch("value")]);
  
    return { transactions, paginationFilter, register, ProviderGetAllTransactions, handlePageChange };
  };
  