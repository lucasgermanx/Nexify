export interface ICoupon {
    id: number;
    store_reference: string;
    reference: string;
    coupon: string;
    coupon_discount: number;
    limited_used: number;
    used: number;
    type: "direct" | "percentage" | string; // Adicione outros tipos conforme necessário
    activated: boolean;
    createdAt: string; // Formato de data e hora, pode ser um tipo Date
    updatedAt: string; // Formato de data e hora, pode ser um tipo Date
  }
  
  export interface ICouponsResponse {
    failed: boolean;
    coupons: ICoupon[];
    message: string;
    paginationCount: number;
    hasMoreResults: boolean;
  }
  
  export interface IPagination {
    paginationCount: number,
    hasMoreResults: boolean
  }
  
  export interface IUpdateCoupon{
    store_reference?: string;
    coupon_reference: string;
    coupon: string;
    coupon_discount: number;
    limited_used: number;
    used: number;
    type: "direct" | "percentage" | string;
    activated: boolean;
  }
  
  export interface ICreateCoupon{
    store_reference?: string;
    coupon: string;
    coupon_discount: number;
    limited_used: number;
    type: "direct" | "percentage" | string;
  }
  
  export interface IUpdateStatusCoupon{
    coupon_reference: string;
    activated: boolean;
    store_reference: string;
  }
  
  export type CouponsContextType = {
    coupons: ICoupon[] | [] | undefined;
    paginationFilter: IPagination | undefined;
    ProviderGetAllCoupons: (page:string) => void;
    ProviderFilterCupons: (value:string, page:string) => void;
    ProviderDeleteCoupon: (coupon_reference:string) => void;
    ProviderUpdateStatusCoupon: (activated:boolean, coupon_reference:string) => void;
    ProviderUpdateCoupon: (updateData:IUpdateCoupon) => void;
    ProviderCreateCoupon: (coupon:ICreateCoupon) => void;
  };
  