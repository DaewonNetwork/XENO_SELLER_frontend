
import AppInner from '@/(FSD)/widgets/app/ui/AppInner'
import AppSection from '@/(FSD)/widgets/app/ui/AppSection'
import ProductInputShippingContainer from '@/(FSD)/widgets/product/ui/ProductInputShippingContainer'

import React from 'react'

const Page = () => {

    return (
        <AppSection>
            <AppInner>
                <ProductInputShippingContainer/>
            </AppInner>
        </AppSection>
    )
}

export default Page
