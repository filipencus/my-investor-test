import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fundTransfer } from "../services/api-service";

export type FundTransferInput = {
  fromFundId: string;
  toFundId: string;
  amount: number;
};

export default function useFundTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fromFundId, toFundId, amount }: FundTransferInput) => {
      return fundTransfer({ fromFundId, toFundId, amount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
}
