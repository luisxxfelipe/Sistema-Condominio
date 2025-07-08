import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, InputAdornment, Box, Typography, Link } from "@mui/material"
import { Person } from "@mui/icons-material"
import authService from "../../services/authService"
import { LoginCard } from "../../components/common/LoginCard"
import { PasswordField } from "../../components/common/PasswordField"
import { LoadingButton } from "../../components/common/LoadingButton"
import { ErrorAlert } from "../../components/common/ErrorAlert"
import { usePermissions } from "../../hooks/usePermissions"

const LoginPage = () => {
  const [form, setForm] = useState({ login: "", senha: "" })
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { updateUser } = usePermissions()

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    if (erro) setErro("") // Limpa erro quando usuário digita
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro("")
    setLoading(true)

    try {
      const usuario = await authService.login(form.login, form.senha)
      if (usuario) {
        updateUser(usuario) // Atualizar contexto de permissões
        navigate("/dashboard")
      } else {
        setErro("Usuário ou senha inválidos.")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      if (error.response?.status === 401) {
        setErro("Usuário ou senha inválidos.")
      } else {
        setErro("Ocorreu um erro ao fazer login. Tente novamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginCard 
      title="Bem-vindo!" 
      subtitle="Faça login para acessar o sistema"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <ErrorAlert error={erro} />
        
        <TextField
          fullWidth
          label="Usuário"
          value={form.login}
          onChange={handleChange("login")}
          margin="normal"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="action" />
              </InputAdornment>
            ),
          }}
        />

        <PasswordField
          value={form.senha}
          onChange={handleChange("senha")}
          required
        />

        <LoadingButton
          type="submit"
          fullWidth
          loading={loading}
          loadingText="Entrando..."
          sx={{ mt: 3, py: 1.5 }}
        >
          Entrar
        </LoadingButton>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="textSecondary">
            Não tem uma conta?{" "}
            <Link 
              component="button"
              variant="body2"
              onClick={() => navigate("/cadastro")}
              sx={{ 
                cursor: "pointer",
                fontWeight: "bold",
                color: "primary.main",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Cadastre-se
            </Link>
          </Typography>
        </Box>
      </Box>
    </LoginCard>
  )
}

export default LoginPage

