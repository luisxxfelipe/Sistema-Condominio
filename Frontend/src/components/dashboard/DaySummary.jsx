import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

export function DaySummary({ stats }) {
  const summaryItems = [
    {
      label: "Visitantes hoje:",
      value: stats.visitantesHoje,
      color: "success",
    },
    {
      label: "Reservas hoje:",
      value: stats.reservasHoje,
      color: "primary",
    },
    {
      label: "Boletos vencidos:",
      value: stats.boletosVencidos,
      color: "error",
    },
    {
      label: "Boletos pendentes:",
      value: stats.boletosPendentes,
      color: "warning",
    },
    {
      label: "Áreas comuns:",
      value: stats.totalAreasComuns,
      color: "secondary",
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        height: "fit-content"
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          📊 Resumo do Dia
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {summaryItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">{item.label}</Typography>
              <Chip
                label={item.value}
                size="small"
                color={item.color}
                sx={{ fontWeight: "bold" }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
