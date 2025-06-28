import { Grid } from "@mui/material";
import {
  Home,
  People,
  Security,
  CalendarToday,
  AttachMoney,
} from "@mui/icons-material";
import { StatCard } from "../common/StatCard";

export function StatsGrid({ stats, dashboardData }) {
  const statsConfig = [
    {
      title: "Total de Unidades",
      value: stats.totalUnidades,
      icon: <Home />,
      color: "#2BD2FF",
    },
    {
      title: "Moradores",
      value: stats.totalMoradores,
      icon: <People />,
      color: "#FA8BFF",
      trend: dashboardData?.crescimentoMoradores >= 0 ? "up" : "down",
      trendValue: Math.abs(dashboardData?.crescimentoMoradores || 0),
    },
    {
      title: "Visitantes Hoje",
      value: stats.visitantesHoje,
      icon: <Security />,
      color: "#4CAF50",
    },
    {
      title: "Reservas Hoje",
      value: stats.reservasHoje,
      icon: <CalendarToday />,
      color: "#FF9800",
    },
    {
      title: "Boletos Vencidos",
      value: stats.boletosVencidos,
      icon: <AttachMoney />,
      color: "#F44336",
      trend: stats.boletosVencidos > 0 ? "up" : "down",
      trendValue: stats.boletosVencidos,
    },
    {
      title: "Boletos Pendentes",
      value: stats.boletosPendentes,
      icon: <AttachMoney />,
      color: "#FF9800",
      trend: stats.boletosPendentes > 0 ? "up" : "down",
      trendValue: stats.boletosPendentes,
    },
    {
      title: "Áreas Comuns",
      value: stats.totalAreasComuns,
      icon: <Security />,
      color: "#9C27B0",
    },
  ];

  return (
    <Grid container spacing={3}>
      {statsConfig.map((stat, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            trend={stat.trend}
            trendValue={stat.trendValue}
          />
        </Grid>
      ))}
    </Grid>
  );
}
