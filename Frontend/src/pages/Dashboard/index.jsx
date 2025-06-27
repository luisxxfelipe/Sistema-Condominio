import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Home,
  People,
  Security,
  CalendarToday,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Announcement,
} from "@mui/icons-material";
import { PageHeader } from "../../components/common/PageHeader";
import { StatCard } from "../../components/common/StatCard";
import relatorioService from "../../services/relatorioService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUnidades: 0,
    totalMoradores: 0,
    visitantesHoje: 0,
    reservasHoje: 0,
    boletosPendentesHoje: 0,
    prestadoresAtivos: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await relatorioService.getDashboardResumo();
      
      // Armazenar dados completos
      setDashboardData(data);

      setStats({
        totalUnidades: data.totalUnidades || 0,
        totalMoradores: data.totalMoradores || 0,
        visitantesHoje: data.visitantesHoje || 0,
        reservasHoje: data.reservasHoje || 0,
        boletosPendentesHoje: data.boletosPendentesHoje || 0,
        prestadoresAtivos: data.prestadoresAtivos || 0,
      });

      // Atividades recentes baseadas nos dados reais
      const activities = [];
      
      if (data.visitantesHoje > 0) {
        activities.push({
          id: 1,
          type: "visitante",
          message: `${data.visitantesHoje} visitante(s) registrado(s) hoje`,
          time: "Hoje",
          color: "#2BD2FF",
        });
      }

      if (data.reservasHoje > 0) {
        activities.push({
          id: 2,
          type: "reserva",
          message: `${data.reservasHoje} reserva(s) para hoje`,
          time: "Hoje",
          color: "#FA8BFF",
        });
      }

      if (data.boletosPendentesHoje > 0) {
        activities.push({
          id: 3,
          type: "boleto",
          message: `${data.boletosPendentesHoje} boleto(s) vencido(s)`,
          time: "Vencidos",
          color: "#F44336",
        });
      }

      if (data.prestadoresAtivos > 0) {
        activities.push({
          id: 4,
          type: "prestador",
          message: `${data.prestadoresAtivos} prestador(es) ativo(s)`,
          time: "Agora",
          color: "#9C27B0",
        });
      }

      // Se não há atividades, mostrar mensagem
      if (activities.length === 0) {
        activities.push({
          id: 0,
          type: "info",
          message: "Nenhuma atividade recente",
          time: "Hoje",
          color: "#757575",
        });
      }

      setRecentActivity(activities);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
      // Em caso de erro, usar dados vazios
      setStats({
        totalUnidades: 0,
        totalMoradores: 0,
        visitantesHoje: 0,
        reservasHoje: 0,
        boletosPendentesHoje: 0,
        prestadoresAtivos: 0,
      });
      setRecentActivity([{
        id: 0,
        type: "error",
        message: "Erro ao carregar dados do sistema",
        time: "Agora",
        color: "#F44336",
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Carregando dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Dashboard do Condomínio"
        subtitle="Bem-vindo ao sistema de gestão. Aqui você encontra um resumo de todas as atividades."
      />

      {/* Layout principal: Cards à esquerda, Avisos e Resumo à direita */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Lado Esquerdo - Cards de estatísticas (layout original em linha) */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Total de Unidades"
                value={stats.totalUnidades}
                icon={<Home />}
                color="#2BD2FF"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Moradores"
                value={stats.totalMoradores}
                icon={<People />}
                color="#FA8BFF"
                trend="up"
                trendValue={5}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Visitantes Hoje"
                value={stats.visitantesHoje}
                icon={<Security />}
                color="#4CAF50"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Reservas Hoje"
                value={stats.reservasHoje}
                icon={<CalendarToday />}
                color="#FF9800"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Boletos Vencidos"
                value={stats.boletosPendentesHoje}
                icon={<AttachMoney />}
                color="#F44336"
                trend="down"
                trendValue={12}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Prestadores Ativos"
                value={stats.prestadoresAtivos}
                icon={<Security />}
                color="#9C27B0"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Lado Direito - Avisos Importantes e Resumo do Dia */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {/* Avisos Importantes */}
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: 2,
                  border: "2px solid",
                  borderColor: "#FF9800",
                  backgroundColor: "#FFF3E0"
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: "#F57C00" }}
                  >
                    <Announcement sx={{ mr: 1, verticalAlign: "middle" }} />
                    Avisos Importantes
                  </Typography>

                  {dashboardData?.avisosRecentes?.length > 0 ? (
                    dashboardData.avisosRecentes.map((aviso) => (
                      <Box key={aviso.id} sx={{ mb: 2 }}>
                        <Chip
                          label={aviso.titulo}
                          color="info"
                          size="small"
                          sx={{ mb: 1, mr: 1 }}
                        />
                        <Typography variant="body2" color="textSecondary">
                          {aviso.descricao}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Nenhum aviso recente
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Resumo do Dia */}
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    📊 Resumo do Dia
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2">Visitantes hoje:</Typography>
                      <Chip 
                        label={stats.visitantesHoje} 
                        size="small" 
                        color="success" 
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2">Reservas hoje:</Typography>
                      <Chip 
                        label={stats.reservasHoje} 
                        size="small" 
                        color="primary" 
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2">Boletos vencidos:</Typography>
                      <Chip 
                        label={stats.boletosPendentesHoje} 
                        size="small" 
                        color="error" 
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2">Prestadores ativos:</Typography>
                      <Chip 
                        label={stats.prestadoresAtivos} 
                        size="small" 
                        color="secondary" 
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Seção de atividades recentes */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                🕐 Atividades Recentes
              </Typography>
              <List sx={{ pt: 1 }}>
                {recentActivity.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: `${activity.color}20`,
                          color: activity.color,
                        }}
                      >
                        {activity.type === "visitante" && <Security />}
                        {activity.type === "reserva" && <CalendarToday />}
                        {activity.type === "boleto" && <AttachMoney />}
                        {activity.type === "morador" && <People />}
                        {activity.type === "prestador" && <Security />}
                        {activity.type === "info" && <Announcement />}
                        {activity.type === "error" && <TrendingDown />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.message}
                      secondary={activity.time}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
