import { Box, Typography, Button } from "@mui/material"

export function PageHeader({ title, subtitle, action, actionLabel, onAction, gradient = true }) {
  return (
    <Box
      sx={{
        background: gradient ? "linear-gradient(135deg, #2BD2FF 0%, #FA8BFF 100%)" : "transparent",
        borderRadius: gradient ? 3 : 0,
        p: gradient ? 4 : 2,
        mb: 3,
        color: gradient ? "white" : "inherit",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" sx={{ opacity: gradient ? 0.9 : 0.7 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {action && (
        <Button
          variant={gradient ? "outlined" : "contained"}
          onClick={onAction}
          sx={{
            color: gradient ? "white" : "primary.main",
            borderColor: gradient ? "white" : "primary.main",
            background: gradient ? "transparent" : "linear-gradient(135deg, #2BD2FF 0%, #FA8BFF 100%)",
            "&:hover": {
              backgroundColor: gradient ? "rgba(255,255,255,0.1)" : undefined,
            },
          }}
          startIcon={action}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  )
}

export default PageHeader
