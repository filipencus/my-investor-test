import { useQuery } from "@tanstack/react-query";
import { getFundsList } from "../services/api-service";

export const useAllFunds = () => {
  return useQuery({
    queryKey: ["funds"],
    queryFn: getFundsList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
