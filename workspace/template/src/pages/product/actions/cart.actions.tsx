import notifyCart from "@/global/zustand/notify-cart";
import secureLocalStorage from "react-secure-storage";
import { toast } from "sonner";

export const cartActions = () => {
  const {setQuantityCart} = notifyCart()
  const addCartHandler = (product: any) => {
    console.log(product)
    const cart = JSON.parse(`${secureLocalStorage.getItem("cart")}`) || [];

    const existingProduct = cart.find((item: any) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    secureLocalStorage.setItem("cart", JSON.stringify(cart));

    const cartLength = JSON.parse(secureLocalStorage.getItem("cart") as any) || [];
    const totalQuantity = cartLength.reduce((total:any, item:any) => total + item.quantity, 0);
    setQuantityCart(totalQuantity)
    
    toast.success("Produto adicionado no carrinho");
  }

  return {addCartHandler}
};
