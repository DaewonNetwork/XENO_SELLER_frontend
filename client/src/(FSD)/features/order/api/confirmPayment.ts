// utils/confirmPayment.ts

const secretKey = 'test_sk_PBal2vxj814Q4P6pa7vkr5RQgOAN'; // 여기에 실제 시크릿 키를 입력하세요
const base64Secret = btoa(`${secretKey}:`); // 시크릿 키를 Base64로 인코딩

export const confirmPayment = async ({
    amount,
    orderId,
    paymentKey,
}: {
    amount: number;
    orderId: string;
    paymentKey: string;
}): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
        const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${base64Secret}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                orderId,
                paymentKey,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || '결제 승인 요청 실패';
            return {
                success: false,
                message: errorMessage
            };
        }

        const data = await response.json();
        return {
            success: true,
            data: data
        };

    } catch (error) {
        console.error('결제 승인 오류:', error);
        throw new Error('결제 승인에 실패했습니다.');
    }
};
