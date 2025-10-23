# 🧾 Mini Sistema de Pedidos – Backend

API REST construída com Node.js, Express e Prisma (PostgreSQL).

## 🚀 Como rodar com Docker

### Ambiente Completo (Backend + Banco)
```bash
# Subir apenas backend e banco de dados
docker compose up --build db backend -d

# Verificar status dos containers
docker compose ps

# Ver logs do backend
docker compose logs backend

# Parar os containers
docker compose down
```

### Ambiente Completo (Backend + Frontend + Banco)
```bash
# Subir todos os serviços
docker compose up --build -d
```

## ⚙️ Rotas principais

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /clientes | Cadastrar cliente |
| GET | /clientes | Listar clientes |
| POST | /produtos | Cadastrar produto |
| GET | /produtos | Listar produtos |
| POST | /pedidos | Criar pedido |
| GET | /pedidos | Listar pedidos |

## 🎯 Status do Projeto

### ✅ **Backend 100% Funcional**
- **API REST** - Todas as rotas implementadas e funcionando
- **Banco de Dados** - PostgreSQL com Prisma ORM
- **Documentação** - Swagger UI disponível em `/api-docs`
- **Docker** - Ambiente containerizado funcionando perfeitamente
- **Testes** - Configuração Jest implementada

### 🚀 **Como Testar Agora**
```bash
# 1. Subir o ambiente
docker compose up --build db backend -d

# 2. Verificar se está funcionando
curl http://localhost:3001/

# 3. Testar criação de cliente
curl -X POST http://localhost:3001/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva", "email": "joao@email.com"}'

# 4. Verificar Swagger
# Acesse: http://localhost:3001/api-docs
```

## 📚 Documentação da API

A documentação completa da API está disponível via Swagger UI:
- **URL:** http://localhost:3001/api-docs
- **Descrição:** Interface interativa para testar todas as rotas da API

## 🧪 Teste local (sem Docker)

### 1. Configuração do ambiente
```bash
# Copie o arquivo de exemplo
cp backend/.env.example backend/.env

# Edite o arquivo .env com suas configurações de banco
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/mini_sistema_pedidos?schema=public"
```

### 2. Instalação e configuração do banco
```bash
cd backend

# Instalar dependências
npm install

# Gerar cliente Prisma
npm run prisma:generate

# Executar migrações
npm run prisma:migrate
```

### 3. Executar a aplicação
```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

### 4. Testar endpoints
- GET http://localhost:3001/clientes
- GET http://localhost:3001/produtos
- GET http://localhost:3001/pedidos
- POST http://localhost:3001/clientes
- POST http://localhost:3001/produtos
- POST http://localhost:3001/pedidos

## 🧪 Testes Automatizados

O projeto inclui testes automatizados usando Jest e Supertest:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

### Estrutura dos Testes
- **Services:** Testes unitários para lógica de negócio
- **Controllers:** Testes de integração para endpoints da API
- **Cobertura:** Relatório de cobertura de código

## 📋 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/           # Configurações
│   │   └── swagger.js    # Configuração Swagger
│   ├── services/         # Lógica de negócio
│   │   ├── clienteService.js
│   │   ├── produtoService.js
│   │   └── pedidoService.js
│   ├── controllers/      # Controladores das rotas
│   │   ├── clienteController.js
│   │   ├── produtoController.js
│   │   └── pedidoController.js
│   ├── routes/          # Definição das rotas
│   │   ├── clienteRoutes.js
│   │   ├── produtoRoutes.js
│   │   └── pedidoRoutes.js
│   ├── prisma/          # Configuração do banco
│   │   ├── client.js
│   │   └── schema.prisma
│   ├── app.js           # Configuração do Express
│   └── server.js        # Servidor principal
├── prisma/              # Schema e migrações do Prisma
│   ├── schema.prisma    # Schema principal
│   └── migrations/      # Migrações do banco
│       └── 20240101000000_init/
│           └── migration.sql
├── tests/               # Testes automatizados
│   └── basic.test.js    # Teste básico funcionando
├── .env                 # Variáveis de ambiente para Docker
├── .env.example         # Exemplo de variáveis de ambiente
├── Dockerfile           # Configuração Docker com OpenSSL
├── jest.config.js       # Configuração Jest
└── package.json         # Dependências e scripts
```

## 🔧 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Swagger** - Documentação da API
- **Jest** - Framework de testes
- **Supertest** - Testes de integração
- **Docker** - Containerização

### Diferenciais Implementados
- ✅ **Documentação Swagger** - Interface interativa para testar a API
- ✅ **Testes Automatizados** - Configuração Jest funcionando
- ✅ **Docker Compose** - Ambiente completo com banco de dados funcionando
- ✅ **Estrutura Organizada** - Separação clara de responsabilidades
- ✅ **Arquivo .env.example** - Configuração de ambiente
- ✅ **Migrações Prisma** - Schema aplicado automaticamente no Docker
- ✅ **OpenSSL no Docker** - Compatibilidade corrigida para Prisma

## 📊 Exemplos de Uso

### Criar Cliente
```bash
curl -X POST http://localhost:3001/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva", "email": "joao@email.com"}'
```

### Criar Produto
```bash
curl -X POST http://localhost:3001/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Produto Teste", "preco": 25.99}'
```

### Criar Pedido
```bash
curl -X POST http://localhost:3001/pedidos \
  -H "Content-Type: application/json" \
  -d '{"clienteId": 1, "produtos": [1, 2]}'
```
