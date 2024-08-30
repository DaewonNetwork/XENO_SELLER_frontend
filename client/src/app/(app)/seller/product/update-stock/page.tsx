
import AppInner from '@/(FSD)/widgets/app/ui/AppInner'
import AppSection from '@/(FSD)/widgets/app/ui/AppSection'
import ProductUpdateStockContainer from '@/(FSD)/widgets/product/ui/ProductUpdateStockContainer'
import SellerProFileContainer from '@/(FSD)/widgets/seller/ui/SellerProFileContainer'
import React from 'react'

const Page = () => {

    return (
        <AppSection>
            <AppInner>
                <ProductUpdateStockContainer/>
            </AppInner>
        </AppSection>
    )
}

export default Page
