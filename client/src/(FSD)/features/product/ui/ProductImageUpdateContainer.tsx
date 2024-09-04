'use client'

import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { isUrlState, productListState } from "@/(FSD)/shareds/stores/ProductAtom";
import { Button } from "@nextui-org/button";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import ProductImageCreateModal from "./ProductImageCreateModal";
import { productDetailImageState, productImagesState } from "@/(FSD)/shareds/stores/ProductCreateAtome";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import { Input } from "@nextui-org/input";
import ProductImageUpdateModal from "./ProductImageUpdateModal";
import { imagesState } from "@/(FSD)/shareds/stores/PreviewAtom";
import { ProductCreateResponse, useProductImageUpdate } from "../api/useProductImageUpdate";
export interface ProductImageInfoType {
    imageId: number;
    productImage: string | null;
    filename: string | null;
}

interface ProductNumber {
    productNumber: string;
    // 다른 속성들...
}

const ProductImageUpdateContainer = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [productList, setProductList] = useRecoilState(productListState);
    const [formBlocks, setFormBlocks] = useState<number[]>([productList.size]);
    const [productImages, setProductImages] = useRecoilState(productImagesState);
    const [productDetailImage, setProductDetailImage] = useRecoilState(productDetailImageState);
    const [isUrl, setIsUrl] = useRecoilState(isUrlState);

    const { mutate } = useProductImageUpdate({
        onSuccess: (index) => {
            // 성공 시 알림
            alert(`${index + 1} 번째 블록이 성공적으로 업로드되었습니다!`);
        },
        onError: () => {
            // 실패 시 알림
            alert("블록 업로드에 실패했습니다.");
        },
    });

    
    const productListArray = Array.from(productList);
    
    const onSubmit = async () => {
        let allSuccess = true;

        for (let i = 0; i < formBlocks.length; i++) {
            const formData = new FormData();

            formData.append("productNumber", productListArray[i]);

            productImages[i]?.forEach((image: File) => {
                if (image) {
                    formData.append(`productImages`, image);
                }
            });

            if (productDetailImage[i]) {
                formData.append(`productDetailImage`, productDetailImage[i]);
            }

            // 업로드를 비동기적으로 처리
            await new Promise<void>((resolve, reject) => {
                mutate(
                    { formData, index: i },
                    {
                        onSuccess: () => {
                            resolve();
                        },
                        onError: () => {
                            allSuccess = false;
                            reject();
                        }
                    }
                );
            }).catch(() => {
                allSuccess = false;
            });
        }

        if (allSuccess) {
            alert("모든 블록이 성공적으로 업로드되었습니다!");
        } else {
            alert("일부 블록의 업로드에 실패했습니다.");
        }
    };

    useEffect(() => {
        // productListArray를 사용하여 새 formBlocks 생성
        const newFormBlocks = productListArray.map((_, i) => i + 1);
        setFormBlocks(newFormBlocks);
       
        // 각 블록을 길이 7로 초기화된 배열로 설정
        const updatedIsUrl = newFormBlocks.map(() => Array(7).fill(true));
        setIsUrl(updatedIsUrl);
    }, [productList]);

    return (
        <>
            {formBlocks.map((block, idx) => (
                <React.Fragment key={idx}>
                    <TextMediumShared isLabel={true} htmlFor={`productNumber-${idx}`}>품번</TextMediumShared>
                    <Input
                    isDisabled
                        isClearable
                        size={"lg"}
                        variant={"flat"}
                        radius={"none"}
                        placeholder={Array.from(productList)[idx] || ""} // 변환된 배열에서 인덱스 접근
                    />
                    <TextMediumShared>이미지</TextMediumShared>
                    <Button
                        onClick={() => {
                            setIsOpen(true);
                            setIndex(idx);
                        }}
                        fullWidth size={"lg"} type={"button"} variant={"ghost"}
                    >
                        이미지 수정하기
                    </Button>
                   
                </React.Fragment>
            ))}
            <br />

            {isOpen && (
                <ProductImageUpdateModal
                    setIsOpen={setIsOpen}
                    files={productImages[index] || []}
                    detailFile={productDetailImage[index] || null}
                    index={index}
                    productNumber={productListArray[index]}
                />
            )}

            <Button
                fullWidth size={"lg"}
                type={"button"} color={"primary"}
                onClick={onSubmit} // 모든 폼 블록을 한 번에 제출
            >
                이미지 업로드하기
            </Button>
           
        </>
    );
};

export default ProductImageUpdateContainer;
