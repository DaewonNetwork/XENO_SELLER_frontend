"use client"


import { Button } from "@nextui-org/button";

import IconShared from "@/(FSD)/shareds/ui/IconShared";

import { useTheme } from "next-themes";


const DarkModeSelectBtn = () => {
    
    const {theme,setTheme} = useTheme();

    return (

        <div style={{ marginBottom: "10px" }}>
            <Button isIconOnly onClick={() => {
                setTheme(theme == "dark" ? "light" : "dark");

            }} size="sm" variant="light"><IconShared iconType={theme == "dark" ? "sun" : "moon"} /></Button>
        </div>

    );
};

export default DarkModeSelectBtn;
