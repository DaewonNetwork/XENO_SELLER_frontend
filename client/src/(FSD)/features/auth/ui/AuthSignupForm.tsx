"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import PasswordInputShared from "@/(FSD)/shareds/ui/PasswordInputShared";
import { Button } from "@nextui-org/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "@/(FSD)/shareds/styles/AuthStyle.module.scss";
import { UserType } from "@/(FSD)/shareds/types/User.type";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import AppErrorModal from "@/(FSD)/widgets/app/ui/AppErrorModal";
import AppPostcodeModal from "@/(FSD)/widgets/app/ui/AppPostcodeModal";
import TextXSmallShared from "@/(FSD)/shareds/ui/TextXSmallShared";
import AppLoadingModal from "@/(FSD)/widgets/app/ui/AppLoadingModal";
import { useAuthSignup } from "../api/useAuthSignup";

const AuthSellerSignupForm = () => {
    const brandNameRegex = /^[가-힣a-zA-Z\s]{1,20}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    const phoneNumberRegex = /^\d{11}$/;
    const companyIdRegex = /^[0-9]{10}$/;

    const [address, setAddress] = useState<string>();
    const [postcode, setPostcode] = useState<string>();

    const [userData, setUserData] = useState<UserType | null>(null);

    const schema = z.object({
        brandName: z.string().regex(brandNameRegex, { message: "알맞은 이름을 입력해주세요." }),
        email: z.string().regex(emailRegex, {
            message: "알맞은 이메일 주소를 입력해주세요."
        }),
        companyId: z.string().regex(companyIdRegex, {
            message: "알맞은 사업자등록번호를 입력해주세요."
        }),
        phoneNumber: z.string().regex(phoneNumberRegex, {
            message: "알맞은 전화번호를 입력해주세요."
        }),
        address: z.string().min(1, {
            message: "알맞은 주소를 입력해주세요."
        }).optional(),
        password: z.string().regex(passwordRegex, {
            message: "알맞는 비밀번호를 입력해주세요."
        }),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
    });


    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const router = useRouter();

    const onSuccess = (data: any) => {
        if (!userData) return;
        router.push("/");
    }

    const onError = () => {

    }

    const { mutate, isError, isPending } = useAuthSignup({ onSuccess, onError });

    const onSubmit = (data: any) => {
        if ((!data.brandName) || (!data.email) || (!data.password)) return;

        const user: UserType = {
            email: data.email,
            password: data.password,
            brandName: data.brandName,
            companyId: data.companyId,
            phoneNumber: data.phoneNumber,
            address: `${address} / ${data.address}`,
        };

        setUserData(user);
        mutate(user);
    };

    const completeHandler = (data: any) => {
        if (!data) return;
        setAddress(data.address);
        setPostcode(data.zonecode);
    }

    const { isOpen: postcodeModalIsOpen, onOpen: postcodeModalOnOpen, onOpenChange: postcodeModalOnOpenChange } = useDisclosure();
    const { isOpen: errorModalIsOpen, onOpen: errorModalOnOpen, onOpenChange: errorModalOnOpenChange } = useDisclosure();
    const { isOpen: loadingModalIsOpen, onOpenChange: loadingModalOnOpenChange } = useDisclosure();

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"brandName"}>브랜드 이름</TextMediumShared>
                    <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.brandName} errorMessage={errors.brandName && <TextXSmallShared>{String(errors.brandName.message)}</TextXSmallShared>} name={"brandName"} type={"text"} autoFocus={true} isRequired control={control} placeholder={"XENO"} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"companyId"}>사업자등록번호</TextMediumShared>
                    <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.companyId} radius={"none"} errorMessage={errors.companyId && <TextXSmallShared>{String(errors.companyId.message)}</TextXSmallShared>} name={"companyId"} control={control} placeholder={"123-45-67890"} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"phoneNumber"}>전화번호</TextMediumShared>
                    <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.phoneNumber} radius={"none"} errorMessage={errors.phoneNumber && <TextXSmallShared>{String(errors.phoneNumber.message)}</TextXSmallShared>} name={"phoneNumber"} control={control} placeholder={"0212345678"} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"email"}>이메일</TextMediumShared>
                    <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.email} radius={"none"} errorMessage={errors.email && <TextXSmallShared>{String(errors.email.message)}</TextXSmallShared>} name={"email"} control={control} placeholder={"abc1234@gmail.com"} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"password"}>비밀번호</TextMediumShared>
                    <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.password} errorMessage={errors.password && <TextXSmallShared>{String(errors.password.message)}</TextXSmallShared>} name={"password"} control={control} placeholder={"영문, 숫자 조합 8~16자"} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"confirmPassword"}>비밀번호 재입력</TextMediumShared>
                    <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.confirmPassword} errorMessage={errors.confirmPassword && <TextXSmallShared>{String(errors.confirmPassword.message)}</TextXSmallShared>} name={"confirmPassword"} control={control} placeholder={"비밀번호를 한 번 더 입력해주세요."} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"address"}>우편 번호</TextMediumShared>
                    <Input onClick={postcodeModalOnOpen} isReadOnly={true} isClearable={false} size={"lg"} variant={"underlined"} radius={"none"} value={postcode || ""} placeholder={"01234"} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"address"}>주소</TextMediumShared>
                    <Input onClick={postcodeModalOnOpen} isReadOnly={true} isClearable={false} size={"lg"} variant={"underlined"} radius={"none"} value={address || ""} placeholder={"서울특별시 서대문구 노고산동 57-1 7층"} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"address"}>상세주소</TextMediumShared>
                    <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.address} radius={"none"} errorMessage={errors.address && <TextXSmallShared>{String(errors.address.message)}</TextXSmallShared>} name={"address"} control={control} placeholder={"상세주소를 입력해주세요."} />
                </div>
                <Button isDisabled={(!isValid) || (submitCount >= 5)} type={"submit"} variant={"solid"} color={(!isValid) || (submitCount >= 5) ? "default" : "primary"} size={"lg"} radius={"sm"} fullWidth>회원가입</Button>
            </form>
            <AppPostcodeModal isOpen={postcodeModalIsOpen} onOpenChange={postcodeModalOnOpenChange} completeHandler={completeHandler} />
            <AppErrorModal errorMessage={"회원가입 정보를 확인해주세요."} isDetect={isError} isOpen={errorModalIsOpen} onOpen={errorModalOnOpen} onOpenChange={errorModalOnOpenChange} />
            <AppLoadingModal isDetect={isPending} isOpen={loadingModalIsOpen} onOpenChange={loadingModalOnOpenChange} />
        </>
    );
};

export default AuthSellerSignupForm;