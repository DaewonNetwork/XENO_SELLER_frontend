"use client";

import React from "react";
import ProductOrderModal from "./ProductOrderModal";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { Button } from "@nextui-org/button";
import AppInner from "../../app/ui/AppInner";
import ProductLikeBtn from "@/(FSD)/features/product/ui/ProductLikeBtn";
import { useDisclosure } from "@nextui-org/modal";
import { useParams } from "next/navigation";

const ProductOrderBar = () => {
    const { productId } = useParams<{ productId: string }>();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className={styles.product_order_bar}>
                <AppInner>
                    <div className={styles.bar_inner}>
                        <div className={styles.left_btn}>
                            <ProductLikeBtn productId={+productId} />
                        </div>
                        <div className={styles.right_btn}>
                            <Button onClick={onOpen} size={"lg"} radius={"sm"} className={`bg-foreground text-background`} fullWidth>구매하기</Button>
                        </div>
                    </div>
                </AppInner>
            </div>
            <ProductOrderModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
};

export default React.memo(ProductOrderBar);