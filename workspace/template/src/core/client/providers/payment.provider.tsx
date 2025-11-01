/* eslint-disable */

import { ICart, PaymentsContextType } from "@/core/server/@types/payments.type";

import React from "react";
import paymentController from "@/core/server/controllers/payment.controller";
import secureLocalStorage from "react-secure-storage";
import { toast } from "sonner";

export const PaymentContext = React.createContext<PaymentsContextType | null>(null);

export const PaymentsProvider = (props: any) => {
    const MercadoPagoGenerateLink = async (data: ICart) => {
        try {
            const response = await paymentController.MercadoPagoGenerateLink(data)
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível gerar o link de pagamento! Tente novamente mais tarde.");
            }

            secureLocalStorage.removeItem('cart')
            window.location.replace(response.url);
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    const PicPayGenerateLink = async (data: ICart) => {
        try {
            const response = await paymentController.PicPayGenerateLink(data)
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível gerar o link de pagamento! Tente novamente mais tarde.");
            }

            secureLocalStorage.removeItem('cart')
            window.location.replace(response.url);
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    return (
        <PaymentContext.Provider value={{MercadoPagoGenerateLink, PicPayGenerateLink}}>
            {props.children}
        </PaymentContext.Provider>
    );
};
