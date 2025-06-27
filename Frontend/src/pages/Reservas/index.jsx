import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { PageHeader } from "../../components/common/PageHeader"
import { DataTable } from "../../components/common/DataTable"
import { FormDialog } from "../../components/common/FormDialog"
import { FormFields } from "../../components/common/FormFields"
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

  const columns = [
    { id: "areaComumId", label: "Área Comum", minWidth: 170 },
    { id: "unidadeId", label: "Unidade", minWidth: 100 },
    { id: "data", label: "Data", minWidth: 120 },
    { id: "horarioInicio", label: "Início", minWidth: 100 },
    { id: "horarioFim", label: "Fim", minWidth: 100 },
  ]

  const actions = [
    {
      icon: <EditIcon />,
      name: "Editar",
      onClick: (row) => {
        setSelectedReserva(row)
        setDialogOpen(true)
      },
    },
    {
      icon: <DeleteIcon />,
      name: "Cancelar",
      onClick: (row) => handleDelete(row.id),
    },
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
        action={<AddIcon />}
        actionLabel="Nova Reserva"
        onAction={() => {
          setSelectedReserva(null)
          setDialogOpen(true)
        }}
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
    </Box>
  )
}

export default Reservas
