import React, { useState } from "react";
import CustomTabPanel from "../components/custom-panel/Custom-panel";
import { usePortfolioWithFunds } from "../../../hooks/usePortfolioWithFunds";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LogoutIcon from "@mui/icons-material/Logout";
import ScreenRotationAltIcon from "@mui/icons-material/ScreenRotationAlt";
import { GenericDialog } from "../../Funds/components/generic-dialog/Generic-dialog";
import GenericFundForm from "../../Funds/components/fund-form/fund-form";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../utils/utils";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { FundActionType, type FormConfigProps } from "../../../models/funds.model";
import OrdersHistory from "../components/orders-history/Orders-history";
import "./Portfolio.styles.css";
import type {
  PortfolioFund,
  PortfolioMixedData,
  PortfolioMixedDataByCategory,
} from "../../../models/portfolio.model";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Tabs,
} from "@mui/material";

export default function PortfolioPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [modalConfig, setModalConfig] = useState<FormConfigProps>();
  const [fundDetails, setFundDetails] = useState<PortfolioFund | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data, isLoading, isError, error } = usePortfolioWithFunds();

  const handleCloseMenu = () => setAnchorEl(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, row: PortfolioFund) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const onClickDetailsAction = (fund: PortfolioFund): void => {
    navigate(`/funds/${fund.id}`);
  };

  const onClickBuyAction = (fundDetails: PortfolioFund | undefined) => {
    handleCloseMenu();
    if (fundDetails) {
      setModalConfig({ title: "Comprar fondo", action: FundActionType.BUY });
      setFundDetails(fundDetails);
    }
  };

  const onClickSellAction = (fundDetails: PortfolioFund | undefined): void => {
    handleCloseMenu();
    if (fundDetails) {
      setModalConfig({
        title: "Vender fondo",
        action: FundActionType.SELL,
        validation: {
          max: {
            value: fundDetails.totalValue?.amount,
            message: "No puede ser superior a la posición",
          },
        },
      });
      setFundDetails(fundDetails);
    }
  };

  const onClickTransferAction = (fundDetails: PortfolioFund | undefined): void => {
    handleCloseMenu();
    if (fundDetails) {
      setModalConfig({
        title: "Traspasar fondo",
        action: FundActionType.TRANSFER,
        validation: {
          max: {
            value: fundDetails.totalValue?.amount,
            message: "No puede ser superior a la posición",
          },
        },
      });
      setFundDetails(fundDetails);
    }
  };

  if (isLoading) {
    return (
      <div className="portfolio-loading">
        <p>Cargando datos de la cartera...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="portfolio-error">
        <p>Error: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center">Detalle de la cartera</h1>
      <br />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          aria-label="basic tabs example">
          <Tab label="Fondos" />
          <Tab label="Órdenes" />
          <Tab label="Traspasos en curso" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {!data?.length ? (
          <div className="portfolio-empty">
            <p>No hay transacciones aún</p>
          </div>
        ) : (
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {data?.map((row: PortfolioMixedDataByCategory, index: number) => (
              <React.Fragment key={index}>
                <Divider>{row.category}</Divider>
                {row.funds?.map((fund: PortfolioMixedData) => (
                  <React.Fragment key={fund.id}>
                    <ListItem
                      key={fund.id}
                      disableGutters
                      secondaryAction={
                        <IconButton aria-label="comment" onClick={(e) => handleOpenMenu(e, fund)}>
                          <MoreVertIcon />
                        </IconButton>
                      }>
                      <ListItemText className="portfolio-fund-item">
                        <Button href={`/funds/${fund.id}`}>
                          <AutoGraphIcon className="graph" />{" "}
                          <span className="fund-name">{fund.name}</span>
                        </Button>
                        <div className="fund-details">
                          <div className="fund-value">
                            {formatNumber(fund.totalValue?.amount || 0)} {fund.totalValue?.currency}
                          </div>
                          <div className="flex justify-end">
                            <div className="fund-purchased">
                              {formatNumber(fund.value?.amount || 0)} €
                            </div>
                            <div className="fund-profitability">
                              <CallMadeIcon sx={{ fontSize: 12 }} />{" "}
                              {formatNumber(fund.profitability.YTD || 0)} %
                            </div>
                          </div>
                        </div>
                      </ListItemText>
                    </ListItem>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </List>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OrdersHistory />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        WIP
      </CustomTabPanel>

      {/* Menu acciones */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => onClickBuyAction(selectedRow)}>
          <Button variant="text" startIcon={<LoginIcon />}>
            Comprar
          </Button>
        </MenuItem>
        <MenuItem onClick={() => onClickSellAction(selectedRow)}>
          <Button variant="text" startIcon={<LogoutIcon />}>
            Vender
          </Button>
        </MenuItem>
        <MenuItem onClick={() => onClickTransferAction(selectedRow)}>
          <Button variant="text" startIcon={<ScreenRotationAltIcon />}>
            Traspasar
          </Button>
        </MenuItem>
        <MenuItem onClick={() => onClickDetailsAction(selectedRow)}>
          <Button variant="text" startIcon={<RemoveRedEyeIcon />}>
            Ver Detalles
          </Button>
        </MenuItem>
      </Menu>

      {/* Modals */}
      {fundDetails && (
        <GenericDialog open={true} title={modalConfig?.title} onClose={() => setFundDetails(null)}>
          <GenericFundForm
            fundDetails={fundDetails}
            config={modalConfig}
            shouldClose={() => setFundDetails(null)}
          />
        </GenericDialog>
      )}
    </div>
  );
}
