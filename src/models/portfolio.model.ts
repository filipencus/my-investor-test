export interface PortfolioFund {
  id: string;
  name: string;
  quantity: string;
  totalValue: {
    amount: number;
    currency: string;
  };
}

export interface PortfolioData {
  data: PortfolioFund[];
}

export interface PortfolioMixedData {
  category: string;
  id: string;
  name: string;
  profitability: {
    YTD: number;
    fiveYears: number;
    oneYear: number;
    threeYears: number;
  };
  quantity: string;
  symbol: string;
  totalValue: {
    amount: number;
    currency: string;
  };
  value: {
    amount: number;
    currency: string;
  };
}

export interface PortfolioMixedDataByCategory {
  category: string;
  funds: PortfolioMixedData[];
}
