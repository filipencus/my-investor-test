export interface FundDetails {
  id: string;
  name: string;
  symbol: string;
  value: {
    amount: number;
    currency: string;
  };
  category: string;
  profitability: {
    YTD: number;
    oneYear: number;
    threeYears: number;
    fiveYears: number;
  };
}

export interface FundList {
  data: FundDetails[];
  pagination: {
    page: number;
    limit: number;
    totalFunds: number;
    totalPages: number;
  };
}

// Used to map the API response to the table format
export interface FundTableRow {
  id: string;
  name: string;
  type?: string | "Fondos de inversión";
  currency: string;
  category: string;
  amount: number;
}

export interface FundTableProps {
  data: FundList | undefined;
  onBuyAction: (fund: FundDetails | undefined) => void;
  onDetailsAction: (id: number | string) => void;
}

export interface ModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const FundActionType = {
  BUY: "BUY",
  SELL: "SELL",
  TRANSFER: "TRANSFER",
} as const;

export type FundAction = typeof FundActionType[keyof typeof FundActionType];

export interface FormConfigProps {
  title: string;
  action: FundAction;
  validation?: any;
}

export interface ModalFundProps {
  config: FormConfigProps;
  fundDetails?: FundDetails;
  handleClose: () => void;
}