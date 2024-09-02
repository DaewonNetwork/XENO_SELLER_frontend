'use client'

import { apiPath } from "@/(FSD)/shareds/fetch/APIpath";
import { useEffect, useState } from "react";



export const download = async () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);

    try {
        const response = await fetch(`${apiPath}/api/product/download/excel`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Blob 객체로 응답을 처리
        const blob = await response.blob();
        
        // Blob을 URL로 변환
        const url = window.URL.createObjectURL(blob);
        
        // 다운로드 링크를 생성
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products.xlsx'); // 파일 이름 설정
        
        // 링크를 클릭하여 다운로드 시작
        document.body.appendChild(link);
        link.click();
        
        // 링크를 DOM에서 제거
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error fetching and downloading the Excel file:', error);
        throw error; // 필요에 따라 에러를 처리합니다.
    }
};

export const newDownload = async () => {

    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);
    

    try {
        const response = await fetch(`${apiPath}/api/product/download/new-excel`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Blob 객체로 응답을 처리
        const blob = await response.blob();
        
        // Blob을 URL로 변환
        const url = window.URL.createObjectURL(blob);
        
        // 다운로드 링크를 생성
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products.xlsx'); // 파일 이름 설정
        
        // 링크를 클릭하여 다운로드 시작
        document.body.appendChild(link);
        link.click();
        
        // 링크를 DOM에서 제거
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error fetching and downloading the Excel file:', error);
        throw error; // 필요에 따라 에러를 처리합니다.
    }
};

export const stockDownload = async () => {

    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);
    


    try {
        const response = await fetch(`${apiPath}/api/product/download/stock-excel`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Blob 객체로 응답을 처리
        const blob = await response.blob();
        
        // Blob을 URL로 변환
        const url = window.URL.createObjectURL(blob);
        
        // 다운로드 링크를 생성
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'stock.xlsx'); // 파일 이름 설정
        
        // 링크를 클릭하여 다운로드 시작
        document.body.appendChild(link);
        link.click();
        
        // 링크를 DOM에서 제거
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error fetching and downloading the Excel file:', error);
        throw error; // 필요에 따라 에러를 처리합니다.
    }
};

export const paymentCompletedOrderDownload = async () => {

    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);
    

    
    try {
        const response = await fetch(`${apiPath}/api/orders/download/order-shipping-excel`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Blob 객체로 응답을 처리
        const blob = await response.blob();
        
        // Blob을 URL로 변환
        const url = window.URL.createObjectURL(blob);
        
        // 다운로드 링크를 생성
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'orderList.xlsx'); // 파일 이름 설정
        
        // 링크를 클릭하여 다운로드 시작
        document.body.appendChild(link);
        link.click();
        
        // 링크를 DOM에서 제거
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error fetching and downloading the Excel file:', error);
        throw error; // 필요에 따라 에러를 처리합니다.
    }
};


interface DayType {
    startYear: number;
    startMonth: number;
    startDay: number;
    endYear: number;
    endMonth: number;
    endDay: number;
}

export const orderDownload = async (
    { startYear, startMonth, startDay, endYear, endMonth, endDay }: DayType
): Promise<void> => {

    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);
    
    
    try {
        const response = await fetch(`${apiPath}/api/orders/download/order-excel?startYear=${startYear}&startMonth=${startMonth}&startDay=${startDay}&endYear=${endYear}&endMonth=${endMonth}&endDay=${endDay}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Blob 객체로 응답을 처리
        const blob = await response.blob();
        
        // Blob을 URL로 변환
        const url = window.URL.createObjectURL(blob);
        
        // 다운로드 링크를 생성
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'orderList.xlsx'); // 파일 이름 설정
        
        // 링크를 클릭하여 다운로드 시작
        document.body.appendChild(link);
        link.click();
        
        // 링크를 DOM에서 제거
        document.body.removeChild(link);

        // Blob URL을 해제하여 메모리 누수를 방지
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Error fetching and downloading the Excel file:', error);
        throw error; // 필요에 따라 에러를 처리합니다.
    }
};




