import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, InputAdornment, Box, Typography, Link, MenuItem, FormControl, InputLabel, Select } from "@mui/material"
import { Person, Email, AccountCircle } from "@mui/icons-material"
import { createUsuario } from "../../services/usuarioService"
import { LoginCard } from "../../components/common/LoginCard"
import { PasswordField } from "../../components/common/PasswordField"
import { LoadingButton } from "../../components/common/LoadingButton"
import { ErrorAlert } from "../../components/common/ErrorAlert"

const Cadastro = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: "",
    login: "",
    senha: "",
    confirmarSenha: "",
    tipoPerfil: "usuario"
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    })
    if (error) setError("") // Limpa erro quando usuário digita
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validações
    if (!formData.nome || !formData.login || !formData.senha) {
      setError("Todos os campos são obrigatórios")
      setLoading(false)
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (formData.senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      const userData = {
        nome: formData.nome,
        login: formData.login,
        senha: formData.senha,
        tipoPerfil: formData.tipoPerfil
      }

      await createUsuario(userData)
      
      // Mostra sucesso e redireciona
      setTimeout(() => {
        navigate("/login")
      }, 1500)

    } catch (error) {
      setError(error.response?.data?.message || "Erro ao cadastrar usuário. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginCard 
      title="Criar Conta" 
      subtitle="Cadastre-se para acessar o sistema"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <ErrorAlert error={error} />
        
        <TextField
          fullWidth
          label="Nome Completo"
          value={formData.nome}
          onChange={handleChange("nome")}
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

        <TextField
          fullWidth
          label="Login/Email"
          value={formData.login}
          onChange={handleChange("login")}
          margin="normal"
          required
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="tipoPerfil-label">Tipo de Perfil</InputLabel>
          <Select
            labelId="tipoPerfil-label"
            value={formData.tipoPerfil}
            label="Tipo de Perfil"
            onChange={handleChange("tipoPerfil")}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle color="action" />
              </InputAdornment>
            }
          >
            <MenuItem value="usuario">Usuário</MenuItem>
            <MenuItem value="gerente">Gerente</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
          </Select>
        </FormControl>

        <PasswordField
          label="Senha"
          value={formData.senha}
          onChange={handleChange("senha")}
          helperText="Mínimo 6 caracteres"
          required
        />

        <PasswordField
          label="Confirmar Senha"
          value={formData.confirmarSenha}
          onChange={handleChange("confirmarSenha")}
          required
        />

        <LoadingButton
          type="submit"
          fullWidth
          loading={loading}
          loadingText="Cadastrando..."
          sx={{ mt: 3, py: 1.5 }}
        >
          Criar Conta
        </LoadingButton>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="textSecondary">
            Já tem uma conta?{" "}
            <Link 
              component="button"
              variant="body2"
              onClick={() => navigate("/login")}
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
              Faça login
            </Link>
          </Typography>
        </Box>
      </Box>
    </LoginCard>
  )
}

export default Cadastro