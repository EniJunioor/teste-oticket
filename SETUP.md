# 🚀 Instruções para Rodar em Outra Máquina

## ✅ Pré-requisitos
- Docker e Docker Compose instalados
- Git instalado

## 🐳 Opção 1: Com Docker (Recomendado)

### 1. Clonar o projeto
```bash
git clone <URL_DO_REPOSITORIO>
cd teste-ticket
```

### 2. Configurar variáveis de ambiente

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env` se necessário (geralmente funciona com as configurações padrão).

#### Frontend (.env)
```bash
cd frontend
```

Crie um arquivo `.env` com:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Subir os serviços
```bash
# Voltar para a raiz do projeto
cd ..

# Subir todos os serviços
docker compose up --build -d

# Verificar se está funcionando
docker compose ps
```

### 4. Acessar a aplicação
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001
- **Swagger:** http://localhost:3001/api-docs

## 💻 Opção 2: Desenvolvimento Local

### Pré-requisitos adicionais
- Node.js 18+
- PostgreSQL instalado localmente

### Backend
```bash
cd backend
cp .env.example .env
# Editar .env com configurações do seu PostgreSQL local
npm install
npm run prisma:migrate
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Solução de Problemas

### Se o frontend não conseguir conectar com o backend:
1. Verifique se o backend está rodando na porta 3001
2. Verifique a configuração `NEXT_PUBLIC_API_URL` no frontend
3. Para Docker: use `http://localhost:3001`
4. Para desenvolvimento local: use `http://localhost:3001`

### Se houver problemas com o banco:
1. Verifique se o PostgreSQL está rodando
2. Verifique as credenciais no arquivo `.env`
3. Execute as migrações: `npm run prisma:migrate`

## 📝 Comandos Úteis

```bash
# Ver logs dos containers
docker compose logs backend
docker compose logs frontend

# Parar os serviços
docker compose down

# Rebuild completo
docker compose down
docker compose up --build -d

# Executar testes
cd backend && npm test
```
