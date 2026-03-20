import type { FundTransferInput } from "../hooks/useFundTransfer";
import type { FundDetails, FundList } from "../models/funds.model";
import type { PortfolioFund } from "../models/portfolio.model";

const BASE_URL = "http://localhost:3000";

async function apiRequest(path: string, init?: RequestInit) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, init);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

export async function getFundsList(): Promise<FundList> {
  return apiRequest(`/funds`);
}

export async function getFundDetails(payload: { fundId: string }): Promise<FundDetails> {
  return apiRequest(`/funds/${payload.fundId}`).then((response) => response?.data);
}

export const fetchPortfolioFunds = async (): Promise<PortfolioFund[]> => {
  return apiRequest(`/portfolio`).then((response) => response?.data);
};

export async function fetchFundsList(): Promise<FundList> {
  return apiRequest(`/funds`).then((response) => response?.data);
}

export async function fundPurchase({ fundId, amount }: { fundId: string; amount: number }) {
  return apiRequest(`/funds/${fundId}/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: amount }),
  });
}

export async function fundSell({ fundId, amount }: { fundId: string; amount: number }) {
  return apiRequest(`/funds/${fundId}/sell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: amount }),
  });
}

export async function fundTransfer({ fromFundId, toFundId, amount }: FundTransferInput) {
  return apiRequest(`/funds/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromFundId: fromFundId,
      toFundId: toFundId,
      quantity: amount,
    }),
  });
}
