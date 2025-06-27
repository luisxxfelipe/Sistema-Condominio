import { Box, Card, CardContent, Typography } from "@mui/material"

export function LoginCard({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #2BD2FF 0%, #FA8BFF 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
              {title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {subtitle}
            </Typography>
          </Box>
          {children}
        </CardContent>
      </Card>
    </Box>
  )
}
