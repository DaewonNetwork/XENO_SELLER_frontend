
import AppInner from '@/(FSD)/widgets/app/ui/AppInner'
import AppSection from '@/(FSD)/widgets/app/ui/AppSection'
import ProductUpdateStockContainer from '@/(FSD)/widgets/product/ui/ProductUpdateStockContainer'

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
