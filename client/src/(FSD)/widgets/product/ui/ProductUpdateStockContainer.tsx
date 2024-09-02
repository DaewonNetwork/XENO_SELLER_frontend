"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { Button } from "@nextui-org/button";
import { useRecoilState } from "recoil";
import { productDetailImageState, productImagesState } from "@/(FSD)/shareds/stores/ProductCreateAtome";
import { useRouter } from "next/navigation";
import ProductImageCheckModal from "@/(FSD)/entities/product/ui/ProductImageCheckModal";
import { stockDownload } from "@/(FSD)/entities/product/api/useProductListExcelDownload";
import { apiPath } from "@/(FSD)/shareds/fetch/APIpath";





const ProductUpdateStockContainer = () => {
    const router = useRouter();

    const [excelFile, setExcelFile] = useState<File | null>(null);


    const handleExcelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setExcelFile(event.target.files[0]);
        }
    };

  

            const accessToken = localStorage.getItem("access_token");
   


    const handleExcelUpload = async () => {
        if (!excelFile) {
            alert('엑셀 파일을 선택해 주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('excel', excelFile);

        try {
            const response = await fetch(`${apiPath}/api/product/update/stock`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                alert('엑셀 파일 업로드 성공');
                window.location.reload();
            } else {
                const errorText = await response.text();
                alert(`업로드 실패: ${errorText}`);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('엑셀 파일 업로드 중 오류가 발생했습니다.');
        }
    };




    return (
        <>
              <div>
            <Button
                // isDisabled={(!isValid)}
                fullWidth size={"lg"} type={"button"} variant={"ghost"}
                onClick={() => stockDownload()}
                style={{ marginBottom: '16px' }}  // 버튼 아래에 여백 추가
            >
                나의 상품 재고 목록 다운받기
            </Button>
   
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleExcelFileChange}
                style={{ display: 'block', marginBottom: '16px' }}  // 입력 필드 아래에 여백 추가
            />
            
            <Button
                isDisabled={!excelFile}
                fullWidth size={"lg"} type={"button"} variant={"ghost"}
                onClick={handleExcelUpload}
            >
                엑셀 업로드하기
            </Button>
        </div>
        </>
    );
};

export default ProductUpdateStockContainer;
