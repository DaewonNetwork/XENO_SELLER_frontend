"use client";

import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { AppModalType } from "../../app/types/AppModal.type";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import CartListAddBtn from "@/(FSD)/features/cart/ui/CartListAddBtn";
import { useParams } from "next/navigation";
import { useProductColorOrderBarRead } from "@/(FSD)/entities/product/api/useProductColorOrderBarRead";
import { Select, SelectItem } from "@nextui-org/select";

interface ProductOrderModalProps extends AppModalType { };

const ProductOrderModal = ({ isOpen, onOpenChange }: ProductOrderModalProps) => {
    const { productId } = useParams<{ productId: string }>();

    const { data, isError, isPending } = useProductColorOrderBarRead(+productId);

    if (!data) return <></>;

    console.log(data.orderInfo);


    return (
        <Modal
            disableAnimation
            size={"2xl"}
            classNames={{
                base: `rounded-none rounded-t-medium ${styles.product_order_modal_base}`,
                wrapper: styles.product_order_modal_wrapper,
            }} isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={styles.modal_header} onClick={onClose}>
                            <div className={`bg-default ${styles.bar_line}`}></div>
                        </ModalHeader>
                        <ModalBody className={styles.modal_body}>
                            <Select radius={"sm"} size={"md"} placeholder={"옵션을 선택 해주세요."}>
                                {
                                    data.orderInfo.map((option: any) => (
                                        <SelectItem hideSelectedIcon key={option.size}>{option.size} {(option.stock < 5) && ` (${option.stock})`}</SelectItem>
                                    ))
                                }
                            </Select>
                        </ModalBody>
                        <ModalFooter className={styles.modal_footer}>
                            <CartListAddBtn radius={"sm"} variant={"ghost"} size={"lg"} fullWidth productId={+productId} />
                            <Button radius={"sm"} className={"bg-foreground text-background"} size={"lg"} fullWidth>구매하기</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ProductOrderModal;