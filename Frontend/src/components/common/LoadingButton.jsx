import { Button, CircularProgress } from "@mui/material"

export function LoadingButton({ 
  loading = false, 
  loadingText = "Carregando...", 
  children, 
  sx = {},
  ...props 
}) {
  const defaultSx = {
    background: "linear-gradient(135deg, #2BD2FF 0%, #FA8BFF 100%)",
    "&:hover": {
      background: "linear-gradient(135deg, #1FC7FF 0%, #F980FF 100%)",
    },
    "&:disabled": {
      background: "linear-gradient(135deg, #2BD2FF80 0%, #FA8BFF80 100%)",
    },
    ...sx
  }

  return (
    <Button
      variant="contained"
      disabled={loading}
      sx={defaultSx}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      {...props}
    >
      {loading ? loadingText : children}
    </Button>
  )
}
