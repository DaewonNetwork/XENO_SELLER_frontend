import { atom } from "recoil";


export const nameState = atom<string>({
    key: "nameState",
    default: "",
});

export const urlState = atom<string>({
    key: "urlState",
    default: "",
})



export const priceState = atom<number>({
    key: "priceState",
    default: 0,
});

export const reqState = atom<string>({
    key: "reqState",
    default: ""
});

export const productListState = atom<Set<string>>({
    key: "productListState",
    default: new Set<string>([])
});



export const isUrlState = atom<boolean[][]>({
    key: "isUrlState",
    default: [[]] // 기본값 빈 2차원 배열
});
