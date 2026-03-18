import { useForm } from "react-hook-form";
import { Button, FormControl, Input, InputAdornment } from "@mui/material";
import useFundPurchaseMutation from "../../../../hooks/useFundPurchase";
import useFundSellMutation from "../../../../hooks/useFundSell";
import useFundTransferMutation from "../../../../hooks/useFundTransfer";
import { useState } from "react";
import { usePortfolioFunds } from "../../../../hooks/usePortfolioFunds";
import type { PortfolioFund } from "../../../../models/portfolio.model";
import { FundActionType } from "../../../../models/funds.model";
import { useTransactionEvents } from "../../../../hooks/useOrdersHistory";

export default function GenericFundForm({
  config,
  fundDetails,
  shouldClose,
}: {
  config: any;
  fundDetails: any;
  shouldClose: () => void;
}) {
  const [selectedTargetFundId, setSelectedTargetFundId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { registerEvent } = useTransactionEvents();

  const { data: myFundsList } = usePortfolioFunds();
  const {
    mutate: purchaseFund,
    isPending: isPurchasing,
    isError: isPurchaseError,
    error: purchaseError,
  } = useFundPurchaseMutation();
  const {
    mutate: sellFund,
    isPending: isSelling,
    isError: isSellError,
    error: sellError,
  } = useFundSellMutation();
  const {
    mutate: transferFund,
    isPending: isTransferring,
    isError: isTransferError,
    error: transferError,
  } = useFundTransferMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSuccess = (amount: any) => {
    setSuccessMessage("Acción realizada con éxito");
    registerEvent({
      typeOfEvent: config.action,
      fundName: fundDetails.name,
      amount: amount,
    });
    setTimeout(() => {
      shouldClose();
    }, 1000);
  };
  const onError = (resp: any) => {
    setErrorMessage(resp?.error || "No se pudo completar la acción");
  };

  const onSubmit = (data: any) => {
    const amount = parseInt(data.amount);
    if (config.action === FundActionType.BUY) {
      purchaseFund(
        { fundId: fundDetails.id, amount },
        { onSuccess: () => onSuccess(amount), onError },
      );
    }
    if (config.action === FundActionType.SELL) {
      sellFund({ fundId: fundDetails.id, amount }, { onSuccess: () => onSuccess(amount), onError });
    }
    if (config.action === FundActionType.TRANSFER) {
      if (!selectedTargetFundId) {
        alert("Por favor selecciona un fondo destino");
        return;
      }
      transferFund(
        {
          amount,
          fromFundId: fundDetails.id,
          toFundId: selectedTargetFundId,
        },
        { onSuccess: () => onSuccess(amount), onError },
      );
    }
  };

  const isPending = isPurchasing || isSelling || isTransferring;
  const isError = isPurchaseError || isSellError || isTransferError;
  const error = purchaseError || sellError || transferError;

  let displayValue = fundDetails.value.amount;
  if (config.action === FundActionType.SELL || config.action === FundActionType.TRANSFER) {
    displayValue = fundDetails.totalValue.amount;
  }

  const amountValidation = {
    required: "El monto es obligatorio",
    min: { value: 0, message: "No puede ser negativo" },
    max: { value: 10000, message: "No puede superar los 10.000 €" },
    ...config.validation,
  };

  if (isPending) {
    return <div>Procesando acción...</div>;
  }

  if (successMessage) {
    return <div style={{ color: "green" }}>{successMessage}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Fondo: {fundDetails.name} <br />
      {fundDetails.value && (
        <div>
          Valor actual: {displayValue} {fundDetails.value.currency}
        </div>
      )}
      <br />
      <br />
      {config.action === FundActionType.TRANSFER && (
        <FormControl fullWidth variant="standard">
          <label htmlFor="targetFund">Fondo destino</label>
          <select onChange={(e) => setSelectedTargetFundId(e.target.value)} required>
            <option value="">Selecciona un fondo</option>
            {myFundsList
              ?.filter((fund: PortfolioFund) => fund.id !== fundDetails.id)
              .map((fund: PortfolioFund) => (
                <option key={fund.id} value={fund.id}>
                  {fund.name}
                </option>
              ))}
          </select>
          <br />
        </FormControl>
      )}
      <FormControl fullWidth variant="standard">
        <label htmlFor="amount">Importe</label>
        <Input
          endAdornment={<InputAdornment position="end">€</InputAdornment>}
          type="text"
          placeholder="0,00"
          {...register("amount", amountValidation)}
        />
      </FormControl>
      {errors.amount && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {typeof errors.amount.message === "string" ? errors.amount.message : ""}
        </span>
      )}
      <br />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {isError && <div style={{ color: "red" }}>{error?.message}</div>}
      <br />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <Button type="submit" variant="contained" disabled={isPending}>
          Continuar
        </Button>
      </div>
    </form>
  );
}
