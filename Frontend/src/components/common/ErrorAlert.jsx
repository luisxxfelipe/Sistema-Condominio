import { Alert, Collapse } from "@mui/material"

export function ErrorAlert({ error, sx = {} }) {
  return (
    <Collapse in={!!error}>
      <Alert 
        severity="error" 
        sx={{ mb: 3, ...sx }}
        onClose={() => {}}
      >
        {error}
      </Alert>
    </Collapse>
  )
}
