import { useNavigate } from "react-router-dom";
import GenericTable from "../../components/table/Table";
import { useQuery } from "@tanstack/react-query";
import { getFundsList } from "../../../../services/api-service";
import { useState } from "react";
import type { FundDetails } from "../../../../models/funds.model";
import { GenericDialog } from "../../components/generic-dialog/Generic-dialog";
import GenericFundForm from "../../components/fund-form/fund-form";

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

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1 className="text-center">Lista de fondos</h1>
      <GenericTable
        data={data}
        onBuyAction={handleBuyAction}
        onDetailsAction={handleDetailsAction}
      />
      {fundDetails && (
        <GenericDialog open={true} title="Compra" onClose={() => setFundDetails(null)}>
          <GenericFundForm fundDetails={fundDetails} config={{ title: "Comprar fondo", action: "BUY" }} shouldClose={() => setFundDetails(null)} />
        </GenericDialog>
      )}
    </>
  );
}
