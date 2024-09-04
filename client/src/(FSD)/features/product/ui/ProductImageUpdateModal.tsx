"use client";

import React, { useEffect, useState } from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import { Button } from "@nextui-org/button";

import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { productDetailImageState, productImagesState } from "@/(FSD)/shareds/stores/ProductCreateAtome";
import FileInputShared1 from "@/(FSD)/shareds/ui/FileInputShared1";

import FileDetailImageInputShared from "@/(FSD)/shareds/ui/FileDetailImageInputShared";
import { useProductImagesReadByProductNumber } from "@/(FSD)/entities/product/api/useProductImagesRead";
import { UploadImageReadDTO } from "@/(FSD)/widgets/order/ui/OrderInfoListBtn";
import { isUrlState } from "@/(FSD)/shareds/stores/ProductAtom";


interface ProductImageCreateModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    files: File[] | null;
    detailFile: File | null;
    index: number;
    productNumber: string;
}



const ProductImageUpdateModal = ({ setIsOpen, files, detailFile, index, productNumber }: ProductImageCreateModalProps) => {
    const [productImages, setProductImages] = useRecoilState(productImagesState);
    const setProductDetailImage = useSetRecoilState(productDetailImageState);
    const { data } = useProductImagesReadByProductNumber(productNumber);

    const [isUrl, setIsUrl] = useRecoilState(isUrlState)

    const image: UploadImageReadDTO = data || null

    const [img1, setImg1] = useState<File>();
    const [img2, setImg2] = useState<File>();
    const [img3, setImg3] = useState<File>();
    const [img4, setImg4] = useState<File>();
    const [img5, setImg5] = useState<File>();
    const [img6, setImg6] = useState<File>();
    const [productDetailImg, setProductDetailImg] = useState<File>();

    if (!data || !image) { return <></> }


    const handleClick = () => {
        setProductImages((prevImages: any) => {
            const updatedImages = [...prevImages];
            updatedImages[index] = [img1, img2, img3, img4, img5, img6]
            return updatedImages;
        });
        setProductDetailImage((prevImages: any) => {
            const updatedDetailImages = [...prevImages];
            updatedDetailImages[index] = productDetailImg || null;
            return updatedDetailImages;
        });
        setIsOpen(false);
    };

    return (
        <div className={`bg-background ${styles.product_image_create_modal}`}>
            <AppFixedTopBar>
                <AppTitleHeader
                    title={"이미지 등록하기"}
                   
                />
            </AppFixedTopBar>
            <AppSection>
                <AppInner>
                    <TextMediumShared>상품 이미지</TextMediumShared>
                    <div className={styles.img_input_box}>

                        <FileInputShared1
                            inputId={"product_img1"}
                            setFile={setImg1}
                            file={files?.[0] || undefined}
                            url={isUrl[index][0] && image.url_1 != null ? image.url_1 : undefined}
                            blockIdx={index}
                            index={0}
                        />
                        <FileInputShared1
                            inputId={"product_img2"}
                            setFile={setImg2}
                            file={files?.[1] || undefined}
                            url={isUrl[index][1] && image.url_2 != null ? image.url_2 : undefined}
                            blockIdx={index}
                            index={1}
                        />
                        <FileInputShared1
                            inputId={"product_img3"}
                            setFile={setImg3}
                            file={files?.[2] || undefined}
                            url={isUrl[index][2] && image.url_3 != null ? image.url_3 : undefined}
                            blockIdx={index}
                            index={2}
                        />
                        <FileInputShared1
                            inputId={"product_img4"}
                            setFile={setImg4}
                            file={files?.[3] || undefined}
                            url={isUrl[index][3] && image.url_4 != null ? image.url_4 : undefined}
                            blockIdx={index}
                            index={3}
                        />
                        <FileInputShared1
                            inputId={"product_img5"}
                            setFile={setImg5}
                            file={files?.[4] || undefined}
                            url={isUrl[index][4] && image.url_5 != null ? image.url_5 : undefined}
                            blockIdx={index}
                            index={4}
                        />
                        <FileInputShared1
                            inputId={"product_img6"}
                            setFile={setImg6}
                            file={files?.[5] || undefined}
                            url={isUrl[index][5] && image.url_6 != null ? image.url_6 : undefined}
                            blockIdx={index}
                            index={5}
                        />
                    </div>

                    <TextMediumShared>상세 이미지</TextMediumShared>
                    <FileDetailImageInputShared inputId={"product_detail_img"}
                        setFile={setProductDetailImg} file={detailFile || undefined}
                        url={isUrl[index][6] && image.detailUrl != null ? image.detailUrl : undefined}
                        blockIdx={index}
                        index={6}
                        height={230} />

                    <Button isDisabled={!img1 || !productDetailImg} onClick={handleClick} size={"lg"} fullWidth color={"primary"}>완료</Button>
                  
                </AppInner>
            </AppSection>
        </div>
    )
}

export default ProductImageUpdateModal;