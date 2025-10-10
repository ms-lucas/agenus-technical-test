## Teste Técnico – Estagiário Back-End (Node.js + TypeScript)

API REST para gestão de usuários e tarefas, construída com Fastify, TypeScript, Prisma e PostgreSQL, seguindo boas práticas de estrutura, validação e documentação automática (OpenAPI).

### Sumário
- **Stack**
- **Estrutura do projeto**
- **Pré‑requisitos**
- **Configuração do ambiente (.env)**
- **Banco de dados (PostgreSQL + Prisma)**
- **Como rodar o projeto**
- **Documentação da API (Swagger/Scalar)**
- **Endpoints**
  - Usuários
  - Tarefas
- **Erros e validação**
- **Qualidade de código**
- **Testes end-to-end (guia para Vitest + Supertest)**
- **Comandos úteis**

---

### Stack
- **Runtime**: Node.js + TypeScript
- **Framework**: Fastify (com `fastify-type-provider-zod`)
- **ORM**: PrismaORM
- **Banco de Dados**: PostgreSQL
- **Validação**: Zod
- **OpenAPI/Docs**: `@fastify/swagger` + `@scalar/fastify-api-reference`

### Estrutura do projeto
```
src/
  app.ts                  # Instância do Fastify, plugins, OpenAPI e /docs
  server.ts               # Bootstrap do servidor (PORT via .env)
  routes/                 # Rotas agrupadas por domínio
    index.ts              # Registro de rotas com prefixos /users e /tasks
    users-routes.ts       # Rotas de usuários
    tasks.routes.ts       # Rotas de tarefas
  controllers/            # Camada HTTP (controllers e schemas Zod)
  use-cases/              # Regras de negócio por domínio
  entities/               # Entidades de domínio
  database/
    prisma/               # Client Prisma e repositórios Prisma
    repositories/         # Interfaces de repositório
  env/                    # Validação de variáveis de ambiente (Zod)
  app-error.ts            # Erro de domínio
  error-hanlder.ts        # Tratamento centralizado de erros

prisma/
  schema.prisma           # Modelos User e Task
  migrations/             # Migrações geradas

docker-compose.yml        # PostgreSQL local (opcional)
```

### Pré‑requisitos
- Node.js 18+ (recomendado 20+)
- npm 9+ ou pnpm/yarn
- PostgreSQL local/contêiner (há `docker-compose.yml`)

### Configuração do ambiente (.env)
Crie um arquivo `.env` na raiz com as variáveis abaixo. A aplicação valida tudo com Zod em `src/env`.

```
NODE_ENV=development
PORT=3333
# Formato: postgres://USUARIO:SENHA@HOST:PORTA/NOME_DB?schema=public
DATABASE_URL=postgres://postgres:root@localhost:5432/mydb?schema=public
```

Se usar o `docker-compose.yml` fornecido, as credenciais padrão são:
- usuário: `postgres`
- senha: `root`
- banco: `mydb`
- porta: `5432`

### Banco de dados (PostgreSQL + Prisma)
1) Subir o banco via Docker (opcional):
```bash
docker compose up -d
```
2) Instalar dependências e gerar o client Prisma:
```bash
npm install
npx prisma generate
```
3) Aplicar migrações:
```bash
npx prisma migrate deploy   # para ambientes já com migrações
# ou
npx prisma migrate dev      # em desenvolvimento, cria/aplica migrações
```

Modelos (resumo):
- `User { id uuid, name string, email string único, createdAt datetime }`
- `Task { id uuid, userId uuid, title string, description string, status enum('pending'|'done'), createdAt datetime }`

### Como rodar o projeto
```bash
# 1) .env configurado e DB acessível
# 2) Dependências instaladas e prisma generate/migrate executados
npm run dev
# Servidor iniciará em http://localhost:3333
```

### Documentação da API
- OpenAPI é exposto e servido pelo Scalar em: `http://localhost:3333/docs`
- Todas as rotas possuem schemas Zod, gerando documentação e validação automática.

---

### Endpoints

Observações gerais:
- Todas as respostas/entradas seguem os schemas Zod definidos nos controllers.
- Paginação padrão: `page=1` e `limit=20` quando aplicável.

#### Usuários

- POST `/users` – Criar usuário
  - Body:
    ```json
    { "name": "John Doe", "email": "johndoe@example.com" }
    ```
  - 201:
    ```json
    { "userId": "uuid" }
    ```
  - 409 (e-mail já existente): `{ "message": string }`

- GET `/users` – Listar/Buscar usuários
  - Query: `search?: string`, `page?: number`, `limit?: number`
  - 200:
    ```json
    {
      "total": 1,
      "totalPages": 1,
      "page": 1,
      "limit": 20,
      "hasNextPage": false,
      "hasPreviousPage": false,
      "data": [
        { "id": "uuid", "name": "John Doe", "email": "johndoe@example.com", "createdAt": "ISO" }
      ]
    }
    ```

- GET `/users/:userId` – Detalhar usuário
  - Params: `userId: uuid`
  - 200: usuário completo
  - 404: `{ "message": string }`

- PUT `/users/:userId` – Atualizar usuário
  - Params: `userId: uuid`
  - Body: `{ name: string, email: string }`
  - 200: `{ "userId": "uuid" }`
  - 404: `{ "message": string }`

- DELETE `/users/:userId` – Remover usuário
  - Params: `userId: uuid`
  - 204: sem corpo
  - 404: `{ "message": string }`

#### Tarefas

- POST `/tasks` – Criar tarefa
  - Body:
    ```json
    {
      "title": "Configurar ambiente",
      "description": "Instalar dependências e configurar .env",
      "status": "pending",
      "userId": "uuid"
    }
    ```
  - 201: `{ "taskId": "uuid" }`
  - 404 (user inexistente): `{ "message": string }`

- GET `/tasks` – Listar/Buscar tarefas
  - Query: `search?: string`, `page?: number`, `limit?: number`
  - 200: mesma estrutura de paginação de `/users`, com itens contendo `id`, `title`, `description`, `status`, `userId`, `createdAt`.

- GET `/tasks/:taskId` – Detalhar tarefa
  - Params: `taskId: uuid`
  - 200: tarefa completa
  - 404: `{ "message": string }`

- PUT `/tasks/:taskId` – Atualizar tarefa
  - Params: `taskId: uuid`
  - Body:
    ```json
    {
      "title": "Atualizar documentação",
      "description": "Revisar endpoints no README",
      "status": "done",
      "userId": "uuid"
    }
    ```
  - 200: `{ "taskId": "uuid" }`
  - 404: `{ "message": string }`

- DELETE `/tasks/:taskId` – Remover tarefa
  - Params: `taskId: uuid`
  - 204: sem corpo
  - 404: `{ "message": string }`

---

### Erros e validação
- Entradas (body, params, query) e saídas são validadas por Zod.
- Erros comuns:
  - 400: schema inválido (request/response)
  - 404: recurso não encontrado
  - 409: conflito (e.g., e-mail já cadastrado)
  - 500: erro interno

### Qualidade de código
- Configurado `@biomejs/biome` para lint/format (ver `biome.json`).
- Tipagem estrita no `tsconfig.json` (`strict: true`).

### Testes end-to-end (guia)
Este projeto ainda não possui testes, mas segue um guia para configurar E2E com Vitest + Supertest.

1) Instalar dev-deps:
```bash
npm i -D vitest supertest @types/supertest tsx
```

2) Sugestão de script em `package.json`:
```json
{
  "scripts": {
    "test:e2e": "vitest run --passWithNoTests"
  }
}
```

3) Exemplo mínimo de teste `tests/e2e/users.spec.ts`:
```ts
import request from 'supertest'
import { app } from '../../src/app'

describe('Users (e2e)', () => {
  it('should create a user', async () => {
    const res = await request(app.server)
      .post('/users')
      .send({ name: 'John Doe', email: `john+${Date.now()}@example.com` })
      .expect(201)

    expect(res.body).toHaveProperty('userId')
  })
})
```

4) Dicas:
- Use um banco dedicado para testes (e.g., `DATABASE_URL` apontando para outro schema).
- Rodar migrações antes dos testes: `npx prisma migrate deploy`.
- Para isolar testes, limpe as tabelas entre cenários ou recrie o schema.

### Comandos úteis
```bash
# Subir Postgres local
docker compose up -d

# Gerar client Prisma
npx prisma generate

# Criar/aplicar migrações (dev)
npx prisma migrate dev --name <nome>

# Aplicar migrações (CI/Prod)
npx prisma migrate deploy

# Rodar em desenvolvimento
npm run dev
```

---

### Licença
Uso acadêmico/técnico para fins de avaliação.



