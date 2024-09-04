"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductColorRead } from "../../../entities/product/api/useProductColorRead";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import ProductInfo from "@/(FSD)/widgets/product/ui/ProductInfo";
import ProductImageSlideList from "@/(FSD)/widgets/product/ui/ProductImageSlideList";
import { useSetRecoilState } from "recoil";
import { nameState } from "@/(FSD)/shareds/stores/ProductAtom";
import ProductOtherColorImageList from "./ProductOtherColorImageList";
import ReviewInfoList from "../../review/ui/ReviewInfoList";
import ProductDetailImage from "./ProductDetailImage";

const ProductInfoContainer = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data, isError, error, isPending, refetch } = useProductColorRead(+productId);

    const setName = useSetRecoilState(nameState);

    const productInfo: ProductInfoType = data;

    useEffect(() => {
        console.log(productInfo)
        refetch();
    }, [productId, data,refetch]);

    if (!productInfo) return <></>;

    setName(productInfo.name);

    return (
        <>
            <ProductImageSlideList productImageList={productInfo.productImages} />
            <ProductInfo product={productInfo} />
            {productInfo.booleanColor && (<ProductOtherColorImageList />)}
            <ProductDetailImage productId={productId} />
            <ReviewInfoList productId={productId} />
        </>
    );
};

export default ProductInfoContainer;