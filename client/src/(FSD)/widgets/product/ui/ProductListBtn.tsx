"use client"

import { useProductBySellerRead } from "@/(FSD)/entities/product/api/useProductBySellerRead";
import React, { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { useRecoilState } from "recoil";
import { productListState } from "@/(FSD)/shareds/stores/ProductAtom";
interface ProductColorCreateBtnType {
    productId: number;
    productNumber: string;
    productName: string;
}

const ProductListBtn = () => {
    const { data, isError, error, isPending } = useProductBySellerRead();
    const [productList, setProductList] = useRecoilState(productListState);
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [values, setValues] = React.useState(new Set([]));

    useEffect(() => {

    }, [data]);

    const productInfoList: ProductColorCreateBtnType[] = data || [];




    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const handleSetProductList = (values: Set<never>) => {
        setProductList(values);
        router.push('/seller/product/update-image')
    }

    return (
        <>

            <Button style={{ marginBottom: "10px" }} onClick={onOpen} size={"sm"} className="w-full h-[100px] bg-white border-2" radius="none" endContent={<IconShared iconType={isOpen ? "top" : "bottom"} />}><TextMediumShared>
                등록한 상품의 이미지 수정하기</TextMediumShared></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">상품 목록</ModalHeader>
                            <ModalBody>



                                {productInfoList.length > 0 ? (
                                    // @ts-ignore
                                    <Select selectionMode="multiple" label="최대 5개까지 선택 가능해요." selectedKeys={values} onSelectionChange={setValues} >
                                        {productInfoList.map(product => (
                                            <SelectItem key={product.productNumber}
                                            >
                                                상품 고유 코드 : {product.productId} 품번 : {product.productNumber} 상품 이름 : {product.productName}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                ) : (
                                    ""
                                )}
                                <p className="text-small text-default-500">품번 : {Array.from(values).join(", ")}</p>
                                <Button onClick={() => handleSetProductList(values)}>확인</Button>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    닫기
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
};

export default ProductListBtn;