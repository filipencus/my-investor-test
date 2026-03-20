import { useMemo } from "react";
import { groupByCategory } from "../utils/utils";
import { useQueries } from "@tanstack/react-query";
import { fetchPortfolioFunds, fetchFundsList } from "../services/api-service";

export function usePortfolioWithFunds() {
  const {
    data: [portfolioData, fundsData],
    isLoading,
    isError,
    error,
  } = useQueries({
    queries: [
      { queryKey: ["portfolio", 1], queryFn: fetchPortfolioFunds },
      { queryKey: ["funds", 1], queryFn: fetchFundsList },
    ],
    combine: (results) => {
      return {
        data: results.map((res) => res.data),
        error: results.find((res) => res.error)?.error,
        isError: results.some((res) => res.isError),
        isLoading: results.some((res) => res.isLoading),
      };
    },
  });

  const mixedData = useMemo(() => {
    const categorizedData = groupByCategory(portfolioData, fundsData);
    const dataAsArray = Object.keys(categorizedData).map((key) => ({
      category: key,
      funds: categorizedData[key],
    }));
    return dataAsArray.sort((a, b) => a.category.localeCompare(b.category));
  }, [portfolioData, fundsData]);

  return {
    data: mixedData,
    isLoading,
    isError,
    error,
  };
}
