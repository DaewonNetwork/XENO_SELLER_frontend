"use client"

import UserInfoCard from '@/(FSD)/entities/seller/ui/UserInfoCard'
import ProductListBtn from '@/(FSD)/widgets/product/ui/ProductListBtn'
import ProductOrdersStatusListBtn from '@/(FSD)/widgets/product/ui/ProductOrdersStatusListBtn'
import React, { useState } from 'react'
import QuestionBtn from './QuestionBtn'
import ProductCreateBtn from '../../product/ui/ProductCreateBtn'
import DarkModeSelectBtn from './DarkModeSelectBtn'
import { Button } from '@nextui-org/button'
import ProductImageCheckModal from '@/(FSD)/entities/product/ui/ProductImageCheckModal'
import IconShared from '@/(FSD)/shareds/ui/IconShared'
import TextMediumShared from '@/(FSD)/shareds/ui/TextMediumShared'
import { useRouter } from 'next/navigation'

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
            <Button style={{ marginBottom: "10px" }} onClick={() => router.push('/seller/product/update-stock')} size={"sm"} className="w-full h-[100px] bg-white border-2" radius="none" endContent={<IconShared iconType={checkOpen ? "top" : "bottom"} />}><TextMediumShared>
                상품 재고 수정하기</TextMediumShared></Button>
            <Button style={{ marginBottom: "10px" }} onClick={() => router.push('/seller/product/shipping')} size={"sm"} className="w-full h-[100px] bg-white border-2" radius="none" endContent={<IconShared iconType={checkOpen ? "top" : "bottom"} />}><TextMediumShared>
                운송장 등록하기</TextMediumShared></Button>
            {/* <ProductOrdersStatusListBtn /> */}

            <Button style={{ marginBottom: "10px" }} onClick={() => setCheckOpen(true)} size={"sm"} className="w-full h-[100px] bg-white border-2" radius="none" endContent={<IconShared iconType={checkOpen ? "top" : "bottom"} />}><TextMediumShared>
                업로드한 이미지 조회하기</TextMediumShared></Button>

            <ProductListBtn/>

            <QuestionBtn />

            {/* <DarkModeSelectBtn/> */}
        </>
    )
}

export default SellerProFileContainer
