import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import UserList from "@/(FSD)/widgets/manager/ui/UserList";
import SellerProFileContainer from "@/(FSD)/widgets/seller/ui/SellerProFileContainer";
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';
import React from "react";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <div className={styles.managerPage}>
                    <UserList />
                </div>
            </AppInner>
        </AppSection>
    );
};

export default Page;