import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { PageHeader } from "../../components/common/PageHeader"
import { DataTable } from "../../components/common/DataTable"
import { FormDialog } from "../../components/common/FormDialog"
import { FormFields } from "../../components/common/FormFields"
import avisoService from "../../services/avisoService"

function Avisos() {
  const [avisos, setAvisos] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAviso, setSelectedAviso] = useState(null)
  const [formData, setFormData] = useState({})

  const columns = [
    { id: "titulo", label: "Título", minWidth: 200 },
    { id: "descricao", label: "Descrição", minWidth: 300 },
    { id: "dataCriacao", label: "Data de Criação", minWidth: 150 },
  ]

  const actions = [
    {
      icon: <EditIcon />,
      name: "Editar",
      onClick: (row) => {
        setSelectedAviso(row)
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
    loadAvisos()
  }, [])

  const loadAvisos = async () => {
    try {
      setLoading(true)
      const data = await avisoService.getAll()
      setAvisos(data)
    } catch (error) {
      console.error("Erro ao carregar avisos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este aviso?")) {
      try {
        await avisoService.delete(id)
        loadAvisos()
      } catch (error) {
        console.error("Erro ao excluir aviso:", error)
      }
    }
  }

  const handleSave = async () => {
    try {
      if (selectedAviso) {
        await avisoService.update(selectedAviso.id, formData)
      } else {
        await avisoService.create(formData)
      }
      loadAvisos()
      setDialogOpen(false)
      setSelectedAviso(null)
    } catch (error) {
      console.error("Erro ao salvar aviso:", error)
    }
  }

  const formFields = [
    { name: "titulo", label: "Título", required: true },
    { name: "descricao", label: "Descrição", multiline: true, required: true },
  ]

  return (
    <Box>
      <PageHeader
        title="Avisos e Comunicados"
        subtitle="Publique e gerencie avisos para os moradores"
        action={<AddIcon />}
        actionLabel="Novo Aviso"
        onAction={() => {
          setSelectedAviso(null)
          setDialogOpen(true)
        }}
      />

      <DataTable
        columns={columns}
        data={avisos}
        loading={loading}
        actions={actions}
      />

      <FormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setSelectedAviso(null)
        }}
        onSave={handleSave}
        title={selectedAviso ? "Editar Aviso" : "Novo Aviso"}
      >
        <FormFields
          fields={formFields}
          initialData={selectedAviso}
          onChange={setFormData}
        />
      </FormDialog>
    </Box>
  )
}

export default Avisos
