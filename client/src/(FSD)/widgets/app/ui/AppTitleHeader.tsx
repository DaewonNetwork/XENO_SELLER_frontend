import React from "react";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import AppContainer from "./AppContainer";
import AppInner from "./AppInner";
import ProductCart from "@/(FSD)/entities/product/ui/ProductCart";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";

interface AppTitleHeaderType {
    title: string;
    href?: string;
    buttons?: React.ReactNode;
}

const AppTitleHeader = ({ title, buttons = <ProductCart /> }: AppTitleHeaderType) => {
    return (
        <header className={`border-default-100 border-b-small ${styles.title_header}`}>
            <AppContainer>
                <AppInner>
                    <div className={styles.inner}>
                        <TextMediumShared>{title}</TextMediumShared>
                        {buttons}
                    </div>
                </AppInner>
            </AppContainer>
        </header>
    );
};

export default AppTitleHeader;