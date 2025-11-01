
interface CartItem {
  product_reference: string;
  quantity: number;
  variable: string;
}

export interface ICart {
  cart: CartItem[];
  store_reference: string;
  coupon: string;
  buyer: string;
}

export interface IPaymentResponse {
  failed: boolean;
  message: string;
  url: string;
}

export type PaymentsContextType = {
  MercadoPagoGenerateLink: (cart:ICart) => void;
  PicPayGenerateLink: (cart:ICart) => void; 
};
