import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  Security,
  CalendarToday,
  AttachMoney,
  People,
  Announcement,
  TrendingDown,
} from "@mui/icons-material";

export function RecentActivities({ activities = [] }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        height: "fit-content"
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          🕐 Atividades Recentes
        </Typography>
        <List sx={{ pt: 1 }}>
          {activities.map((activity) => (
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
                  {activity.type === "area" && <Security />}
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
  );
}
