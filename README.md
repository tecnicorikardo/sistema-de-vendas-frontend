# README - Sistema de Vendas

Um sistema completo de vendas desenvolvido em Python (Flask) e React, ideal para pequenos e médios comércios.

## 🚀 Características Principais

- **Interface Moderna**: Design responsivo e intuitivo
- **Módulo Administrativo**: Gestão completa de usuários, produtos e categorias
- **PDV (Ponto de Venda)**: Interface otimizada para vendas rápidas
- **Controle de Estoque**: Atualização automática e alertas de estoque baixo
- **Relatórios**: Dashboard com métricas de vendas e produtos mais vendidos
- **Segurança**: Autenticação JWT e controle de acesso por perfil

## 🛠️ Tecnologias Utilizadas

### Backend
- Python 3.11
- Flask 3.1.0
- SQLAlchemy (ORM)
- Flask-JWT-Extended (Autenticação)
- Flask-CORS
- SQLite (desenvolvimento) / PostgreSQL (produção)

### Frontend
- React 19.1.0
- Tailwind CSS
- shadcn/ui (Componentes)
- Lucide React (Ícones)
- Axios (HTTP Client)
- React Router (Navegação)

## 📋 Pré-requisitos

- Python 3.11+
- Node.js 18+
- npm ou pnpm

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd sistema_vendas
```

### 2. Configuração do Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

pip install -r requirements.txt
python src/main.py
```

O backend estará disponível em `http://localhost:5001`

### 3. Configuração do Frontend
```bash
cd frontend
pnpm install  # ou npm install
pnpm run dev  # ou npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 👤 Acesso Inicial

**Usuário padrão:**
- Username: `admin`
- Senha: `admin123`

## 📱 Funcionalidades

### Módulo Administrativo
- **Dashboard**: Métricas de vendas e produtos mais vendidos
- **Usuários**: Criar, editar e remover usuários (admin/funcionário)
- **Categorias**: Organizar produtos por categorias
- **Produtos**: Cadastro completo com controle de estoque
- **Relatórios**: Histórico de vendas com filtros

### Módulo PDV
- **Busca de Produtos**: Localização rápida por nome
- **Carrinho**: Adicionar/remover produtos e ajustar quantidades
- **Validação de Estoque**: Verificação automática de disponibilidade
- **Finalização**: Registro de venda com atualização de estoque

## 🏗️ Estrutura do Projeto

```
sistema_vendas/
├── backend/
│   ├── src/
│   │   ├── models/          # Modelos do banco de dados
│   │   ├── routes/          # Rotas da API
│   │   └── main.py          # Arquivo principal
│   ├── requirements.txt
│   └── venv/
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── contexts/        # Contextos React
│   │   └── lib/             # Utilitários e API
│   ├── package.json
│   └── node_modules/
├── DOCUMENTACAO_TECNICA.md
├── GUIA_IMPLANTACAO_NUVEM.md
└── README.md
```

## 🌐 Implantação em Produção

Consulte o arquivo `GUIA_IMPLANTACAO_NUVEM.md` para instruções detalhadas de implantação em:
- Heroku (mais simples)
- DigitalOcean App Platform
- AWS (mais flexível)

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login do usuário
- `GET /api/auth/me` - Dados do usuário logado

### Usuários
- `GET /api/users` - Listar usuários
- `POST /api/users` - Criar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Remover usuário

### Produtos
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Remover produto

### Vendas
- `GET /api/sales` - Listar vendas
- `POST /api/sales` - Registrar venda
- `GET /api/sales/reports/summary` - Resumo de vendas

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT com expiração
- Validação de dados no backend
- Controle de acesso por perfil de usuário
- Proteção CORS configurada

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, consulte a documentação técnica completa em `DOCUMENTACAO_TECNICA.md` ou entre em contato através dos issues do GitHub.

---

**Desenvolvido com ❤️ para modernizar o seu negócio**

