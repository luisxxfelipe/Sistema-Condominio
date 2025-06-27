import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { PageHeader } from "../../components/common/PageHeader"
import { DataTable } from "../../components/common/DataTable"
import { FormDialog } from "../../components/common/FormDialog"
import { FormFields } from "../../components/common/FormFields"
import moradorService from "../../services/moradorService"
import unidadeService from "../../services/unidadeService"

function Moradores() {
  const [moradores, setMoradores] = useState([])
  const [unidades, setUnidades] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMorador, setSelectedMorador] = useState(null)
  const [formData, setFormData] = useState({})

  const columns = [
    { id: "nome", label: "Nome", minWidth: 170 },
    { id: "cpf", label: "CPF", minWidth: 130 },
    { id: "telefone", label: "Telefone", minWidth: 130 },
    { id: "unidadeId", label: "Unidade", minWidth: 100 },
  ]

  const actions = [
    {
      icon: <EditIcon />,
      name: "Editar",
      onClick: (row) => {
        setSelectedMorador(row)
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
    loadMoradores()
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

  const loadMoradores = async () => {
    try {
      setLoading(true)
      const data = await moradorService.getAll()
      setMoradores(data)
    } catch (error) {
      console.error("Erro ao carregar moradores:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este morador?")) {
      try {
        await moradorService.delete(id)
        loadMoradores()
      } catch (error) {
        console.error("Erro ao excluir morador:", error)
      }
    }
  }

  const handleSave = async () => {
    try {
      if (selectedMorador) {
        await moradorService.update(selectedMorador.id, formData)
      } else {
        await moradorService.create(formData)
      }
      loadMoradores()
      setDialogOpen(false)
      setSelectedMorador(null)
    } catch (error) {
      console.error("Erro ao salvar morador:", error)
    }
  }

  const formFields = [
    { name: "nome", label: "Nome Completo", required: true },
    { name: "cpf", label: "CPF", required: true },
    { name: "telefone", label: "Telefone", required: true },
    { name: "unidadeId", label: "Unidade", type: "select", options: unidades },
  ]

  return (
    <Box>
      <PageHeader
        title="Gerenciamento de Moradores"
        subtitle="Cadastre e gerencie os moradores do condomínio"
        action={<AddIcon />}
        actionLabel="Novo Morador"
        onAction={() => {
          setSelectedMorador(null)
          setDialogOpen(true)
        }}
      />

      <DataTable
        columns={columns}
        data={moradores}
        loading={loading}
        actions={actions}
      />

      <FormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setSelectedMorador(null)
        }}
        onSave={handleSave}
        title={selectedMorador ? "Editar Morador" : "Novo Morador"}
      >
        <FormFields
          fields={formFields}
          initialData={selectedMorador}
          onChange={setFormData}
        />
      </FormDialog>
    </Box>
  )
}

export default Moradores