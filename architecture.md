# CloudMarket - Documento de Arquitetura (Architecture Decision Record - ADR)

Este documento define a arquitetura oficial do CloudMarket, incluindo o modelo de domínio, estrutura de microsserviços e decisões técnicas.

## 1. Domain-Driven Design (DDD) e Bounded Contexts

Após a análise do domínio de e-commerce, o sistema foi dividido em três **Bounded Contexts** principais. Esta separação garante baixo acoplamento e alta coesão, permitindo que cada serviço evolua de forma independente.

### 1.1 Contexto de Catálogo e Estoque (Product Service)
* **Responsabilidade:** Gerenciar o catálogo de produtos e os níveis de inventário.
* **Modelo de Domínio:** `Product` (id, name, description, price, stock).
* **Stack:** PHP 8.2, Laravel, MySQL (`product_db`).
* **Regras de Negócio Chave:** O preço não pode ser negativo. O estoque não pode ficar abaixo de zero. É o único sistema com autoridade para alterar a quantidade de itens em estoque.

### 1.2 Contexto de Identidade e Contas (User Service)
* **Responsabilidade:** Gerenciar perfis de clientes e autenticação.
* **Modelo de Domínio:** `User` (id, name, email, password_hash).
* **Stack:** PHP 8.2, Laravel, MySQL (`user_db`).
* **Regras de Negócio Chave:** E-mail deve ser único. Senhas devem ser armazenadas com hash seguro (bcrypt/argon2). Nenhuma senha real trafega em respostas de API.

### 1.3 Contexto de Vendas (Order Service)
* **Responsabilidade:** Consolidar a intenção de compra, conectando Usuários e Produtos num registro financeiro (Pedido).
* **Modelo de Domínio:** `Order` (id, user_id, status, total) e `OrderItem` (order_id, product_id, quantity, unit_price).
* **Stack:** PHP 8.2, Laravel, MySQL (`order_db`).
* **Regras de Negócio Chave:** Para um pedido ser criado, o serviço deve validar ativamente o preço atualizado do produto e confirmar a disponibilidade de estoque junto ao Product Service.

## 2. Padrões de Arquitetura

### 2.1 API Gateway Pattern (Node.js/Express)
Um único ponto de entrada para clientes web/mobile. 
* **Por quê Node.js?** A arquitetura orientada a eventos e I/O não-bloqueante do Node.js/Express é ideal para receber conexões simultâneas e roteá-las rapidamente para os serviços de backend (Laravel) sem alocar excesso de memória.
* **Responsabilidades:** Roteamento de requests, SSL termination (no GKE), CORS centralizado, Rate Limiting e logging de acesso.

### 2.2 Database-per-Service
Cada microsserviço Laravel tem sua própria instância (ou base de dados lógica) MySQL.
* **Benefícios:** Autonomia de escala, isolamento de falhas (se o banco de produtos cair, os usuários ainda conseguem logar) e independência tecnológica.
* **Desafio:** Consultas que cruzam fronteiras (ex: listar "Usuários que compraram Produto X") não podem usar `JOIN` no banco. Resolvido via composição no nível da API (API Composition) ou CQRS/Events no futuro.

### 2.3 Comunicação Síncrona (REST)
Atualmente, o `Order Service` faz chamadas HTTP GET diretas ao `Product Service` para validação.
* **Trade-off Assumido:** A comunicação REST síncrona é mais rápida de implementar e fácil de depurar (ideal para a Fase 1). Contudo, isso cria um **acoplamento temporal** — se o Product Service ficar fora do ar, o fluxo de pedidos quebra. O timeout e tratamento de erros devem ser rigorosos (ex: Circuit Breaker) para não degradar todo o cluster.

## 3. Diagrama de Rede (Macro)

```mermaid
flowchart TD
    Client([React Frontend]) -->|HTTPS| Gateway[API Gateway (Node.js)]
    
    Gateway -->|/api/products| ProductSvc[Product Service (Laravel)]
    Gateway -->|/api/users| UserSvc[User Service (Laravel)]
    Gateway -->|/api/orders| OrderSvc[Order Service (Laravel)]
    
    OrderSvc -.->|HTTP GET /products/:id| ProductSvc
    
    ProductSvc --> ProductDB[(MySQL: Product)]
    UserSvc --> UserDB[(MySQL: User)]
    OrderSvc --> OrderDB[(MySQL: Order)]
```

## 4. Orquestração e Cloud (Kubernetes & GKE)
* **Containers:** Cada serviço (inclusive front e gateway) empacotado em imagens imutáveis baseadas em Alpine ou imagens oficiais enxutas.
* **K8s Primitives:** O tráfego externo bate em um `LoadBalancer` (Service) para o Gateway. Os microsserviços usam Services `ClusterIP` (rede interna). Variaveis de ambiente sensíveis (DB_PASSWORD) ficam em `Secrets`, e flags normais (APP_ENV) em `ConfigMaps`.
* **Segurança:** Configuração para não rodar como root, minimização de packages de OS e Healthchecks (Liveness/Readiness probes) definidos por padrão.

---
*Este documento atua como fonte da verdade. Qualquer mudança estrutural deve ser refletida aqui.*
