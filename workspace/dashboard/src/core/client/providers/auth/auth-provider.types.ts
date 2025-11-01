export interface User {
    id: number;
    user_reference: string;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    status: "active" | "inactive";
}

export interface UserResponse {
    failed: boolean;
    user: User;
}

export interface AuthContextType {
    user: any;
    loggoutAccount: () => void;
}