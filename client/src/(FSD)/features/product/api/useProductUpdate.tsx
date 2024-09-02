import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import { useEffect, useState } from "react";
import { apiPath } from "@/(FSD)/shareds/fetch/APIpath";

const productUpdateFetch = async (data: any) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);

    const response = await fetch(`${apiPath}/api/product/update`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
             'Content-Type': 'application/json'
        },
        body:  JSON.stringify(data),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    const responseData = await response.json();

    return responseData;
}

export const useProductUpdate = ({ onSuccess, onError }: MutationType) => {
    return useMutation({
        mutationFn: (data: FormData) => {
            return productUpdateFetch(data);
        },
        onSuccess: (data: any) => {
            onSuccess(data);
        },
        onError: _ => {
            if (onError) {
                onError();
            }
        }
    });
};