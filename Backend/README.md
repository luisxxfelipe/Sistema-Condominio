# Sistema de Gestão de Condomínios - Backend

Este é o backend do Sistema de Gestão de Condomínios desenvolvido como projeto acadêmico. O sistema implementa todas as exigências mínimas especificadas, incluindo CRUD completo, views, stored procedures, sistema de logs e gerenciamento de usuários com diferentes níveis de permissão.

## Funcionalidades Principais

- **Gestão de Moradores e Unidades**: Cadastro completo de moradores e suas respectivas unidades
- **Controle de Acesso**: Registro de visitantes e prestadores de serviço
- **Sistema Financeiro**: Emissão e controle de boletos de condomínio
- **Reservas**: Gestão de reservas de áreas comuns (salão de festas, churrasqueira, etc.)
- **Quadro de Avisos**: Sistema de comunicação interna
- **Relatórios e Dashboard**: Relatórios completos e dashboard resumo
- **Sistema de Logs**: Auditoria completa de todas as transações
- **Gerenciamento de Usuários**: 6 tipos diferentes de usuários com permissões específicas

## Arquitetura

O projeto segue uma arquitetura em camadas:

```
src/
├── controllers/     # Controladores das rotas
├── services/        # Lógica de negócio
├── routes/          # Definição das rotas
├── middlewares/     # Middlewares de autenticação e logs
└── utils/           # Utilitários diversos
```

## Modelo de Dados

### Entidades Principais:
- **Usuario**: Gerenciamento de usuários do sistema
- **Morador**: Dados dos moradores do condomínio
- **Unidade**: Informações das unidades habitacionais
- **Visitante**: Controle de visitantes
- **PrestadorServico**: Controle de prestadores de serviço
- **AreaComum**: Áreas comuns disponíveis para reserva
- **Reserva**: Reservas das áreas comuns
- **Boleto**: Sistema de cobrança
- **Aviso**: Quadro de avisos
- **LogTransacao**: Sistema de auditoria

## Tipos de Usuários e Permissões

Conforme especificado no trabalho, o sistema implementa 6 tipos de usuários:

### 1. Administrador Geral (`admin`)
- Acesso total a todas as funcionalidades
- Pode criar, alterar e excluir usuários
- Permissão para criar views e stored procedures

### 2. Gerente/Supervisor (`gerente`)
- CRUD completo em todas as tabelas de dados
- Sem permissão para criar/alterar objetos do banco

### 3. Operacional - Escrita (`escrita`)
- Inserir, ler e atualizar dados específicos
- Sem permissão para exclusão

### 4. Operacional - Leitura (`leitura`)
- Apenas leitura de dados em tabelas específicas

### 5. Convidado/Consulta (`convidado`)
- Acesso apenas às views criadas
- Sem acesso direto às tabelas

### 6. Manutenção/Auditor (`auditor`)
- Acesso aos logs de transações
- Execução de stored procedures de manutenção/relatórios

## API Endpoints

### Autenticação
```
POST /api/auth/login       # Login do usuário
POST /api/auth/logout      # Logout do usuário
```

### Moradores
```
GET    /api/moradores                    # Listar todos os moradores
GET    /api/moradores/:id                # Buscar morador por ID
GET    /api/moradores/cpf/:cpf           # Buscar morador por CPF
GET    /api/moradores/unidade/:unidadeId # Moradores de uma unidade
POST   /api/moradores                    # Criar morador
PUT    /api/moradores/:id                # Atualizar morador
DELETE /api/moradores/:id                # Excluir morador
```

### Unidades
```
GET    /api/unidades          # Listar todas as unidades
GET    /api/unidades/:id      # Buscar unidade por ID
POST   /api/unidades          # Criar unidade
PUT    /api/unidades/:id      # Atualizar unidade
DELETE /api/unidades/:id      # Excluir unidade
```

### Visitantes
```
GET    /api/visitantes                    # Listar visitantes
GET    /api/visitantes/:id                # Buscar visitante por ID
GET    /api/visitantes/unidade/:unidadeId # Visitantes de uma unidade
POST   /api/visitantes                    # Registrar visitante
PUT    /api/visitantes/:id                # Atualizar visitante
DELETE /api/visitantes/:id                # Excluir visitante
```

### Prestadores de Serviço
```
GET    /api/prestadores-servico        # Listar prestadores
GET    /api/prestadores-servico/ativos # Prestadores ativos (sem saída)
GET    /api/prestadores-servico/:id    # Buscar prestador por ID
POST   /api/prestadores-servico        # Registrar entrada
PUT    /api/prestadores-servico/:id    # Atualizar dados
PATCH  /api/prestadores-servico/:id/saida # Registrar saída
DELETE /api/prestadores-servico/:id    # Excluir prestador
```

### Boletos
```
GET  /api/boletos                    # Listar boletos
GET  /api/boletos/pendentes          # Boletos pendentes
GET  /api/boletos/:id                # Buscar boleto por ID
GET  /api/boletos/unidade/:unidadeId # Boletos de uma unidade
POST /api/boletos                    # Criar boleto
POST /api/boletos/gerar-mes          # Gerar boletos para todas as unidades
PUT  /api/boletos/:id                # Atualizar boleto
PATCH /api/boletos/:id/pagar         # Marcar como pago
DELETE /api/boletos/:id              # Excluir boleto
```

### Reservas
```
GET  /api/reservas                       # Listar reservas
GET  /api/reservas/verificar-disponibilidade # Verificar disponibilidade
GET  /api/reservas/periodo               # Reservas por período
GET  /api/reservas/:id                   # Buscar reserva por ID
GET  /api/reservas/unidade/:unidadeId    # Reservas de uma unidade
GET  /api/reservas/area/:areaComumId     # Reservas de uma área
POST /api/reservas                       # Criar reserva
PUT  /api/reservas/:id                   # Atualizar reserva
DELETE /api/reservas/:id                 # Excluir reserva
```

### Áreas Comuns
```
GET    /api/areas-comuns            # Listar áreas comuns
GET    /api/areas-comuns/disponiveis # Áreas disponíveis para um horário
GET    /api/areas-comuns/:id        # Buscar área por ID
POST   /api/areas-comuns            # Criar área comum
PUT    /api/areas-comuns/:id        # Atualizar área comum
DELETE /api/areas-comuns/:id        # Excluir área comum
```

### Avisos
```
GET    /api/avisos          # Listar avisos
GET    /api/avisos/recentes # Avisos recentes
GET    /api/avisos/:id      # Buscar aviso por ID
POST   /api/avisos          # Criar aviso
PUT    /api/avisos/:id      # Atualizar aviso
DELETE /api/avisos/:id      # Excluir aviso
```

### Logs (Acesso restrito)
```
GET /api/logs                    # Listar logs
GET /api/logs/periodo            # Logs por período
GET /api/logs/usuario/:usuarioId # Logs de um usuário
GET /api/logs/acao/:acao         # Logs por tipo de ação
GET /api/logs/:id                # Buscar log por ID
DELETE /api/logs/limpar/antigos  # Limpar logs antigos
```

### Relatórios
```
GET /api/relatorios/ocupacao      # Relatório de ocupação
GET /api/relatorios/financeiro    # Relatório financeiro
GET /api/relatorios/reservas      # Relatório de reservas
GET /api/relatorios/visitantes    # Relatório de visitantes
GET /api/relatorios/prestadores   # Relatório de prestadores
GET /api/relatorios/dashboard     # Dashboard resumo
GET /api/relatorios/inadimplencia # Relatório de inadimplência
```

## Views e Stored Procedures

### Views Implementadas:
1. **vw_ocupacao_unidades**: Resumo de ocupação das unidades
2. **vw_financeiro_unidades**: Relatório financeiro por unidade

### Stored Procedures/Functions:
1. **validar_cpf()**: Validação básica de CPF
2. **gerar_boletos_mes()**: Geração em lote de boletos mensais
3. **verificar_disponibilidade_area()**: Verificação de disponibilidade de áreas comuns
4. **limpar_logs_antigos()**: Limpeza automática de logs antigos
5. **relatorio_inadimplencia()**: Relatório detalhado de inadimplência

## Configuração e Execução

### Pré-requisitos:
- Node.js (v14 ou superior)
- PostgreSQL
- npm ou yarn

### Instalação:
```bash
# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma migrate dev

# Executar seeds (usuários padrão)
npm run seed

# Iniciar servidor
npm start
```

### Variáveis de Ambiente:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/condominio"
JWT_SECRET="sua_chave_secreta_jwt"
PORT=3000
```

## Sistema de Logs

O sistema implementa um sistema completo de auditoria que registra:
- Usuário que executou a ação
- Data e hora da transação
- Tipo de operação (INSERT, UPDATE, DELETE)
- SQL executado
- Tabela afetada

Os logs são gerados automaticamente através de triggers no banco de dados e também através de middlewares na aplicação.

## Segurança

- Autenticação JWT
- Hash de senhas com bcrypt
- Middleware de autorização baseado em perfis
- Validação de dados de entrada
- Logs de auditoria completos

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **Prisma ORM**: ORM para banco de dados
- **PostgreSQL**: Banco de dados relacional
- **JWT**: Autenticação
- **bcrypt**: Hash de senhas

## Equipe de Desenvolvimento

- Luis Felipe
- Letícia Laurentys
- Marcelo

## Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do trabalho da disciplina de Administração de Banco de Dados.
