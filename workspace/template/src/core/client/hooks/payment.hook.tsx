import { PaymentContext } from "../providers/payment.provider";
import { PaymentsContextType } from "@/core/server/@types/payments.type";
import React from "react";

export default function usePayment(){
    const context =  React.useContext(PaymentContext) as PaymentsContextType
    return context
}