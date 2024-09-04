import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import { useEffect, useState } from "react";
import { apiPath } from "@/(FSD)/shareds/fetch/APIpath";

const reviewCreateFetch = async (data: FormData) => {

    const accessToken = localStorage.getItem("access_token");


    const response = await fetch(`${apiPath}/api/review/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: data,
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    const responseData = await response.json();

    return responseData;
}

export const useReviewCreate = ({ onSuccess, onError }: MutationType) => {
    return useMutation({
        mutationFn: (data: FormData) => {
            return reviewCreateFetch(data);
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