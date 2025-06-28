import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from "@mui/icons-material"
import { PageHeader } from "../../components/common/PageHeader"
import { DataTable } from "../../components/common/DataTable"
import { FormDialog } from "../../components/common/FormDialog"
import { FormFields } from "../../components/common/FormFields"
import areaComumService from "../../services/areaComumService"

function AreasComuns() {
  const [areasComuns, setAreasComuns] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAreaComum, setSelectedAreaComum] = useState(null)
  const [formData, setFormData] = useState({})

  const columns = [
    { id: "id", label: "ID", minWidth: 80 },
    { id: "nome", label: "Nome", minWidth: 200 },
    { id: "descricao", label: "Descrição", minWidth: 250 },
    { id: "regras", label: "Regras", minWidth: 200 },
    { id: "totalReservas", label: "Total Reservas", minWidth: 120,
      renderCell: (row) => row._count?.reservas || 0 },
  ]

  const actions = [
    {
      icon: <ViewIcon />,
      name: "Visualizar",
      onClick: (row) => {
      },
    },
    {
      icon: <EditIcon />,
      name: "Editar",
      onClick: (row) => {
        setSelectedAreaComum(row)
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
    loadAreasComuns()
  }, [])

  const loadAreasComuns = async () => {
    try {
      setLoading(true)
      const data = await areaComumService.getAll()
      setAreasComuns(data)
    } catch (error) {
      console.error("Erro ao carregar áreas comuns:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta área comum?")) {
      try {
        await areaComumService.delete(id)
        loadAreasComuns()
      } catch (error) {
        console.error("Erro ao excluir área comum:", error)
        alert("Erro ao excluir área comum. Verifique se não há reservas associadas.")
      }
    }
  }

  const handleSave = async () => {
    try {
      if (selectedAreaComum) {
        await areaComumService.update(selectedAreaComum.id, formData)
      } else {
        await areaComumService.create(formData)
      }
      loadAreasComuns()
      setDialogOpen(false)
      setSelectedAreaComum(null)
    } catch (error) {
      console.error("Erro ao salvar área comum:", error)
    }
  }

  const formFields = [
    { name: "nome", label: "Nome", required: true, placeholder: "Ex: Piscina, Salão de Festas" },
    { name: "descricao", label: "Descrição", multiline: true, placeholder: "Descreva a área comum" },
    { name: "regras", label: "Regras de Uso", multiline: true, placeholder: "Regras para utilização da área" },
  ]

  return (
    <Box>
      <PageHeader
        title="Gerenciamento de Áreas Comuns"
        subtitle="Gerencie as áreas comuns do condomínio"
        action={<AddIcon />}
        actionLabel="Nova Área Comum"
        onAction={() => {
          setSelectedAreaComum(null)
          setDialogOpen(true)
        }}
      />

      <DataTable
        columns={columns}
        data={areasComuns}
        loading={loading}
        actions={actions}
      />

      <FormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setSelectedAreaComum(null)
        }}
        onSave={handleSave}
        title={selectedAreaComum ? "Editar Área Comum" : "Nova Área Comum"}
      >
        <FormFields
          fields={formFields}
          initialData={selectedAreaComum}
          onChange={setFormData}
        />
      </FormDialog>
    </Box>
  )
}

export default AreasComuns
