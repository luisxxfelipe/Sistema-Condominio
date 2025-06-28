# Sistema de Gestão de Condomínios

Projeto acadêmico desenvolvido como parte do trabalho final da disciplina da professora Cristina.

Este sistema tem como objetivo o gerenciamento completo de um condomínio, permitindo:
- Cadastro de moradores e unidades
- Controle de acesso de visitantes e prestadores de serviço
- Emissão e gerenciamento de boletos de condomínio
- Reserva de áreas comuns (salão de festas, churrasqueira, etc.)
- Quadro de avisos para comunicação interna

---

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- MySQL
- JWT (JSON Web Tokens)
- dotenv

### Frontend
- React
- TypeScript
- Vite
- Axios
- React Router DOM
- Context API

---

## Funcionalidades Previstas

- [x] Estrutura inicial do projeto (frontend + backend)
- [ ] Autenticação de usuários com níveis de permissão
- [x] CRUD de moradores
- [x] CRUD de unidades
- [x] CRUD de visitantes e prestadores de serviço
- [x] Emissão e controle de boletos
- [x] Reserva de áreas comuns com validação de horário
- [x] Visualização de avisos do condomínio
- [x] Views e stored procedures no banco de dados
- [x] Logs de transações (ações, usuários, horários e SQL executado)
- [ ] Gerenciamento de usuários e permissões conforme perfis

---

## Como executar o projeto

### Backend
```bash
cd Backend
npm install
npx prisma migrate dev
npm run dev
