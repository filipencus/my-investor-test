import { List, ListItem, Typography, Paper, Stack } from "@mui/material";
import { useTransactionEvents } from "../../../../hooks/useOrdersHistory";

export default function OrdersHistory() {
  const { events } = useTransactionEvents();

  return (
    <div>
      <h2 className="text-center">Historial actividad</h2>

      {!events?.length && (
        <Typography variant="body1" color="text.secondary" align="center">
          No hay actividad aún.
        </Typography>
      )}

      <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 1.25 }}>
        {events?.map((event) => (
          <Paper key={event.id} variant="outlined" sx={{ px: 2, py: 1.5 }}>
            <ListItem disableGutters sx={{ p: 0, justifyContent: "space-between" }}>
              <Stack spacing={0.25}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {event.fundName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(event.id).toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={0.25} alignItems="flex-end">
                <Typography variant="body2" fontWeight={500}>
                  {event.typeOfEvent}
                </Typography>
                <Typography variant="body2">{event.amount}</Typography>
              </Stack>
            </ListItem>
          </Paper>
        ))}
      </List>
    </div>
  );
}
