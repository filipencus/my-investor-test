import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fundSell } from "../services/api-service";

type FundSellInput = {
  fundId: string;
  amount: number;
};

export default function useFundSellMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fundId, amount }: FundSellInput) => {
      return fundSell({ fundId, amount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
}
