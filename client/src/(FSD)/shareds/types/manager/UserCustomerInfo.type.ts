export interface UserInfo {
    userId: number;
    email: string;
    name: string;
    phoneNumber: string;
    address: string;
    roles: string[];
    customerId?: number;
    point?: number;
    level?: string;
}