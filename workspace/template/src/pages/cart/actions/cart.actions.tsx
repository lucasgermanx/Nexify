/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from "react";

import { ICart } from "@/core/server/@types/payments.type";
import notifyCart from "@/global/zustand/notify-cart";
import secureLocalStorage from "react-secure-storage";
import storeReference from "@/core/client/utils/set-store-reference.utils";
import { toast } from "sonner";
import useCoupon from "@/core/client/hooks/coupon.hook";
import usePayment from "@/core/client/hooks/payment.hook";

export const cartActions = () => {
  const [formOfPayments, setFormOfPayments] = useState<any>();
  const [coupon_name, setCoupon] = useState("");
  const [buyer, setBuyer] = useState("");
  const { coupon, ProviderGetCoupon } = useCoupon()
  const { store_reference } = storeReference()
  const [cart, setCart] = useState<any>(
    JSON.parse(`${secureLocalStorage.getItem("cart") || "[]"}`)
  );
  const { setQuantityCart } = notifyCart()
  const { MercadoPagoGenerateLink, PicPayGenerateLink } = usePayment()

  useEffect(() => {
    secureLocalStorage.setItem("cart", JSON.stringify(cart));
    const cartLength = JSON.parse(secureLocalStorage.getItem("cart") as any) || [];
    const totalQuantity = cartLength.reduce((total: any, item: any) => total + item.quantity, 0);
    setQuantityCart(totalQuantity)
  }, [cart]);

  const handleDeleteItem = (idToDelete: string) => {
    const updatedCart = cart.filter((item: any) => item.id !== idToDelete);
    setCart(updatedCart);
    toast.success("Produto removido com sucesso!")
  };

  const handleIncrementQuantity = (idToIncrement: string) => {
    const updatedCart = cart.map((item: any) =>
      item.id === idToIncrement
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  const handleDecrementQuantity = (idToDecrement: string) => {
    const updatedCart = cart.map((item: any) =>
      item.id === idToDecrement
        ? {
          ...item,
          quantity: Math.max(item.quantity - 1, 1), // Prevent quantity from going below 1
        }
        : item
    );
    setCart(updatedCart);
  };

  const handleCouponDiscount = (totalValue: any, coupon: any) => {
    if (!coupon) {
      return 0;
    }

    if (coupon.type === "percentage") {
      return (totalValue * coupon.coupon_discount) / 100;
    } else if (coupon.type === "direct") {
      return coupon.coupon_discount;
    }

    return 0;
  };

  const totalValue = cart.reduce((total: number, item: any) => {
    console.log(item);

    const itemPrice =
      item.product_price_discount === "0" || item.product_price_discount === ""
        ? parseFloat(item.product_price)
        : parseFloat(item.product_price_discount);

    return total + parseFloat(item.quantity) * itemPrice;
  }, 0);


  console.log(totalValue)

  const handlerCoupon = () => {
    if (cart.length == 0) {
      return
    }
    ProviderGetCoupon(coupon_name)
  }

  const handlerGeneratePayments = () => {
    if (!buyer) {
      toast.warning("O comprador não foi definido! Defina antes de continuar.")
    }

    const cart = JSON.parse(secureLocalStorage.getItem("cart") as any) || [];

    const cartData = cart.map((product: any) => ({
      product_reference: product.product_reference,
      quantity: product.quantity,
      variable: product.variable
    }));

    const data: ICart = {
      cart: [
        ...cartData
      ],
      store_reference: store_reference || '',
      coupon: coupon?.reference || '',
      buyer
    }

    if (formOfPayments == 'mercadopago') {
      MercadoPagoGenerateLink(data)
    }

    if (formOfPayments == 'picpay') {
      PicPayGenerateLink(data)
    }
  };

  return { cart, totalValue, handleCouponDiscount, handleDecrementQuantity, handleDeleteItem, handleIncrementQuantity, setCoupon, setBuyer, buyer, formOfPayments, setFormOfPayments, handlerCoupon, coupon, handlerGeneratePayments }
};
