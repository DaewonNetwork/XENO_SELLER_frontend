import useFetchData from "@/(FSD)/shareds/fetch/useFetchData"
import { UserCustomerInfo, UserInfo } from "@/(FSD)/shareds/types/manager/UserCustomerInfo.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () => {
    const fetchData = useFetchData();

    return useQuery<UserCustomerInfo[]>({
        queryKey: ["all_users"],
        queryFn: () => fetchData({ path: "/manager", isAuthRequired: true }),
    });
};