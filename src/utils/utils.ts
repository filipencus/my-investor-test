import type { PortfolioFund, PortfolioMixedData } from "../models/portfolio.model";

// Agrupamos por catergorias y combinamos en un objeto
export const groupByCategory = (portfolioData: any, fundsData: any) => {
  const categorizedData: Record<string, PortfolioMixedData[]> = {};
  portfolioData?.forEach((rowData: PortfolioFund) => {
    const fund = fundsData?.find((f: any) => String(f.id) === String(rowData.id));
    const item = { ...fund, ...rowData } as PortfolioMixedData;
    if (!categorizedData[item.category]) {
      categorizedData[item.category] = [];
    }
    categorizedData[item.category].push(item);
  });
  return categorizedData;
};

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatNumber = (value: number | string = 0) => {
  return formatter.format(Number(value));
};