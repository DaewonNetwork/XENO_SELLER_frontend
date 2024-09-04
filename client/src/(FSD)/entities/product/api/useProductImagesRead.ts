import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductImagesReadByProductNumber = (productNumber:string) => {
   
    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_images_read_by_proudct_number",productNumber],
        queryFn: () => fetchData({ 
            path: `/product/read/upload-image?productNumber=${productNumber}`,
          }),
            
    });
};
