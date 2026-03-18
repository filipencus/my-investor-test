import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioFunds } from "../services/api-service";

export const usePortfolioFunds = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolioFunds,
    staleTime: 5 * 60 * 1000,  
    retry: 2,
  });
};
