// Função para formatar data no padrão brasileiro (DD/MM/YYYY)
export const formatDateBR = (date) => {
  if (!date) return '-';
  
  try {
    const dateObj = new Date(date);
    
    // Verificar se a data é válida
    if (isNaN(dateObj.getTime())) return '-';
    
    // Formatar no padrão brasileiro
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return '-';
  }
};

// Função para formatar data e hora no padrão brasileiro
export const formatDateTimeBR = (date) => {
  if (!date) return '-';
  
  try {
    const dateObj = new Date(date);
    
    // Verificar se a data é válida
    if (isNaN(dateObj.getTime())) return '-';
    
    // Formatar no padrão brasileiro com horário
    return dateObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Erro ao formatar data e hora:', error);
    return '-';
  }
};

// Função para formatar apenas o horário
export const formatTimeBR = (time) => {
  if (!time) return '-';
  
  try {
    // Se for uma string de horário (HH:MM)
    if (typeof time === 'string' && time.includes(':')) {
      return time;
    }
    
    const dateObj = new Date(time);
    
    // Verificar se a data é válida
    if (isNaN(dateObj.getTime())) return '-';
    
    // Formatar apenas o horário
    return dateObj.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Erro ao formatar horário:', error);
    return '-';
  }
};
