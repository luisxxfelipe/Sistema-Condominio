import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { PageHeader } from "../../components/common/PageHeader"
import { DataTable } from "../../components/common/DataTable"
import { FormDialog } from "../../components/common/FormDialog"
import { FormFields } from "../../components/common/FormFields"
import visitanteService from "../../services/visitanteService"
import unidadeService from "../../services/unidadeService"

function Visitantes() {
  const [visitantes, setVisitantes] = useState([])
  const [unidades, setUnidades] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedVisitante, setSelectedVisitante] = useState(null)
  const [formData, setFormData] = useState({})

  const columns = [
    { id: "nome", label: "Nome", minWidth: 170 },
    { id: "documento", label: "Documento", minWidth: 130 },
    { id: "dataVisita", label: "Data da Visita", minWidth: 120 },
    { id: "unidadeId", label: "Unidade", minWidth: 100 },
  ]

  const actions = [
    {
      icon: <EditIcon />,
      name: "Editar",
      onClick: (row) => {
        setSelectedVisitante(row)
        setDialogOpen(true)
      },
    },
    {
      icon: <DeleteIcon />,
      name: "Excluir",
      onClick: (row) => handleDelete(row.id),
    },
  ]

  useEffect(() => {
    loadVisitantes()
    loadUnidades()
  }, [])

  const loadUnidades = async () => {
    try {
      const data = await unidadeService.getAll()
      setUnidades(data.map(unidade => ({
        value: unidade.id,
        label: `${unidade.numero} - Bloco ${unidade.bloco}`
      })))
    } catch (error) {
      console.error("Erro ao carregar unidades:", error)
    }
  }

  const loadVisitantes = async () => {
    try {
      setLoading(true)
      const data = await visitanteService.getAll()
      setVisitantes(data)
    } catch (error) {
      console.error("Erro ao carregar visitantes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este visitante?")) {
      try {
        await visitanteService.delete(id)
        loadVisitantes()
      } catch (error) {
        console.error("Erro ao excluir visitante:", error)
      }
    }
  }

  const handleSave = async () => {
    try {
      if (selectedVisitante) {
        await visitanteService.update(selectedVisitante.id, formData)
      } else {
        await visitanteService.create(formData)
      }
      loadVisitantes()
      setDialogOpen(false)
      setSelectedVisitante(null)
    } catch (error) {
      console.error("Erro ao salvar visitante:", error)
    }
  }

  const formFields = [
    { name: "nome", label: "Nome Completo", required: true },
    { name: "documento", label: "Documento", required: true },
    { name: "dataVisita", label: "Data da Visita", type: "datetime-local", required: true },
    { name: "unidadeId", label: "Unidade Visitada", type: "select", options: unidades, required: true },
  ]

  return (
    <Box>
      <PageHeader
        title="Controle de Visitantes"
        subtitle="Registre e acompanhe os visitantes do condomínio"
        action={<AddIcon />}
        actionLabel="Novo Visitante"
        onAction={() => {
          setSelectedVisitante(null)
          setDialogOpen(true)
        }}
      />

      <DataTable
        columns={columns}
        data={visitantes}
        loading={loading}
        actions={actions}
      />

      <FormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setSelectedVisitante(null)
        }}
        onSave={handleSave}
        title={selectedVisitante ? "Editar Visitante" : "Novo Visitante"}
      >
        <FormFields
          fields={formFields}
          initialData={selectedVisitante}
          onChange={setFormData}
        />
      </FormDialog>
    </Box>
  )
}

export default Visitantes
