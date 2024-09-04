
import ProductImageUpdateContainer from '@/(FSD)/features/product/ui/ProductImageUpdateContainer'
import AppInner from '@/(FSD)/widgets/app/ui/AppInner'
import AppSection from '@/(FSD)/widgets/app/ui/AppSection'
import React from 'react'

const Page = () => {

    return (
        <AppSection>
            <AppInner>
                <ProductImageUpdateContainer/>
            </AppInner>
        </AppSection>
    )
}

export default Page
