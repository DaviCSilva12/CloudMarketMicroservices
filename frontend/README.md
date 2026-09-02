# CloudMarket - Frontend

Este é o módulo de front-end do projeto **CloudMarket**, desenvolvido com React, Vite e Tailwind CSS.

## 🛠️ Tecnologias Utilizadas
- **React 19**
- **Vite** para build e servidor de desenvolvimento super rápido.
- **Tailwind CSS v4** para estilização utilitária e design responsivo.
- **Lucide React** para os ícones.
- **Axios** para requisições HTTP ao API Gateway.

## 📂 Arquitetura e Componentização

A interface do usuário foi construída seguindo as melhores práticas de modularidade, baseada num mockup de e-commerce moderno. A estrutura de componentes encontra-se em `src/components/`:

- `Header.jsx`: Cabeçalho principal com busca, navegação e botão para alternar entre **Modo Claro / Modo Escuro**.
- `HeroSection.jsx`: Destaque inicial da página contendo banners promocionais e menu lateral.
- `DealsSection.jsx`: Seção dedicada a ofertas por tempo limitado.
- `CategoryBlock.jsx`: Componente reutilizável para listagem de produtos agrupados por categoria.

O arquivo `App.jsx` funciona como o orquestrador (container component), responsável por fazer o fetching dos dados na API e distribuir (via props) para os componentes visuais.

## 🌗 Tema Escuro (Dark Mode)

A aplicação possui suporte nativo ao Modo Escuro. O estado do tema é gerenciado no `Header` e aciona a classe `.dark` global do Tailwind CSS, alterando o visual de toda a plataforma sem recarregar a página.

## 🚀 Como Executar Localmente

1. Entre na pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

Acesse o endereço fornecido no terminal (geralmente `http://localhost:5173`) para visualizar o frontend. Certifique-se de que o **API Gateway** e os microsserviços estejam rodando em background para consumo real de dados.
