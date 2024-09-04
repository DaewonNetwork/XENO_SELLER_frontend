"use client";

import React from "react";
import ProductCardSlideList from "./ProductCardSlideList";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import Link from "next/link";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { ProductType } from "@/(FSD)/shareds/types/product/Product.type";
import ProductCardList from "./ProductCardList";
import { useProductRankListRead } from "@/(FSD)/entities/product/api/useProductRankListRead";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";

const ProductRankOuterList = () => {
    const { data } = useProductRankListRead({ type: "아우터" });

    const productCardList: ProductType[] = data;

    if(!productCardList) return <></>;

    return (
        <div className={styles.product_rank_container}>
            <div className={styles.rank_box}>
                <TextLargeShared>아우터 인기 순위</TextLargeShared>
                {(productCardList.length > 10) && <Link href={"/rank/pants"}><TextSmallShared>더보기</TextSmallShared></Link>}
            </div>
            {(productCardList.length <= 3) && <ProductCardList productList={productCardList} isRank={true} />}
            {(productCardList.length > 3) && <ProductCardSlideList productList={productCardList} isRank={true} />}
            {(!productCardList.length) && <div className={styles.un_box}><TextMediumShared className={"text-default-400"}>상품이 존재하지 않습니다.</TextMediumShared></div>}
        </div>
    );
};

export default ProductRankOuterList;