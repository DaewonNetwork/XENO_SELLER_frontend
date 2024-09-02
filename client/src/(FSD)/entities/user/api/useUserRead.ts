"use client";

import { apiPath } from "@/(FSD)/shareds/fetch/APIpath";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const userReadFetch = async () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);

    const response = await fetch(`${apiPath}/api/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
    });

    if (!accessToken) {
        return null;
    }

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    const data = await response.json();

    return data;
}
export const useUserRead = () => {
    return useQuery({
        queryKey: ["user_read"],
        queryFn: () => userReadFetch(),
    });
};
