import { useState, useEffect } from "react"
import { Box, Alert, Snackbar } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { PageHeader } from "../../components/common/PageHeader"
import { DataTable } from "../../components/common/DataTable"
import { FormDialog } from "../../components/common/FormDialog"
import { FormFields } from "../../components/common/FormFields"
import { withPermission, usePermissions } from "../../hooks/usePermissions"
import usuarioService from "../../services/usuarioService"

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState(null)
  const [formData, setFormData] = useState({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const { canPerformAction } = usePermissions()

  const columns = [
    { id: "nome", label: "Nome", minWidth: 170 },
    { id: "login", label: "Login", minWidth: 150 },
    { id: "tipoPerfil", label: "Perfil", minWidth: 120 },
  ]

  const actions = [
    ...(canPerformAction('update') ? [{
      icon: <EditIcon />,
      name: "Editar",
      onClick: (row) => {
        setSelectedUsuario(row)
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
        setSuccess("Usuário excluído com sucesso!")
        loadUsuarios()
      } catch (error) {
        console.error("Erro ao excluir usuário:", error)
        setError(error.response?.data?.message || "Erro ao excluir usuário")
      }
    }
  }

  const handleSave = async () => {
    try {
      if (selectedUsuario) {
        await usuarioService.update(selectedUsuario.id, formData)
        setSuccess("Usuário atualizado com sucesso!")
      } else {
        await usuarioService.create(formData)
        setSuccess("Usuário criado com sucesso!")
      }
      loadUsuarios()
      setDialogOpen(false)
      setSelectedUsuario(null)
      setFormData({})
    } catch (error) {
      console.error("Erro ao salvar usuário:", error)
      setError(error.response?.data?.message || "Erro ao salvar usuário")
    }
  }

  const formFields = [
    { name: "nome", label: "Nome Completo", required: true },
    { name: "login", label: "Login/Email", required: true },
    { name: "tipoPerfil", label: "Tipo de Perfil", type: "select", options: [
      { value: "convidado", label: "Convidado/Consulta" },
      { value: "leitura", label: "Operacional - Leitura" },
      { value: "escrita", label: "Operacional - Escrita" },
      { value: "gerente", label: "Gerente/Supervisor" },
      { value: "admin", label: "Administrador Geral" },
      { value: "auditor", label: "Manutenção/Auditor" },
    ], required: true },
    ...(!selectedUsuario ? [{ name: "senha", label: "Senha", type: "password", required: true }] : []),
  ]

  return (
    <Box>
      <PageHeader
        title="Gerenciamento de Usuários"
        subtitle="Gerencie os usuários e suas permissões no sistema"
        action={canPerformAction('create') ? <AddIcon /> : null}
        actionLabel={canPerformAction('create') ? "Novo Usuário" : null}
        onAction={canPerformAction('create') ? () => {
          setSelectedUsuario(null)
          setDialogOpen(true)
        } : null}
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
          setFormData({})
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

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError("")}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError("")} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!success} 
        autoHideDuration={3000} 
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess("")} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default withPermission(Usuarios, "usuarios", "read");
