import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  TablePagination,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material"
import { Edit, Delete, Visibility } from "@mui/icons-material"
import { useState } from "react"
import { formatDateBR, formatDateTimeBR, formatTimeBR } from "../../utils/dateFormat"

export function DataTable({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  onView,
  title,
  emptyMessage = "Nenhum registro encontrado",
  actions = [],
  loading = false,
}) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  // Função para renderizar o valor da célula baseado no tipo
  const renderCellValue = (row, column) => {
    if (column.renderCell) {
      return column.renderCell(row)
    }

    const value = row[column.field || column.id]

    // Renderização específica por tipo
    switch (column.type) {
      case "status":
        return (
          <Chip
            label={value}
            color={
              value === "ATIVO" || value === "PAGO" || value === "OCUPADA" 
                ? "success" 
                : value === "PENDENTE" || value === "VAZIA"
                ? "warning"
                : "error"
            }
            size="small"
            variant="outlined"
          />
        )
      case "currency":
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value || 0)
      case "date":
        return formatDateBR(value)
      case "datetime":
        return formatDateTimeBR(value)
      case "time":
        return formatTimeBR(value)
      case "avatar":
        return (
          <Avatar sx={{ width: 32, height: 32, bgcolor: "#2BD2FF" }}>
            {value?.charAt(0)?.toUpperCase() || "?"}
          </Avatar>
        )
      default:
        return value || "-"
    }
  }

  return (
    <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
      {title && (
        <Box sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              {columns.map((column) => (
                <TableCell 
                  key={column.field || column.id} 
                  align={column.align || "left"}
                  sx={{ 
                    fontWeight: 600,
                    color: "text.primary",
                    borderBottom: "2px solid",
                    borderColor: "divider"
                  }}
                >
                  {column.headerName || column.label}
                </TableCell>
              ))}
              {(Array.isArray(actions) && actions.length > 0) || (actions && (onEdit || onDelete || onView)) && (
                <TableCell 
                  align="center"
                  sx={{ 
                    fontWeight: 600,
                    color: "text.primary",
                    borderBottom: "2px solid",
                    borderColor: "divider"
                  }}
                >
                  Ações
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + ((Array.isArray(actions) && actions.length > 0) || (actions && (onEdit || onDelete || onView)) ? 1 : 0)} 
                  align="center" 
                  sx={{ py: 6 }}
                >
                  <CircularProgress size={40} />
                  <Typography color="textSecondary" variant="body1" sx={{ mt: 2 }}>
                    Carregando...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + ((Array.isArray(actions) && actions.length > 0) || (actions && (onEdit || onDelete || onView)) ? 1 : 0)} 
                  align="center" 
                  sx={{ py: 6 }}
                >
                  <Typography color="textSecondary" variant="body1">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow 
                  key={row.id || index} 
                  hover 
                  sx={{ 
                    "&:hover": { 
                      bgcolor: "action.hover" 
                    },
                    "&:last-child td": {
                      borderBottom: 0
                    }
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.field || column.id} align={column.align || "left"}>
                      {renderCellValue(row, column)}
                    </TableCell>
                  ))}
                  {((Array.isArray(actions) && actions.length > 0) || (actions && (onEdit || onDelete || onView))) && (
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                        {Array.isArray(actions) ? actions.map((action, index) => (
                          <IconButton 
                            key={index}
                            size="small" 
                            onClick={() => action.onClick(row)} 
                            sx={{ 
                              color: "#2BD2FF",
                              "&:hover": { bgcolor: "#2BD2FF20" }
                            }}
                            title={action.name}
                          >
                            {action.icon}
                          </IconButton>
                        )) : (
                          <>
                            {onView && (
                              <IconButton 
                                size="small" 
                                onClick={() => onView(row)} 
                                sx={{ 
                                  color: "#2BD2FF",
                                  "&:hover": { bgcolor: "#2BD2FF20" }
                                }}
                                title="Visualizar"
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                            )}
                            {onEdit && (
                              <IconButton 
                                size="small" 
                                onClick={() => onEdit(row)} 
                                sx={{ 
                                  color: "#FA8BFF",
                                  "&:hover": { bgcolor: "#FA8BFF20" }
                                }}
                                title="Editar"
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            )}
                            {onDelete && (
                              <IconButton 
                                size="small" 
                                onClick={() => onDelete(row)} 
                                sx={{ 
                                  color: "#F44336",
                                  "&:hover": { bgcolor: "#F4433620" }
                                }}
                                title="Excluir"
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            )}
                          </>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {data.length > 0 && (
        <Box sx={{ borderTop: 1, borderColor: "divider" }}>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Registros por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            sx={{
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                fontSize: "0.875rem",
              },
            }}
          />
        </Box>
      )}
    </Paper>
  )
}
