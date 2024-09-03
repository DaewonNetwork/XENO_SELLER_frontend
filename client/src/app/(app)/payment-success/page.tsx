'use client'

import { confirmPayment } from '@/(FSD)/features/order/api/confirmPayment';
import { ProductOrderType } from '@/(FSD)/features/order/ui/OrderPaymentBtn';
import { useProductOrder } from '@/(FSD)/features/product/api/useProductAddOrder';
import { productsState, reqState } from '@/(FSD)/shareds/stores/ProductAtom';
import { OrderProductInfoType } from '@/(FSD)/shareds/types/product/OrderProductInfo.type';
import { useParams, useRouter } from 'next/navigation';
import { off } from 'process';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const PaymentSuccess = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const amount = urlParams.get('amount');
    const orderId = urlParams.get('orderId');
    const paymentKey = urlParams.get('paymentKey');

    const onSuccess = (data: any) => {
        window.location.href = '/complete'
    }
    const req = useRecoilValue(reqState);

    const { mutate } = useProductOrder({ onSuccess });

    useEffect(() => {
        const fetchData = async () => {
            // 쿼리 파라미터가 있는지 확인
            if (!amount || !orderId || !paymentKey) {
                setError('결제 정보를 찾을 수 없습니다.');
                setLoading(false);
                return;
            }
            try {
                const result = await confirmPayment({
                    amount: Number(amount),
                    orderId: String(orderId),
                    paymentKey: String(paymentKey),
                });
       
                if (result.success) {
                    // 결제 성공 시 처리
                    if (typeof window !== 'undefined') {
                        const storedProducts = localStorage.getItem("newProducts");
            
                        
                        if (storedProducts) {
                            // 저장된 제품을 파싱하여 상태를 설정
                            const parsedProducts:OrderProductInfoType[] = JSON.parse(storedProducts);
          
                            const orderInfoList: ProductOrderType[] = parsedProducts.map(product => ({
                                orderPayId: orderId,
                                productOptionId: product.productOptionId,
                                req: req,
                                quantity: product.quantity,
                                amount: product.price,
                                paymentKey: paymentKey
                            }));
                       
                            mutate(orderInfoList);
                            // 예를 들어, useEffect를 사용하여 상태가 업데이트된 후 orderInfoList를 생성
                        } else {
                            alert("잘못된 접근입니다.");
                        }
                    }
                  
                } else {
                    // 결제 실패 시 처리
                    console.error('결제 실패:', result.message);
                }
            } catch (err) {
                setError('결제 승인 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [amount, orderId, paymentKey]);


    if (loading) return <p>결제 승인 중입니다...</p>;
    if (error) return <p>{error}</p>;


};

export default PaymentSuccess;
