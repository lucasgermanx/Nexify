export interface ISubscriptionCreate {
    customer: string;
    nextDueDate: string;
    value: string;
    cycle: string;
    description: string;
    externalReference: string;
}

export interface SubscriptionEntity {
    customer: string;
    nextDueDate: string;
    value: string;
    cycle: string;
    description: string;
}

export interface ISubscriptionCreateEntity {
    customer: string;
    externalReference: string;
    id: string;
    cycle: string;
    status: string;
    value: number;
    deleted: boolean;
}

export interface ISubscriptionUpdate {
    id: string;
    value: string;
    description: string;
}