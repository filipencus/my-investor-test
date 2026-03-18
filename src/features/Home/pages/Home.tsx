import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        px: 2,
      }}>
      <Typography variant="h3" component="h1" fontWeight={700}>
        My Investor Challenge
      </Typography>
      <Typography variant="h6" component="p">
        Filip Enculescu
      </Typography>
      <Typography variant="body1" component="p" sx={{ maxWidth: 700 }}>
        Para empezar a ver el challenge pulsa en este botón
      </Typography>

      <Button variant="contained" size="large" component={RouterLink} to="/funds">
        Ver fondos disponibles
      </Button>

      <Typography component="div" sx={{ fontSize: "5rem", mt: 2 }}>
        🚀
      </Typography>
    </Box>
  );
}
