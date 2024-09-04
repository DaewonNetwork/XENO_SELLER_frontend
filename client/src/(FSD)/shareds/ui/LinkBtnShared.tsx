import React from "react";
import { Button, ButtonProps } from "@nextui-org/button";
import Link from "next/link";

interface LinkBtnSharedProps extends ButtonProps {
    href: string;
};

const LinkBtnShared = ({ href, children, variant, ...props } : LinkBtnSharedProps) => {
    return (
        <Button variant={variant || "light"} data-slot={"link"} href={href} as={Link} {...props}>{ children }</Button>
    );
};

export default LinkBtnShared;