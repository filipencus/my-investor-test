import { useMemo } from "react";
import { usePortfolioFunds } from "./usePortfolioFunds";
import { useAllFunds } from "./useAllFunds";
import type { PortfolioMixedData } from "../models/portfolio.model";

export function usePortfolioWithFunds() {
  const {
    data: portfolioData,
    isLoading: portfolioIsLoading,
    isError: portfolioIsError,
    error: portfolioError,
  } = usePortfolioFunds();

  const {
    data: fundsData,
    isLoading: fundsIsLoading,
    isError: fundsIsError,
    error: fundsError,
  } = useAllFunds();

  const mixedData = useMemo(() => {
    const mixedData: PortfolioMixedData[] | undefined = portfolioData?.map((p: any) => {
      const fund = fundsData?.data?.find((f: any) => String(f.id) === String(p.id));
      return { ...fund, ...p } as PortfolioMixedData;
    });

    const categorizedData: Record<string, PortfolioMixedData[]> = {};
    mixedData?.forEach((item) => {
      if (!categorizedData[item.category]) {
        categorizedData[item.category] = [];
      }
      categorizedData[item.category].push(item);
    });

    const sorted = Object.keys(categorizedData).sort((a, b) => a.localeCompare(b));
    const sortedCategorizedData: Record<string, PortfolioMixedData[]> = {};
    sorted.forEach((category) => {
      sortedCategorizedData[category] = categorizedData[category];
    });

    return Object.keys(sortedCategorizedData).map((key) => ({
      category: key,
      funds: sortedCategorizedData[key],
    }));
  }, [portfolioData, fundsData]);

  return {
    data: mixedData,
    isLoading: portfolioIsLoading || fundsIsLoading,
    isError: portfolioIsError || fundsIsError,
    error: portfolioError ?? fundsError,
  };
}
