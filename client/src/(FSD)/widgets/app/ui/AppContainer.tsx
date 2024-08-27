import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

interface AppContainerProps {
    children: ReactNode;
};

const AppContainer = ({ children }: AppContainerProps) => {
    return (
        <div data-slot={"container"} className={`bg-background ${styles.container}`}>
            { children }
        </div>
    );
};

export default AppContainer;