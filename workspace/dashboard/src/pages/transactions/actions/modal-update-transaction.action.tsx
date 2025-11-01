import { useState } from "react";
import { useForm } from "react-hook-form";
import useTransactions from "../hook";

export const ModalUpdateTransactionAction = () => {
    const [showUpdateTransactionModal, setShowModalUpdateTransaction] = useState(false);
    const showModalTransactionAction = () => {
        setShowModalUpdateTransaction(true);
    };

    const closeModalTransactionAction = () => {
        setShowModalUpdateTransaction(false);
    };

    return { showModalTransactionAction, closeModalTransactionAction, showUpdateTransactionModal }
}

export const TransactionUpdateAction = () => {
    const { register, handleSubmit, setValue } = useForm();
    const {ProviderUpdateTransaction} = useTransactions()
    
    const onSubmit = (data: any) => {
        ProviderUpdateTransaction(data)
    };

    return { register, handleSubmit, setValue, onSubmit }
}