export interface OrderInfoType {
    orderId: number;
    productId: number;
    orderDate: string;
    brandName: string;
    productName: string;
    size: string;
    color: string;
    status: string;
    amount: number;
    quantity: number;
    review?: boolean
    reviewId?: number;
    productImage: string
}
