-- Script para criação dos 6 usuários conforme especificação do trabalho
-- Sistema de Gestão de Condomínios

-- 1. Usuário Administrador Geral
INSERT INTO Usuario (nome, login, senhaHash, tipoPerfil) VALUES 
('Administrador Geral', 'admin', '$2b$10$hash_da_senha_admin', 'admin');

-- 2. Usuário Gerente/Supervisor  
INSERT INTO Usuario (nome, login, senhaHash, tipoPerfil) VALUES 
('Gerente do Condomínio', 'gerente', '$2b$10$hash_da_senha_gerente', 'gerente');

-- 3. Usuário Operacional - Escrita
INSERT INTO Usuario (nome, login, senhaHash, tipoPerfil) VALUES 
('Operador Portaria', 'portaria', '$2b$10$hash_da_senha_portaria', 'escrita');

-- 4. Usuário Operacional - Leitura
INSERT INTO Usuario (nome, login, senhaHash, tipoPerfil) VALUES 
('Consultor Síndico', 'sindico', '$2b$10$hash_da_senha_sindico', 'leitura');

-- 5. Usuário Convidado/Consulta
INSERT INTO Usuario (nome, login, senhaHash, tipoPerfil) VALUES 
('Morador Convidado', 'convidado', '$2b$10$hash_da_senha_convidado', 'convidado');

-- 6. Usuário Manutenção/Auditor
INSERT INTO Usuario (nome, login, senhaHash, tipoPerfil) VALUES 
('Auditor do Sistema', 'auditor', '$2b$10$hash_da_senha_auditor', 'auditor');

-- Para PostgreSQL, também podemos criar usuários do banco de dados com permissões específicas:

-- 1. Usuário Administrador Geral (todos os privilégios)
-- CREATE USER admin_geral WITH PASSWORD 'senha_segura_admin';
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin_geral;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin_geral;
-- GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO admin_geral;

-- 2. Usuário Gerente (CRUD em dados, sem DDL)
-- CREATE USER gerente_condominio WITH PASSWORD 'senha_segura_gerente';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO gerente_condominio;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO gerente_condominio;

-- 3. Usuário Operacional Escrita (sem DELETE)
-- CREATE USER operacional_escrita WITH PASSWORD 'senha_segura_escrita';
-- GRANT SELECT, INSERT, UPDATE ON Morador, Unidade, Visitante, PrestadorServico, Reserva TO operacional_escrita;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO operacional_escrita;

-- 4. Usuário Operacional Leitura (apenas SELECT)
-- CREATE USER operacional_leitura WITH PASSWORD 'senha_segura_leitura';
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO operacional_leitura;

-- 5. Usuário Convidado (apenas views)
-- CREATE USER convidado_consulta WITH PASSWORD 'senha_segura_convidado';
-- GRANT SELECT ON vw_ocupacao_unidades, vw_financeiro_unidades TO convidado_consulta;
-- GRANT SELECT ON Aviso TO convidado_consulta;

-- 6. Usuário Auditor (logs e procedures específicas)
-- CREATE USER auditor_sistema WITH PASSWORD 'senha_segura_auditor';
-- GRANT SELECT ON LogTransacao TO auditor_sistema;
-- GRANT EXECUTE ON FUNCTION limpar_logs_antigos(INTEGER) TO auditor_sistema;
-- GRANT EXECUTE ON FUNCTION relatorio_inadimplencia() TO auditor_sistema;
