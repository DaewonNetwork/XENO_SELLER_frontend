"use client"

import UserInfoCard from '@/(FSD)/entities/seller/ui/UserInfoCard'
import ProductListBtn from '@/(FSD)/widgets/product/ui/ProductListBtn'

import React, { useState } from 'react'
import QuestionBtn from './QuestionBtn'
import ProductCreateBtn from '../../product/ui/ProductCreateBtn'
import DarkModeSelectBtn from './DarkModeSelectBtn'
import { Button } from '@nextui-org/button'
import ProductImageCheckModal from '@/(FSD)/entities/product/ui/ProductImageCheckModal'

import TextMediumShared from '@/(FSD)/shareds/ui/TextMediumShared'
import { useRouter } from 'next/navigation'
import SellerProductStockUpdateBtn from './SellerProductStockUpdateBtn'

import SellerProductShippingUpdateBtn from './SellerProductShippingUpdateBtn'
import SellerProductSalesListBtn from './SellerProductSalesListBtn'

const SellerProFileContainer = () => {

    const [checkOpen, setCheckOpen] = useState<boolean>(false);
    const router = useRouter();
    return (
        <>

            {checkOpen && (
                <ProductImageCheckModal
                    setCheckOpen={setCheckOpen}

                />
            )}

            <UserInfoCard />

            <ProductCreateBtn />

            <SellerProductStockUpdateBtn />

            <SellerProductShippingUpdateBtn />

            <Button style={{ marginBottom: "10px" }} onClick={() => setCheckOpen(true)} size={"sm"}
                className="w-full h-[100px] bg-white border-2" radius="none"
            ><TextMediumShared>업로드한 이미지 조회하기</TextMediumShared></Button>

            <ProductListBtn />

            <SellerProductSalesListBtn />

            <QuestionBtn />

            {/* <DarkModeSelectBtn/> */}
        </>
    )
}

export default SellerProFileContainer
