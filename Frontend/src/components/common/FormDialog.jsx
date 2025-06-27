import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  IconButton, 
  Box, 
  Typography,
  Divider 
} from "@mui/material"
import { Close, Save, Cancel } from "@mui/icons-material"

export function FormDialog({
  open,
  onClose,
  title,
  subtitle,
  children,
  onSave,
  onCancel,
  saveLabel = "Salvar",
  cancelLabel = "Cancelar",
  maxWidth = "sm",
  fullWidth = true,
  loading = false,
  saveDisabled = false,
}) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onClose()
    }
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={maxWidth} 
      fullWidth={fullWidth}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box 
          sx={{ 
            p: 3, 
            pb: subtitle ? 1 : 3,
            background: "linear-gradient(135deg, #2BD2FF 0%, #FA8BFF 100%)",
            color: "white"
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            <IconButton 
              onClick={onClose} 
              size="small" 
              sx={{ 
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3, minHeight: 200 }}>
        {children}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={handleCancel}
          variant="outlined"
          startIcon={<Cancel />}
          disabled={loading}
          sx={{ 
            borderColor: "grey.300",
            color: "text.secondary",
            "&:hover": {
              borderColor: "grey.400",
              bgcolor: "grey.50"
            }
          }}
        >
          {cancelLabel}
        </Button>
        {onSave && (
          <Button
            onClick={onSave}
            variant="contained"
            startIcon={<Save />}
            disabled={loading || saveDisabled}
            sx={{
              background: "linear-gradient(135deg, #2BD2FF 0%, #FA8BFF 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #1FC7FF 0%, #F980FF 100%)",
              }
            }}
          >
            {loading ? "Salvando..." : saveLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
