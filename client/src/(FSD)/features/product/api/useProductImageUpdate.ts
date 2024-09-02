import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import { useEffect, useState } from "react";
import { apiPath } from "@/(FSD)/shareds/fetch/APIpath";

interface ProductCreateData {
    formData: FormData;
    index: number;
}

export interface ProductCreateResponse {
    responseData: any;
    index: number;
}

const productCreateFetch = async (data: ProductCreateData): Promise<ProductCreateResponse> => {
    const { formData, index } = data;
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);

    const response = await fetch(`${apiPath}/api/product/update/image`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const responseData = await response.json();

    return { responseData, index };
}

export const useProductImageUpdate = ({ onSuccess, onError }: MutationType): UseMutationResult<ProductCreateResponse, Error, ProductCreateData> => {
    return useMutation({
        mutationFn: (data: ProductCreateData) => {
            return productCreateFetch(data);
        },
        onSuccess: (data: ProductCreateResponse) => {
            onSuccess(data.index);
        },
        onError: (error: Error) => {
            if (onError) {
                onError();
            }
        }
    });
};
