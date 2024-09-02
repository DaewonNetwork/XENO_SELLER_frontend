// import { useMutation } from "@tanstack/react-query";
// import { MutationType } from "../../types/mutation.type";
// import { UserType } from "@/(FSD)/shareds/types/User.type";
// import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";


// export const useAuthSignup = ({ onSuccess, onError }: MutationType) => {
//     const fetchData = useFetchData();
    
//     return useMutation({
//         mutationFn: (userData: UserType) => {
//             return fetchData({ path: "/auth/signup", method: "POST", body: userData, isNotAuthRequired: true })
//         },
//         onSuccess: (data: UserType) => {
//             onSuccess(data);
//         },
//         onError: _ => {
//             if (onError) {
//                 onError();
//             }
//         }
//     });
// };

import { useMutation } from "@tanstack/react-query";
import { UserType } from "@/(FSD)/shareds/types/User.type";
import { MutationType } from "@/(FSD)/features/types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";

export const useAuthSignup = ({ onSuccess, onError }: MutationType) => {
    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (userData: UserType) => {
            return fetchData({ path: "/auth/signup/seller", method: "POST", body: userData, isNotAuthRequired: true })
        },
        onSuccess: (data: any) => {
            onSuccess(data);
        },
        onError: _ => {
            if (onError) {
                onError();
            }
        }
    });
};