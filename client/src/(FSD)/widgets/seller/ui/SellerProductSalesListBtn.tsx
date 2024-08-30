"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { orderDownload } from "@/(FSD)/entities/product/api/useProductListExcelDownload";
import { Input } from "@nextui-org/input";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { DateRangePicker } from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";

const SellerProductSalesListBtn = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [value, setValue] = React.useState({
        start: parseDate("2024-04-01"),
        end: parseDate("2024-04-08"),
    });


    let formatter = useDateFormatter({ dateStyle: "long" });

    // const [startYear, setStartYear] = useState<number>(2024);
    // const [startMonth, setStartMonth] = useState<number>(1);
    // const [startDay, setStartDay] = useState<number>(1);
    // const [endYear, setEndYear] = useState<number>(2024);
    // const [endMonth, setEndMonth] = useState<number>(12);
    // const [endDay, setEndDay] = useState<number>(31);
    const { end, start } = value;

    const endDay = end.day;
    const endMonth = end.month;
    const endYear = end.year;

    const startDay = start.day;
    const startMonth = start.month;
    const startYear = start.year;

    // 주문 다운로드 처리 함수
    const handleDownload = async () => {
        try {
            await orderDownload({ startYear, startMonth, startDay, endYear, endMonth, endDay });
        } catch (error) {
            console.error('다운로드 중 오류 발생:', error);
        }
    };

    return (
        <>
            <Button style={{ marginBottom: "10px" }} onClick={onOpen} size={"sm"} className="w-full h-[100px] bg-white border-2" radius="none" endContent={<IconShared iconType={isOpen ? "top" : "bottom"} />}>
                <TextMediumShared>판매 내역 보기</TextMediumShared>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">판매 내역</ModalHeader>
                            <ModalBody>

                                <DateRangePicker
                                    label="Date range (controlled)"
                                    value={value}
                                    onChange={setValue}
                                    visibleMonths={2}
                                    pageBehavior="single"
                                />

                                <Button
                                    fullWidth
                                    size={"lg"}
                                    type={"button"}
                                    variant={"ghost"}
                                    onClick={handleDownload}
                                    style={{ marginBottom: '16px' }}  // 버튼 아래에 여백 추가
                                >
                                    판매 내역 다운 받기 
                                </Button>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
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

export default SellerProductSalesListBtn;
