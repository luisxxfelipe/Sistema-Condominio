import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { PageHeader } from "../../components/common/PageHeader"
import { DataTable } from "../../components/common/DataTable"
import { FormDialog } from "../../components/common/FormDialog"
import { FormFields } from "../../components/common/FormFields"
import { withPermission, usePermissions } from "../../hooks/usePermissions"
import unidadeService from "../../services/unidadeService"

function Unidades() {
  const [unidades, setUnidades] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUnidade, setSelectedUnidade] = useState(null)
  const [formData, setFormData] = useState({})

  const { canPerformAction } = usePermissions()

  const columns = [
    { id: "numero", label: "Número", minWidth: 100 },
    { id: "bloco", label: "Bloco", minWidth: 100 },
    { id: "tipo", label: "Tipo", minWidth: 130 },
  ]

  const actions = [
    ...(canPerformAction('update') ? [{
      icon: <EditIcon />,
      name: "Editar",
      onClick: (row) => {
        setSelectedUnidade(row)
        setDialogOpen(true)
      },
    }] : []),
    ...(canPerformAction('delete') ? [{
      icon: <DeleteIcon />,
      name: "Excluir",
      onClick: (row) => handleDelete(row.id),
    }] : []),
  ]

  useEffect(() => {
    loadUnidades()
  }, [])

  const loadUnidades = async () => {
    try {
      setLoading(true)
      const data = await unidadeService.getAll()
      setUnidades(data)
    } catch (error) {
      console.error("Erro ao carregar unidades:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta unidade?")) {
      try {
        await unidadeService.delete(id)
        loadUnidades()
      } catch (error) {
        console.error("Erro ao excluir unidade:", error)
      }
    }
  }

  const handleSave = async () => {
    try {
      if (selectedUnidade) {
        await unidadeService.update(selectedUnidade.id, formData)
      } else {
        await unidadeService.create(formData)
      }
      loadUnidades()
      setDialogOpen(false)
      setSelectedUnidade(null)
    } catch (error) {
      console.error("Erro ao salvar unidade:", error)
    }
  }

  const formFields = [
    { name: "numero", label: "Número", required: true },
    { name: "bloco", label: "Bloco", required: true },
    { name: "tipo", label: "Tipo", required: true },
  ]

  return (
    <Box>
      <PageHeader
        title="Gerenciamento de Unidades"
        subtitle="Cadastre e gerencie as unidades do condomínio"
        action={canPerformAction('create') ? <AddIcon /> : null}
        actionLabel={canPerformAction('create') ? "Nova Unidade" : null}
        onAction={canPerformAction('create') ? () => {
          setSelectedUnidade(null)
          setDialogOpen(true)
        } : null}
      />

      <DataTable
        columns={columns}
        data={unidades}
        loading={loading}
        actions={actions}
      />

      <FormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setSelectedUnidade(null)
        }}
        onSave={handleSave}
        title={selectedUnidade ? "Editar Unidade" : "Nova Unidade"}
      >
        <FormFields
          fields={formFields}
          initialData={selectedUnidade}
          onChange={setFormData}
        />
      </FormDialog>
    </Box>
  )
}

export default withPermission(Unidades, "unidades", "read");
