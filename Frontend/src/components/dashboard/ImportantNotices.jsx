import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { Announcement } from "@mui/icons-material";

export function ImportantNotices({ avisos = [] }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        border: "2px solid",
        borderColor: "#FF9800",
        backgroundColor: "#FFF3E0",
        height: "fit-content"
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, color: "#F57C00" }}
        >
          <Announcement sx={{ mr: 1, verticalAlign: "middle" }} />
          Avisos Importantes
        </Typography>

        {avisos?.length > 0 ? (
          avisos.map((aviso) => (
            <Box key={aviso.id} sx={{ mb: 2 }}>
              <Chip
                label={aviso.titulo}
                color="info"
                size="small"
                sx={{ mb: 1, mr: 1 }}
              />
              <Typography variant="body2" color="textSecondary">
                {aviso.descricao}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Nenhum aviso recente
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
