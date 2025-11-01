/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from "react";

import useProducts from "@/core/client/hooks/products.hook";
import storeReference from "@/core/client/utils/set-store-reference.utils";
import { useParams } from "react-router-dom";

export const productActions = () => {
    const { product_reference } = useParams();
    const {ProviderGetProduct, filterProducts, ProviderGetVariableByProduct, variables} = useProducts()
    const [selectedOption, setSelectedOption] = useState('');
    const {store_reference} = storeReference()
    
    useEffect(() => {
        ProviderGetProduct('1', product_reference || '')
    }, [product_reference, store_reference])

    useEffect(() => {
        ProviderGetVariableByProduct(filterProducts?.[0].variables || '')
    }, [filterProducts, store_reference])

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    return {filterProducts: filterProducts?.[0], variables, handleSelectChange, selectedOption}
}