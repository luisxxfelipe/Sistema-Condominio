import { useState, useEffect } from "react"
import { TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material"

export function FormFields({ fields, initialData, onChange }) {
  const [formData, setFormData] = useState({})

  // Inicializar dados quando o componente monta ou quando initialData muda
  useEffect(() => {
    if (initialData) {
      // Editando: usar dados iniciais e converter datas para formato de input
      const processedData = { ...initialData }
      
      // Converter datas para o formato esperado pelos inputs HTML
      fields.forEach(field => {
        if (field.type === "date" && processedData[field.name]) {
          const date = new Date(processedData[field.name])
          if (!isNaN(date.getTime())) {
            processedData[field.name] = date.toISOString().split('T')[0]
          }
        } else if (field.type === "datetime-local" && processedData[field.name]) {
          const date = new Date(processedData[field.name])
          if (!isNaN(date.getTime())) {
            // Ajustar para timezone local
            const offset = date.getTimezoneOffset()
            const localDate = new Date(date.getTime() - (offset * 60 * 1000))
            processedData[field.name] = localDate.toISOString().slice(0, 16)
          }
        } else if (field.type === "time" && processedData[field.name]) {
          // Se já é uma string HH:MM, manter como está
          if (typeof processedData[field.name] === 'string' && processedData[field.name].includes(':')) {
            // Já está no formato correto
          } else {
            const date = new Date(processedData[field.name])
            if (!isNaN(date.getTime())) {
              processedData[field.name] = date.toTimeString().slice(0, 5)
            }
          }
        }
      })
      
      setFormData(processedData)
      if (onChange) {
        onChange(processedData)
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
