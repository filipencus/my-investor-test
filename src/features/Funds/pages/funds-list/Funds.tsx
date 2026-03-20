import { useNavigate } from "react-router-dom";
import GenericTable from "../../components/table/Table";
import { useQuery } from "@tanstack/react-query";
import { getFundsList } from "../../../../services/api-service";
import { useState } from "react";
import type { FundDetails } from "../../../../models/funds.model";
import { FundDialog } from "../../../../components/fund-dialog/Fund-dialog";

export default function FundsPage() {
  const [fundDetails, setFundDetails] = useState<FundDetails | null>(null);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["funds"],
    queryFn: getFundsList,
  });

  const handleBuyAction = (fundDetails: FundDetails | undefined) => {
    if (fundDetails) {
      setFundDetails(fundDetails);
    }
  };

  const handleDetailsAction = (fundId: number | string) => {
    navigate(`/funds/${fundId}`);
  };

  const handleCloseDialog = () => {
    setFundDetails(null);
  };

  if (isLoading) {
    return (
      <div className="loading" role="status" aria-live="polite" aria-label="Cargando fondos...">
        Cargando...
      </div>
    );
  }
  if (isError) {
    return (
      <div role="alert" aria-live="assertive">
        <p>Error al cargar los fondos:</p>
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center">Lista de fondos</h1>
      <GenericTable
        data={data}
        onBuyAction={handleBuyAction}
        onDetailsAction={handleDetailsAction}
      />
      {fundDetails && (
        <FundDialog
          config={{ title: "Comprar fondo", action: "BUY" }}
          fundDetails={fundDetails}
          handleClose={handleCloseDialog}
        />
      )}
    </>
  );
}
