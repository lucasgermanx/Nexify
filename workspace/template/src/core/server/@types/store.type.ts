export interface Store {
  maintenance: boolean;
  id: number;
  user_id: number;
  store_reference: string;
  store_name: string;
  store_subdomain: string;
  store_domain: string;
  store_status: "active" | "cancelled" | "pending" | string; // Defina os status disponíveis conforme necessário
  store_plan: string;
  store_money_type: string;
  store_trial: boolean;
  store_token: string;
  store_default_payment: string;
  createdAt: string; // Formato de data e hora, pode ser um tipo Date
  updatedAt: string; // Formato de data e hora, pode ser um tipo Date
  contents: [{
    id: number;
    store_reference: string;
    logo: string;
    favicon: string;
    banner: string;
    title: string;
    description: string;
    widget_discord: string;
    widget_fiveM: string;
    createdAt: Date;
    updatedAt: Date;
  }],
  mercadopago: boolean,
  picpay: boolean
}

export interface StoreResponse {
  store: Store[];
  failed: boolean;
  status: number;
  message: string;
  methods_payment_is_configured: {
    mercadopago: true,
    picpay: false
  }
}

export type StoreContextType = {
  store: Store | undefined;
  ProviderGetStore: (address: string) => void;
};

export interface Option {
  value: string;
  label: string;
}