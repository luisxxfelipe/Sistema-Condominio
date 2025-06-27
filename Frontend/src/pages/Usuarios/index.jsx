import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { PageHeader } from "../../components/common/PageHeader"
import { DataTable } from "../../components/common/DataTable"
import { FormDialog } from "../../components/common/FormDialog"
import { FormFields } from "../../components/common/FormFields"
import usuarioService from "../../services/usuarioService"

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState(null)
  const [formData, setFormData] = useState({})

  const columns = [
    { id: "nome", label: "Nome", minWidth: 170 },
    { id: "login", label: "Login", minWidth: 150 },
    { id: "tipoPerfil", label: "Perfil", minWidth: 120 },
  ]

  const actions = [
    {
      icon: <EditIcon />,
      name: "Editar",
      onClick: (row) => {
        setSelectedUsuario(row)
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
    loadUsuarios()
  }, [])

  const loadUsuarios = async () => {
    try {
      setLoading(true)
      const data = await usuarioService.getAll()
      setUsuarios(data)
    } catch (error) {
      console.error("Erro ao carregar usuários:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await usuarioService.delete(id)
        loadUsuarios()
      } catch (error) {
        console.error("Erro ao excluir usuário:", error)
      }
    }
  }

  const handleSave = async () => {
    try {
      if (selectedUsuario) {
        await usuarioService.update(selectedUsuario.id, formData)
      } else {
        await usuarioService.create(formData)
      }
      loadUsuarios()
      setDialogOpen(false)
      setSelectedUsuario(null)
    } catch (error) {
      console.error("Erro ao salvar usuário:", error)
    }
  }

  const formFields = [
    { name: "nome", label: "Nome Completo", required: true },
    { name: "login", label: "Login/Email", required: true },
    { name: "tipoPerfil", label: "Tipo de Perfil", type: "select", options: [
      { value: "usuario", label: "Usuário" },
      { value: "gerente", label: "Gerente" },
      { value: "admin", label: "Administrador" },
    ], required: true },
    ...(!selectedUsuario ? [{ name: "senhaHash", label: "Senha", type: "password", required: true }] : []),
  ]

  return (
    <Box>
      <PageHeader
        title="Gerenciamento de Usuários"
        subtitle="Gerencie os usuários e suas permissões no sistema"
        action={<AddIcon />}
        actionLabel="Novo Usuário"
        onAction={() => {
          setSelectedUsuario(null)
          setDialogOpen(true)
        }}
      />

      <DataTable
        columns={columns}
        data={usuarios}
        loading={loading}
        actions={actions}
      />

      <FormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setSelectedUsuario(null)
        }}
        onSave={handleSave}
        title={selectedUsuario ? "Editar Usuário" : "Novo Usuário"}
      >
        <FormFields
          fields={formFields}
          initialData={selectedUsuario}
          onChange={setFormData}
        />
      </FormDialog>
    </Box>
  )
}

export default Usuarios
