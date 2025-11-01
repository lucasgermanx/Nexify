import { useStore } from "@/core/client/providers/store/store.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const StoreAction = () => {
    const {ProviderStoreDomain} = useStore()
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = (data: any) => {
        ProviderStoreDomain(data)
    };
    return { register, handleSubmit, setValue, onSubmit }
}

export const DomainModalHandler = () => {
    const [showModalDomain, setShowModalDomain] = useState(false);

    const showModalDomainAction = () => {
        setShowModalDomain(true);
    };

    const closeModalDomainAction = () => {
        setShowModalDomain(false);
    };

    return { showModalDomainAction, closeModalDomainAction, showModalDomain }
}