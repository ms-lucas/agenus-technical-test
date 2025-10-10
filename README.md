# Teste Técnico - Agenus

API REST para gestão de usuários e tarefas desenvolvida com Node.js, TypeScript, Fastify e Prisma.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Fastify** (framework web)
- **Prisma** (ORM)
- **PostgreSQL** (banco de dados)
- **Zod** (validação)
- **Biome** (linting/formatação)

## 📁 Estrutura do Projeto

```
src/
├── app.ts                    # Configuração do Fastify
├── server.ts                 # Inicialização do servidor
├── routes/                   # Definição das rotas
│   ├── index.ts             # Registro de rotas
│   ├── users-routes.ts      # Rotas de usuários
│   └── tasks-routes.ts      # Rotas de tarefas
├── controllers/              # Controllers HTTP
│   ├── users/               # Controllers de usuários
│   └── tasks/               # Controllers de tarefas
├── use-cases/               # Regras de negócio
├── entities/                # Entidades de domínio
├── database/                # Camada de dados
└── env/                     # Validação de variáveis
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
NODE_ENV=development
PORT=3333
DATABASE_URL=postgres://usuario:senha@localhost:5432/banco
```

### 2. Instalação

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npm run prisma:generate

# Aplicar migrações
npm run prisma:migrate:dev
```

### 3. Executar

```bash
npm run dev
```

Servidor disponível em: `http://localhost:3333`

## 📚 Documentação

A documentação interativa está disponível em: `http://localhost:3333/docs`

## 🔗 Endpoints

### Usuários

| Método   | Endpoint         | Descrição                               |
| -------- | ---------------- | --------------------------------------- |
| `GET`    | `/users`         | Listar usuários (com busca e paginação) |
| `GET`    | `/users/:userId` | Detalhar usuário                        |
| `POST`   | `/users`         | Criar usuário                           |
| `PUT`    | `/users/:userId` | Atualizar usuário                       |
| `DELETE` | `/users/:userId` | Remover usuário                         |

### Tarefas

| Método   | Endpoint         | Descrição                              |
| -------- | ---------------- | -------------------------------------- |
| `GET`    | `/tasks`         | Listar tarefas (com busca e paginação) |
| `GET`    | `/tasks/:taskId` | Detalhar tarefa                        |
| `POST`   | `/tasks`         | Criar tarefa                           |
| `PUT`    | `/tasks/:taskId` | Atualizar tarefa                       |
| `DELETE` | `/tasks/:taskId` | Remover tarefa                         |

## 📝 Exemplos

### Criar Usuário

```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@example.com"}'
```

### Criar Tarefa

```bash
curl -X POST http://localhost:3333/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implementar API",
    "description": "Desenvolver endpoints",
    "status": "pending",
    "userId": "uuid-do-usuario"
  }'
```

### Buscar Usuários

```bash
curl "http://localhost:3333/users?search=João&page=1&limit=10"
```

## 🗄️ Banco de Dados

### Usuário

- `id`: UUID (chave primária)
- `name`: String
- `email`: String (único)
- `createdAt`: DateTime

### Tarefa

- `id`: UUID (chave primária)
- `userId`: UUID (chave estrangeira)
- `title`: String
- `description`: String
- `status`: "pending" | "done"
- `createdAt`: DateTime

## 🛠️ Comandos

```bash
# Desenvolvimento
npm run dev                    # Iniciar servidor
npm run prisma:studio         # Abrir Prisma Studio

# Banco de dados
npm run prisma:generate       # Gerar cliente Prisma
npm run prisma:migrate:dev    # Aplicar migrações
npm run prisma:migrate:deploy # Deploy de migrações

# Qualidade
npm run lint                  # Verificar código
npm run format                # Formatar código
```

## 📋 Observações

- Todas as validações são feitas com Zod
- Paginação padrão: `page=1` e `limit=20`
- Códigos de erro padronizados (400, 404, 409, 500)
- Documentação automática com OpenAPI/Swagger
