export interface IStoreCreate {
    user_reference: string;
    customer_reference?: string;
    store_name: string;
    store_subdomain: string;
    store_money_type: string;
    store_plan: string;
    due_date?: string;
}
