import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFundDetails } from "../../../../services/api-service";
import "./FundsDetails.css";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Chip,
  Button,
} from "@mui/material";

export default function FundsDetailsPage() {
  const { fundId } = useParams();
  const navigate = useNavigate();
  const {
    data: fund,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fund-details", fundId],
    queryFn: () => getFundDetails({ fundId: fundId! }),
    enabled: true,
  });

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {!fundId && <p>ID de fondo no encontrado.</p>}
      {isLoading && <p className="loading">Cargando detalles...</p>}
      {isError && <p>Error: {error?.message}</p>}
      {!fund && <p className="not-found">No se encontraron detalles del fondo.</p>}

      {fund && (
        <>
          <Card
            sx={{
              p: 3,
              maxWidth: 600,
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              minHeight: "40vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {fund.name}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography color="textSecondary" variant="body2">
                    ID
                  </Typography>
                  <Typography variant="body1">{fund.id}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography color="textSecondary" variant="body2">
                    Simbolo
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {fund.symbol}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography color="textSecondary" variant="body2">
                    Categoria
                  </Typography>
                  <Chip label={fund.category} size="small" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography color="textSecondary" variant="body2">
                    Valor
                  </Typography>
                  <Typography variant="h6" sx={{ color: "success.main" }}>
                    {fund.value.amount} {fund.value.currency}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Button variant="contained" onClick={goBack} className="back-button">
            Volver
          </Button>
        </>
      )}
    </div>
  );
}
