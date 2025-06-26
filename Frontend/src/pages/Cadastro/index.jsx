import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import { createUsuario } from "@/services/usuarioService";

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    login: "",
    senha: "",
    confirmarSenha: "",
    tipoPerfil: "usuario"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validações
    if (!formData.nome || !formData.login || !formData.senha) {
      setError("Todos os campos são obrigatórios");
      setLoading(false);
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (formData.senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        nome: formData.nome,
        login: formData.login,
        senha: formData.senha,
        tipoPerfil: formData.tipoPerfil
      };

      await createUsuario(userData);
      setSuccess("Usuário cadastrado com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || "Erro ao cadastrar usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Cadastro de Usuário
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sistema de Gestão de Condomínio
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome Completo"
            name="nome"
            autoComplete="name"
            autoFocus
            value={formData.nome}
            onChange={handleChange}
            disabled={loading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login/Email"
            name="login"
            autoComplete="username"
            value={formData.login}
            onChange={handleChange}
            disabled={loading}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="tipoPerfil-label">Tipo de Perfil</InputLabel>
            <Select
              labelId="tipoPerfil-label"
              id="tipoPerfil"
              name="tipoPerfil"
              value={formData.tipoPerfil}
              label="Tipo de Perfil"
              onChange={handleChange}
              disabled={loading}
            >
              <MenuItem value="usuario">Usuário</MenuItem>
              <MenuItem value="gerente">Gerente</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="new-password"
            value={formData.senha}
            onChange={handleChange}
            disabled={loading}
            helperText="Mínimo 6 caracteres"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmarSenha"
            label="Confirmar Senha"
            type="password"
            id="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            size="large"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              disabled={loading}
            >
              Já tem uma conta? Faça login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Cadastro;