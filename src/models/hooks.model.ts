import type { FundAction } from "./funds.model";

export type TransactionEvent = {
  id: number;
  typeOfEvent: FundAction;
  amount: number;
  fundName: string;
};

export type NewEventInput = {
  typeOfEvent: FundAction;
  amount: number;
  fundName: string;
};
