export interface IUpdateStore {
    store_reference: string;
    store_name: string;
    store_subdomain: string;
    store_domain?: string;
    maintenance?: boolean
}

export type StoreUpdateEntity = {
    store_reference: string;
    store_domain: string | null;
    store_subdomain: string;
    store_name: string;
    maintenance: boolean | null;
    store_plan: string | null
};