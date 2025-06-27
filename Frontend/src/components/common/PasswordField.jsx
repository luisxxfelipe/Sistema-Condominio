import { useState } from "react"
import { TextField, InputAdornment, IconButton } from "@mui/material"
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material"

export function PasswordField({ 
  label = "Senha", 
  value, 
  onChange, 
  onBlur, 
  error, 
  helperText,
  ...props 
}) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <TextField
      fullWidth
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock color={error ? "error" : "action"} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end" size="small">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}
