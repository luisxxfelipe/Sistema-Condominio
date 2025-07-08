import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Payment as PaymentIcon } from "@mui/icons-material"
import { PageHeader } from "../../components/common/PageHeader"
import { DataTable } from "../../components/common/DataTable"
import { FormDialog } from "../../components/common/FormDialog"
import { FormFields } from "../../components/common/FormFields"
import { withPermission, usePermissions } from "../../hooks/usePermissions"
import boletoService from "../../services/boletoService"
import moradorService from "../../services/moradorService"
import unidadeService from "../../services/unidadeService"

function Boletos() {
  const [boletos, setBoletos] = useState([])
  const [unidades, setUnidades] = useState([])
  const [moradores, setMoradores] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedBoleto, setSelectedBoleto] = useState(null)
  const [formData, setFormData] = useState({})

  const { canPerformAction } = usePermissions()

  const columns = [
    { id: "id", label: "ID", minWidth: 80 },
    { id: "mesRef", label: "Mês/Ano Ref.", minWidth: 120 },
    { id: "unidade", label: "Unidade", minWidth: 170, 
      renderCell: (row) => row.unidade ? `${row.unidade.numero} - ${row.unidade.bloco || 'S/B'}` : 'N/A' },
    { id: "vencimento", label: "Vencimento", minWidth: 120, type: "date" },
    { id: "valor", label: "Valor", minWidth: 100, type: "currency" },
    { id: "status", label: "Status", minWidth: 100, type: "status" },
  ]

  const actions = [
    ...(canPerformAction('update') ? [{
      icon: <EditIcon />,
      name: "Editar",
      onClick: (row) => {
        setSelectedBoleto(row)
        setDialogOpen(true)
      },
    }] : []),
    ...(canPerformAction('update') ? [{
      icon: <PaymentIcon />,
      name: "Marcar como Pago",
      onClick: (row) => handlePagar(row.id),
    }] : []),
    ...(canPerformAction('delete') ? [{
      icon: <DeleteIcon />,
      name: "Excluir",
      onClick: (row) => handleDelete(row.id),
    }] : []),
  ]

  useEffect(() => {
    loadBoletos()
    loadMoradores()
    loadUnidades()
  }, [])

  const loadMoradores = async () => {
    try {
      const data = await moradorService.getAll()
      setMoradores(data.map(morador => ({
        value: morador.id,
        label: morador.nome
      })))
    } catch (error) {
      console.error("Erro ao carregar moradores:", error)
    }
  }

  const loadUnidades = async () => {
    try {
      const data = await unidadeService.getAll()
      setUnidades(data.map(unidade => ({
        value: unidade.id,
        label: `${unidade.numero} - ${unidade.bloco || 'Sem bloco'}`
      })))
    } catch (error) {
      console.error("Erro ao carregar unidades:", error)
    }
  }

  const loadBoletos = async () => {
    try {
      setLoading(true)
      const data = await boletoService.getAll()
      setBoletos(data)
    } catch (error) {
      console.error("Erro ao carregar boletos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este boleto?")) {
      try {
        await boletoService.delete(id)
        loadBoletos()
      } catch (error) {
        console.error("Erro ao excluir boleto:", error)
      }
    }
  }

  const handlePagar = async (id) => {
    if (window.confirm("Confirma o pagamento deste boleto?")) {
      try {
        await boletoService.pagarBoleto(id)
        loadBoletos()
      } catch (error) {
        console.error("Erro ao marcar boleto como pago:", error)
      }
    }
  }

  const handleSave = async () => {
    try {
      if (selectedBoleto) {
        await boletoService.update(selectedBoleto.id, formData)
      } else {
        await boletoService.create(formData)
      }
      loadBoletos()
      setDialogOpen(false)
      setSelectedBoleto(null)
    } catch (error) {
      console.error("Erro ao salvar boleto:", error)
    }
  }

  const formFields = [
    { name: "mesRef", label: "Mês/Ano Referência", required: true, placeholder: "Ex: 06/2025" },
    { name: "unidadeId", label: "Unidade", type: "select", options: unidades, required: true },
    { name: "valor", label: "Valor (R$)", type: "number", required: true },
    { name: "status", label: "Status", type: "select", options: [
      { value: "PENDENTE", label: "Pendente" },
      { value: "PAGO", label: "Pago" },
      { value: "VENCIDO", label: "Vencido" },
    ], required: true },
    { name: "vencimento", label: "Data de Vencimento", type: "date", required: true },
  ]

  return (
    <Box>
      <PageHeader
        title="Gerenciamento de Boletos"
        subtitle="Emita e gerencie os boletos do condomínio"
        action={canPerformAction('create') ? <AddIcon /> : null}
        actionLabel={canPerformAction('create') ? "Novo Boleto" : null}
        onAction={canPerformAction('create') ? () => {
          setSelectedBoleto(null)
          setDialogOpen(true)
        } : null}
      />

      <DataTable
        columns={columns}
        data={boletos}
        loading={loading}
        actions={actions}
      />

      <FormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setSelectedBoleto(null)
        }}
        onSave={handleSave}
        title={selectedBoleto ? "Editar Boleto" : "Novo Boleto"}
      >
        <FormFields
          fields={formFields}
          initialData={selectedBoleto}
          onChange={setFormData}
        />
      </FormDialog>
    </Box>
  )
}

export default withPermission(Boletos, "boletos", "read");
