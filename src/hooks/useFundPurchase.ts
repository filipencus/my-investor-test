import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fundPurchase } from "../services/api-service";

type FundPurchaseInput = {
  fundId: string;
  amount: number;
};

export default function useFundPurchaseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fundId, amount }: FundPurchaseInput) => {
      return fundPurchase({ fundId, amount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
}
