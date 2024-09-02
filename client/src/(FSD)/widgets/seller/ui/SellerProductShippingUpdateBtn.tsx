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
import { paymentCompletedOrderDownload } from "@/(FSD)/entities/product/api/useProductListExcelDownload";
import { apiPath } from "@/(FSD)/shareds/fetch/APIpath";
interface ProductColorCreateBtnType {
    productId: number;
    productNumber: string;
    productName: string;
}

const SellerProductShippingUpdateBtn = () => {


    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();



    const [excelFile, setExcelFile] = useState<File | null>(null);


    const handleExcelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setExcelFile(event.target.files[0]);
        }
    };

    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 실행됨
            const token = localStorage.getItem("access_token");
            setAccessToken(token);
        }
    }, []);


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
            <Button style={{ marginBottom: "10px" }} onClick={onOpen} size={"sm"} className="w-full h-[100px] bg-white border-2" radius="none" endContent={<IconShared iconType={isOpen ? "top" : "bottom"} />}><TextMediumShared>
                운송장 등록하기</TextMediumShared></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">운송장 등록</ModalHeader>
                            <ModalBody>
                                <Button
                                    // isDisabled={(!isValid)}
                                    fullWidth size={"lg"} type={"button"} variant={"ghost"}
                                    onClick={() => paymentCompletedOrderDownload()}
                                    style={{ marginBottom: '16px' }}  // 버튼 아래에 여백 추가
                                >
                                    결제 완료 된 주문 목록 다운 받기
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

export default SellerProductShippingUpdateBtn;