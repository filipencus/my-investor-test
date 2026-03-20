import { GenericDialog } from "../generic-dialog/Generic-dialog";
import GenericFundForm from "../generic-fund-form/fund-form";
import type { ModalFundProps } from "../../models/funds.model";

export function FundDialog({config,fundDetails,handleClose}: ModalFundProps) {
  return (
    <GenericDialog
      open={true}
      title={config.title}
      onClose={handleClose}
      aria-labelledby="fund-dialog-title"
    >
      <GenericFundForm
        config={config}
        fundDetails={fundDetails}
        shouldClose={handleClose}
      />
    </GenericDialog>
  );
}
