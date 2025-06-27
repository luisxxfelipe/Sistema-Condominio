import { Box, Card, CardContent, Typography, Avatar } from "@mui/material"
import { TrendingUp, TrendingDown } from "@mui/icons-material"

export function StatCard({ title, value, icon, color, trend, trendValue, subtitle }) {
  return (
    <Card 
      sx={{ 
        height: "100%", 
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box flex={1}>
            <Typography 
              color="textSecondary" 
              gutterBottom 
              variant="body2"
              sx={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: "bold", 
                color: color,
                mb: 1,
                fontSize: { xs: "1.5rem", sm: "2rem" }
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                {subtitle}
              </Typography>
            )}
            {trend && trendValue && (
              <Box display="flex" alignItems="center">
                {trend === "up" ? (
                  <TrendingUp sx={{ color: "success.main", fontSize: 16, mr: 0.5 }} />
                ) : (
                  <TrendingDown sx={{ color: "error.main", fontSize: 16, mr: 0.5 }} />
                )}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: trend === "up" ? "success.main" : "error.main",
                    fontWeight: 500
                  }}
                >
                  {trendValue}% este mês
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: `${color}20`,
              color: color,
              width: 56,
              height: 56,
              ml: 2,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  )
}
