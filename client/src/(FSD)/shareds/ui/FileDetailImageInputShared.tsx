import { Button, ButtonProps } from "@nextui-org/button";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";
import Image from "next/image";
import IconShared from "./IconShared";
import { useRecoilState } from "recoil";
import { detailImageState, imagesState } from "../stores/PreviewAtom";
import { ProductImageInfoType } from "@/(FSD)/features/product/ui/ProductColorUpdateForm";
import { fetchImageToBlob } from "../uitll/base64toBlob";
import { isUrlState } from "../stores/ProductAtom";


interface FileInputSharedProps extends ButtonProps {
    inputId: string;
    setFile: any;
    children?: ReactNode;
    height?: number;
    url?: string;
    file?: File | null;
    blockIdx: number
    index: number
}



const FileDetailImageInputShared = ({ inputId, setFile, height = 160, url, file, blockIdx, index }: FileInputSharedProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUrl, setIsUrl] = useRecoilState(isUrlState)

    useEffect(() => {

        if (url && !file) {
            setPreview(url);

            const mimeType = 'image/jpeg';
            fetchImageToBlob(url)
                .then(blob => {
                    // Blob 처리
                    const newFile = new File([blob], url, { type: mimeType });
                    setFile(newFile);
                
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        }
        if ((!url && file) || (url && file)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreview(result);
            };
            reader.readAsDataURL(file);
            setFile(file);
        }


    }, [file, setFile, setPreview]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setFile(file);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleDeletePreview = () => {
        setPreview(null);
        setFile(null);
        setIsUrl(prev => {
            // 배열의 깊은 복사
            const newStates = prev.map((block, idx) => 
                idx === blockIdx 
                    ? [...block.slice(0, index), false, ...block.slice(index + 1)] 
                    : block
            );
            return newStates;
        });
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
        }
    };

    return (
        <div style={{ height: height }} className={`${preview ? "" : "bg-content2"} rounded-medium ${styles.file_container}`}>
            {
                !preview &&
                <div className={styles.file_input_box}>
                    <input ref={inputRef} onChange={handleFileChange} id={inputId} type={"file"} />
                    <label htmlFor={inputId}>
                        <IconShared iconType={"plus"} iconSize={"lg"} />
                    </label>
                </div>
            }
            {
                preview &&
                <div className={styles.preview_img_box}>
                    <div className={styles.preview_img_close_btn}>
                        <Button onClick={handleDeletePreview} variant={"light"} size={"sm"} isIconOnly endContent={<IconShared iconType={"close"} />} />
                    </div>
                    <Image src={preview} alt={"preview"} layout="fill" objectFit="contain" />
                </div>
            }
        </div>
    );
};

export default FileDetailImageInputShared;

