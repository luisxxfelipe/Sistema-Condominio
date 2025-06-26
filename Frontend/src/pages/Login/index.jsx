import React from "react";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const loginPage = () => {
    const [form, setForm] = React.useState({ login: "", senha: "" });
    const [erro, setErro] = React.useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            const usuario = await authService.login(form.login, form.senha);
            if (usuario) {
                navigate("/dashboard");
            } else {
                setErro("Usuário ou senha inválidos.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setErro("Ocorreu um erro ao fazer login. Tente novamente.");
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="login">Login:</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={form.login}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={form.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                {erro && <p className="error">{erro}</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );

}

export default loginPage;

