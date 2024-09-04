"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProductCardList from "./ProductCardList";
import { useProductRankPageRead } from "@/(FSD)/entities/product/api/useProductRankPageRead";

const ProductRankPantsPage = () => {
    const { productCardList, fetchNextPage, refetch, isFetchingNextPage, isPending, isError } = useProductRankPageRead({ type: "하의" });

    const { ref, inView } = useInView();

    useEffect(() => {
        refetch();
    }, [productCardList]);

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    if (isError) return <></>;
    if (!productCardList) return <></>;



    return (
        <ProductCardList productList={productCardList} parentRefetch={refetch} lastCard={<div ref={ref} />} />

    );
};

export default ProductRankPantsPage;