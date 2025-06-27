import api from './api'

const relatorioService = {
  // Dashboard resumo
  async getDashboardResumo() {
    try {
      const response = await api.get('/relatorios/dashboard')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar dashboard resumo:', error)
      throw error
    }
  },

  // Relatório de ocupação
  async getRelatorioOcupacao() {
    try {
      const response = await api.get('/relatorios/ocupacao')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar relatório de ocupação:', error)
      throw error
    }
  },

  // Relatório financeiro
  async getRelatorioFinanceiro(mesRef = null) {
    try {
      const params = mesRef ? { mesRef } : {}
      const response = await api.get('/relatorios/financeiro', { params })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar relatório financeiro:', error)
      throw error
    }
  },

  // Relatório de reservas
  async getRelatorioReservas(dataInicio = null, dataFim = null) {
    try {
      const params = {}
      if (dataInicio) params.dataInicio = dataInicio
      if (dataFim) params.dataFim = dataFim
      
      const response = await api.get('/relatorios/reservas', { params })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar relatório de reservas:', error)
      throw error
    }
  },

  // Relatório de visitantes
  async getRelatorioVisitantes(dataInicio = null, dataFim = null) {
    try {
      const params = {}
      if (dataInicio) params.dataInicio = dataInicio
      if (dataFim) params.dataFim = dataFim
      
      const response = await api.get('/relatorios/visitantes', { params })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar relatório de visitantes:', error)
      throw error
    }
  },

  // Relatório de prestadores
  async getRelatorioPrestadores(dataInicio = null, dataFim = null) {
    try {
      const params = {}
      if (dataInicio) params.dataInicio = dataInicio
      if (dataFim) params.dataFim = dataFim
      
      const response = await api.get('/relatorios/prestadores', { params })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar relatório de prestadores:', error)
      throw error
    }
  },

  // Relatório de inadimplência
  async getRelatorioInadimplencia() {
    try {
      const response = await api.get('/relatorios/inadimplencia')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar relatório de inadimplência:', error)
      throw error
    }
  }
}

export default relatorioService
