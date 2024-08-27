import AuthSignupForm from "@/(FSD)/features/auth/ui/AuthSignupForm";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import React from "react";

const Page = () => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"가입하기"} buttons={<LinkBtnShared href={"/"} isIconOnly size={"sm"} endContent={<IconShared iconType={"home"} />} />} />
            </AppFixedTopBar>
            <AppSection>
                <AppInner>
                    <AuthSignupForm />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;