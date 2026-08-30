# CloudMarket
 
## Projeto de Microsserviços com Laravel, Node.js, React, Docker, Kubernetes e Google Cloud
 
## 1. Visão Geral
 
O **CloudMarket** é uma mini plataforma de e-commerce construída com arquitetura de
microsserviços. O objetivo é entregar um projeto pequeno, porém tecnicamente completo,
que demonstre na prática:
 
- Construção de APIs REST com Laravel e Node.js;
- Comunicação síncrona entre serviços independentes;
- Containerização de cada componente com Docker;
- Orquestração com Kubernetes;
- Deploy real em nuvem via Google Kubernetes Engine (GKE);
- Boas práticas de portfólio (documentação, testes, CI/CD).
 
## 2. Estrutura do Repositório
 
```text
CloudMarket/
├── frontend/
├── api-gateway/
├── services/
│   ├── product-service/
│   ├── user-service/
│   └── order-service/
├── docker/
├── kubernetes/
│   ├── product/
│   ├── user/
│   ├── order/
│   ├── gateway/
│   └── frontend/
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker-compose.yml
├── README.md
└── .gitignore
```
 
## 3. Stack Tecnológica
 
| Tecnologia | Função no projeto |
|---|---|
| React | Interface web do CloudMarket |
| Node.js (Express) | API Gateway e ponto de entrada da aplicação |
| PHP + Laravel | Implementação dos microsserviços e regras de negócio |
| REST API | Comunicação entre frontend, gateway e serviços |
| MySQL | Persistência dos dados, com banco por serviço |
| Docker | Containerização de cada componente |
| Docker Compose | Execução e integração do ambiente local |
| Kubernetes | Orquestração dos containers |
| Google Kubernetes Engine (GKE) | Execução do Kubernetes na Google Cloud |
| GitHub Actions | Pipeline de CI/CD |
 
## 4. Plano de Implementação por Fases
 
1. **Planejamento:** Repositório criado, arquitetura e endpoints definidos.
2. **Product Service:** Laravel + MySQL + CRUD + Docker.
3. **User Service:** Laravel + MySQL + cadastro/consulta.
4. **Order Service:** Laravel + MySQL + comunicação com Product Service.
5. **API Gateway:** Node.js roteando para os 3 serviços.
6. **React:** Frontend consumindo só o Gateway.
7. **Docker Compose:** Ambiente local integrado.
8. **Kubernetes:** Manifests completos.
9. **Google Cloud:** Deploy real no GKE.
10. **Melhorias:** Logs, monitoring, autoscaling.
