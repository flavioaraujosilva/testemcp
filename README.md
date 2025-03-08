# API com Cloudflare Workers e Supabase

Este projeto é uma API REST construída com Cloudflare Workers que se integra com o Supabase para operações de CRUD.

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/flavioaraujosilva/testemcp.git
cd testemcp
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis do Supabase em `src/supabase.ts`:
```typescript
const SUPABASE_URL = 'sua_url_do_supabase';
const SUPABASE_ANON_KEY = 'sua_chave_anonima_do_supabase';
```

4. Crie a tabela `users` no Supabase com os seguintes campos:
- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `created_at` (timestamp with time zone)

## Desenvolvimento

Para rodar o projeto localmente:
```bash
npm run dev
```

## Endpoints da API

### Listar Tabelas
```
GET /api/tables
```

### Usuários

#### Criar usuário
```
POST /api/users
Content-Type: application/json

{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com"
}
```

#### Listar usuários
```
GET /api/users
```

#### Buscar usuário por ID
```
GET /api/users/:id
```

#### Atualizar usuário
```
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Novo Nome",
  "email": "novo@email.com"
}
```

#### Deletar usuário
```
DELETE /api/users/:id
```

## Tecnologias

- Cloudflare Workers
- TypeScript
- Supabase