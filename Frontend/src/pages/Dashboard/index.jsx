import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PageHeader } from "../../components/common/PageHeader";
import { StatsGrid } from "../../components/dashboard/StatsGrid";
import { ImportantNotices } from "../../components/dashboard/ImportantNotices";
import { RecentActivities } from "../../components/dashboard/RecentActivities";
import { DaySummary } from "../../components/dashboard/DaySummary";
import relatorioService from "../../services/relatorioService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUnidades: 0,
    totalMoradores: 0,
    visitantesHoje: 0,
    reservasHoje: 0,
    boletosVencidos: 0,
    boletosPendentes: 0,
    totalAreasComuns: 0,
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
        boletosVencidos: data.boletosVencidos || 0,
        boletosPendentes: data.boletosPendentes || 0,
        totalAreasComuns: data.totalAreasComuns || 0,
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

      if (data.boletosVencidos > 0) {
        activities.push({
          id: 3,
          type: "boleto",
          message: `${data.boletosVencidos} boleto(s) vencido(s)`,
          time: "Vencidos",
          color: "#F44336",
        });
      }

      if (data.totalAreasComuns > 0) {
        activities.push({
          id: 4,
          type: "area",
          message: `${data.totalAreasComuns} área(s) comum(ns) disponível(is)`,
          time: "Cadastradas",
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
        boletosVencidos: 0,
        boletosPendentes: 0,
        totalAreasComuns: 0,
      });
      setRecentActivity([
        {
          id: 0,
          type: "error",
          message: "Erro ao carregar dados do sistema",
          time: "Agora",
          color: "#F44336",
        },
      ]);
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

      {/* Layout reorganizado: Stats em cima, depois avisos e atividades */}
      <Grid container spacing={3}>
        {/* Cards de estatísticas - linha completa */}
        <Grid item xs={12}>
          <StatsGrid stats={stats} dashboardData={dashboardData} />
        </Grid>

        {/* Segunda linha: Avisos à esquerda, Resumo do dia no centro, Atividades à direita */}
        <Grid item xs={12} md={4}>
          <ImportantNotices avisos={dashboardData?.avisosRecentes} />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <DaySummary stats={stats} />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <RecentActivities activities={recentActivity} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
