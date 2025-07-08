import { useState, useEffect } from "react"
import { Box, Alert, Snackbar } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { PageHeader } from "../../components/common/PageHeader"
import { DataTable } from "../../components/common/DataTable"
import { FormDialog } from "../../components/common/FormDialog"
import { FormFields } from "../../components/common/FormFields"
import { withPermission, usePermissions } from "../../hooks/usePermissions"
import reservaService from "../../services/reservaService"
import areaComumService from "../../services/areaComumService"
import unidadeService from "../../services/unidadeService"

function Reservas() {
  const [reservas, setReservas] = useState([])
  const [areasComuns, setAreasComuns] = useState([])
  const [unidades, setUnidades] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedReserva, setSelectedReserva] = useState(null)
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState("")
  const [showError, setShowError] = useState(false)

  const { canPerformAction } = usePermissions()

  const columns = [
    { id: "areaComum", label: "Área Comum", minWidth: 170,
      renderCell: (row) => row.areaComum?.nome || `Área ${row.areaComumId}` },
    { id: "unidade", label: "Unidade", minWidth: 100,
      renderCell: (row) => row.unidade ? `${row.unidade.numero} - ${row.unidade.bloco || 'S/B'}` : `Unidade ${row.unidadeId}` },
    { id: "data", label: "Data", minWidth: 120, type: "date" },
    { id: "horarioInicio", label: "Início", minWidth: 100, type: "time" },
    { id: "horarioFim", label: "Fim", minWidth: 100, type: "time" },
  ]

  const actions = [
    ...(canPerformAction('update') ? [{
      icon: <EditIcon />,
      name: "Editar",
      onClick: (row) => {
        setSelectedReserva(row)
        setDialogOpen(true)
      },
    }] : []),
    ...(canPerformAction('delete') ? [{
      icon: <DeleteIcon />,
      name: "Cancelar",
      onClick: (row) => handleDelete(row.id),
    }] : []),
  ]

  useEffect(() => {
    loadReservas()
    loadAreasComuns()
    loadUnidades()
  }, [])

  const loadAreasComuns = async () => {
    try {
      const data = await areaComumService.getAll()
      setAreasComuns(data.map(area => ({
        value: area.id,
        label: area.nome || area.descricao
      })))
    } catch (error) {
      console.error("Erro ao carregar áreas comuns:", error)
      // Fallback para áreas comuns estáticas
      setAreasComuns([
        { value: "piscina", label: "Piscina" },
        { value: "salao_festas", label: "Salão de Festas" },
        { value: "churrasqueira", label: "Churrasqueira" },
        { value: "quadra_esportes", label: "Quadra de Esportes" },
        { value: "playground", label: "Playground" },
      ])
    }
  }

  const loadUnidades = async () => {
    try {
      const data = await unidadeService.getAll()
      setUnidades(data.map(unidade => ({
        value: unidade.id,
        label: `${unidade.bloco} - ${unidade.numero}`
      })))
    } catch (error) {
      console.error("Erro ao carregar unidades:", error)
    }
  }

  const loadReservas = async () => {
    try {
      setLoading(true)
      const data = await reservaService.getAll()
      setReservas(data)
    } catch (error) {
      console.error("Erro ao carregar reservas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja cancelar esta reserva?")) {
      try {
        await reservaService.delete(id)
        loadReservas()
      } catch (error) {
        console.error("Erro ao cancelar reserva:", error)
      }
    }
  }

  const handleSave = async () => {
    try {
      if (selectedReserva) {
        await reservaService.update(selectedReserva.id, formData)
      } else {
        await reservaService.create(formData)
      }
      loadReservas()
      setDialogOpen(false)
      setSelectedReserva(null)
    } catch (error) {
      console.error("Erro ao salvar reserva:", error)
      
      // Capturar a mensagem de erro do backend
      let errorMsg = "Erro ao salvar reserva"
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message
      } else if (error.message) {
        errorMsg = error.message
      }
      
      setErrorMessage(errorMsg)
      setShowError(true)
    }
  }

  const formFields = [
    { name: "areaComumId", label: "Área Comum", type: "select", options: areasComuns, required: true },
    { name: "unidadeId", label: "Unidade", type: "select", options: unidades, required: true },
    { name: "data", label: "Data da Reserva", type: "date", required: true },
    { name: "horarioInicio", label: "Hora de Início", type: "time", required: true },
    { name: "horarioFim", label: "Hora de Fim", type: "time", required: true },
  ]

  return (
    <Box>
      <PageHeader
        title="Reservas de Áreas Comuns"
        subtitle="Gerencie as reservas das áreas comuns do condomínio"
        action={canPerformAction('create') ? <AddIcon /> : null}
        actionLabel={canPerformAction('create') ? "Nova Reserva" : null}
        onAction={canPerformAction('create') ? () => {
          setSelectedReserva(null)
          setDialogOpen(true)
        } : null}
      />

      <DataTable
        columns={columns}
        data={reservas}
        loading={loading}
        actions={actions}
      />

      <FormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setSelectedReserva(null)
        }}
        onSave={handleSave}
        title={selectedReserva ? "Editar Reserva" : "Nova Reserva"}
      >
        <FormFields
          fields={formFields}
          initialData={selectedReserva}
          onChange={setFormData}
        />
      </FormDialog>

      <Snackbar 
        open={showError} 
        autoHideDuration={6000} 
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowError(false)} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default withPermission(Reservas, "reservas", "read");
