"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { useProductOrder } from "../../product/api/useProductAddOrder";
import { reqState } from "@/(FSD)/shareds/stores/ProductAtom";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import { useRouter } from "next/navigation";
import { UserType } from "@/(FSD)/shareds/types/User.type";
import { useUserRead } from "@/(FSD)/entities/user/api/useUserRead";

export interface ProductOrderType {
    orderPayId: string | null;
    productOptionId?: number;
    req: string;
    quantity: number;
    amount: number;
    orderNumber?: number;
}

interface OrderPaymentBtnProps {
    productList: OrderProductInfoType[];
}

const OrderPaymentBtn = ({ productList }: OrderPaymentBtnProps) => {
   
    const router = useRouter();

    const { data } = useUserRead();

   

    const user: UserType = data;

    const generateRandomId = () => {
        const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
        const array = new Uint8Array(length);
        window.crypto.getRandomValues(array);
        return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2)).join("");
    };

    const generateRandomInt = (min: number, max: number): number => {
        const byteArray = new Uint32Array(1);
        window.crypto.getRandomValues(byteArray);
        const randomNum = byteArray[0] / (0xFFFFFFFF + 1);
        return Math.floor(randomNum * (max - min + 1)) + min;
    }


    const generateCustomerKey = (): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=.@';
        let key = '';
        while (!/[\-_=.@]/.test(key) || !/[A-Z]/.test(key) || !/[a-z]/.test(key) || !/[0-9]/.test(key)) {
            key = '';
            for (let i = 0; i < 50; i++) {
                key += chars.charAt(generateRandomInt(0, chars.length - 1));
            }
        }
        return key;
    }

    const orderId = generateRandomId();

    const orderName: string =
        productList.length > 1
            ? `${productList[0]?.name} 외 ${productList.length - 1}건`
            : productList[0]?.name ?? "";

    const totalPrice = productList.reduce((accumulator, product) => accumulator + product.price, 0);

    const escrowProducts = productList.map(product => ({
        id: String(product.productOptionId),
        name: product.name,
        unitPrice: product.price, // 가격
        code: String(product.productOptionId), // 상품 관리 코드
        quantity: product.quantity, // 수량
    }));
    console.log(escrowProducts)

 
     const handleClick = async () => {
        try {
            const customerKey = generateCustomerKey();
            const tossPayments = await loadTossPayments("test_ck_ex6BJGQOVDwZyyR4jxBR3W4w2zNb");

            const payment = tossPayments.payment({ customerKey });

            // 결제 요청
            await payment.requestPayment({
                method: "CARD",
                amount: {
                    currency: "KRW",
                    value: totalPrice
                },
                orderId: orderId,
                orderName: orderName,
                customerEmail: user.email,
                card: {
                    useEscrow: false,
                    flowMode: "DEFAULT",
                    useCardPoint: false,
                    useAppCardOnly: false,
                    escrowProducts: escrowProducts
                },
                successUrl: `${window.location.origin}/payment-success`, // 결제 성공 시 리디렉션할 URL 설정
                failUrl: `${window.location.origin}/payment-fail` // 결제 실패 시 리디렉션할 URL 설정
            });
        } catch (error) {
            console.error("결제 오류", error);
        }
    };


    return (
        <Button size={"lg"} onClick={handleClick} fullWidth color={"primary"}>{totalPrice.toLocaleString()}원 결제하기</Button>
    );
};

export default OrderPaymentBtn;