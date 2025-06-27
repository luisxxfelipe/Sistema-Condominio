import { useState } from "react"
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  Security as SecurityIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Announcement as AnnouncementIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"

const drawerWidth = 280

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Moradores", icon: <PeopleIcon />, path: "/moradores" },
  { text: "Unidades", icon: <HomeIcon />, path: "/unidades" },
  { text: "Visitantes", icon: <SecurityIcon />, path: "/visitantes" },
  { text: "Reservas", icon: <CalendarIcon />, path: "/reservas" },
  { text: "Áreas Comuns", icon: <HomeIcon />, path: "/areas-comuns" },
  { text: "Boletos", icon: <MoneyIcon />, path: "/boletos" },
  { text: "Avisos", icon: <AnnouncementIcon />, path: "/avisos" },
  { text: "Usuários", icon: <PersonIcon />, path: "/usuarios" },
]

export function MainLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const handleMenuClick = (path) => {
    navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const drawer = (
    <Box>
      {/* Logo/Header da Sidebar */}
      <Box
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #2BD2FF 0%, #FA8BFF 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Logo da empresa */}
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid white",
            flexShrink: 0,
          }}
        >
          <img src="/logo.svg" alt="Logo" style={{ width: "80%", height: "80%" }} />
        </Box>
        
        {/* Texto da empresa */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
            LLM
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, fontSize: "0.75rem" }}>
            Sistema de Gestão de Condomínio
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ px: 2, mb: 1 }}>
            <ListItemButton
              onClick={() => handleMenuClick(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  background: "linear-gradient(135deg, #2BD2FF20 0%, #FA8BFF20 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2BD2FF30 0%, #FA8BFF30 100%)",
                  },
                },
                "&:hover": {
                  background: "linear-gradient(135deg, #2BD2FF10 0%, #FA8BFF10 100%)",
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? "primary.main" : "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: location.pathname === item.path ? 600 : 400 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mt: 2 }} />

      {/* Logout */}
      <List>
        <ListItem disablePadding sx={{ px: 2, mt: 1 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              "&:hover": {
                background: "linear-gradient(135deg, #FF4D4D10 0%, #FF6B6B10 100%)",
                color: "#d32f2f",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Mobile menu button */}
      {isMobile && (
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            position: "fixed", 
            top: 16, 
            left: 16, 
            zIndex: 1300,
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            "&:hover": {
              background: "#f5f5f5",
            }
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
