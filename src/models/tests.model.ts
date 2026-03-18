import type { FundDetails } from "./funds.model";

export const mockFundDetails: FundDetails = {
  id: "fund-003",
  name: "Tech Innovators Fund",
  symbol: "TIF",
  value: {
    amount: 156.73,
    currency: "USD",
  },
  category: "Technology",
  profitability: {
    YTD: 11.9,
    oneYear: 18.4,
    threeYears: 35.6,
    fiveYears: 62.1,
  },
};

export const mockFunds: FundDetails[] = [
  {
    id: "fund-001",
    name: "Global Growth Fund",
    symbol: "GGF",
    value: {
      amount: 124.56,
      currency: "USD",
    },
    category: "Equity",
    profitability: {
      YTD: 8.4,
      oneYear: 12.7,
      threeYears: 28.9,
      fiveYears: 46.3,
    },
  },
  {
    id: "fund-002",
    name: "Balanced Income Fund",
    symbol: "BIF",
    value: {
      amount: 98.12,
      currency: "EUR",
    },
    category: "Balanced",
    profitability: {
      YTD: 4.1,
      oneYear: 6.8,
      threeYears: 18.2,
      fiveYears: 31.5,
    },
  },
  {
    id: "fund-003",
    name: "Tech Innovators Fund",
    symbol: "TIF",
    value: {
      amount: 156.73,
      currency: "USD",
    },
    category: "Technology",
    profitability: {
      YTD: 11.9,
      oneYear: 18.4,
      threeYears: 35.6,
      fiveYears: 62.1,
    },
  },
  {
    id: "fund-004",
    name: "Emerging Markets Fund",
    symbol: "EMF",
    value: {
      amount: 87.45,
      currency: "GBP",
    },
    category: "Emerging Markets",
    profitability: {
      YTD: 6.2,
      oneYear: 9.1,
      threeYears: 14.7,
      fiveYears: 26.8,
    },
  },
  {
    id: "fund-005",
    name: "Sustainable Future Fund",
    symbol: "SFF",
    value: {
      amount: 132.9,
      currency: "EUR",
    },
    category: "ESG",
    profitability: {
      YTD: 7.5,
      oneYear: 10.3,
      threeYears: 24.1,
      fiveYears: 39.7,
    },
  },
];
