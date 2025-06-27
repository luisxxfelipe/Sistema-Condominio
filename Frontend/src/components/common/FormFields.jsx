import { useState, useEffect } from "react"
import { TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material"

export function FormFields({ fields, initialData, onChange }) {
  const [formData, setFormData] = useState({})

  // Inicializar dados quando o componente monta ou quando initialData muda
  useEffect(() => {
    if (initialData) {
      // Editando: usar dados iniciais
      setFormData(initialData)
      if (onChange) {
        onChange(initialData)
      }
    } else {
      // Criando: inicializar com valores vazios
      const emptyData = {}
      fields.forEach(field => {
        emptyData[field.name] = ""
      })
      setFormData(emptyData)
      if (onChange) {
        onChange(emptyData)
      }
    }
  }, [initialData]) // Removido fields e onChange das dependências

  const handleFieldChange = (name, value) => {
    const newData = { ...formData, [name]: value }
    setFormData(newData)
    if (onChange) {
      onChange(newData)
    }
  }

  const renderField = (field) => {
    const { name, label, type = "text", required = false, options = [], multiline = false } = field

    if (type === "select") {
      return (
        <FormControl fullWidth margin="normal" key={name}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            value={formData[name] || ""}
            label={label}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            required={required}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    }

    return (
      <TextField
        key={name}
        fullWidth
        margin="normal"
        name={name}
        label={label}
        type={type}
        value={formData[name] || ""}
        onChange={(e) => handleFieldChange(name, e.target.value)}
        required={required}
        multiline={multiline}
        rows={multiline ? 3 : 1}
        InputLabelProps={{
          shrink: type === "date" || type === "datetime-local" || type === "time" || (formData[name] && formData[name].length > 0)
        }}
      />
    )
  }

  return (
    <>
      {fields.map(renderField)}
    </>
  )
}
