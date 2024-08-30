import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import UserList from "@/(FSD)/widgets/manager/ui/UserList";
import SellerProFileContainer from "@/(FSD)/widgets/seller/ui/SellerProFileContainer";
import React from "react";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <UserList />
            </AppInner>
        </AppSection>
    );
};

export default Page;