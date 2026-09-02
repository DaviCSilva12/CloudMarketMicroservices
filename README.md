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
6. **React:** Frontend modularizado (componentes reutilizáveis), estilizado com Tailwind CSS v4, suporte a Dark Mode e consumindo o Gateway.
7. **Docker Compose:** Ambiente local integrado.
8. **Kubernetes:** Manifests completos.
9. **Google Cloud:** Deploy real no GKE.
10. **Melhorias:** Logs, monitoring, autoscaling.

## ☁️ Fase 9: Deploy no Google Cloud (GKE)

O projeto foi desenhado para ser Cloud-Native. Para subir esta estrutura no Google Cloud Platform, siga os passos abaixo:

1. **Configurar Projeto e Autenticação:**
   ```bash
   gcloud auth login
   gcloud config set project SEU_ID_DO_PROJETO
   ```

2. **Criar o Cluster Kubernetes (GKE):**
   ```bash
   gcloud container clusters create cloudmarket-cluster \
       --num-nodes=3 --zone=us-central1-a
   gcloud container clusters get-credentials cloudmarket-cluster
   ```

3. **Fazer o Build e Push das Imagens (Artifact Registry):**
   ```bash
   docker build -t gcr.io/SEU_ID_DO_PROJETO/cloudmarket-product ./services/product-service
   docker push gcr.io/SEU_ID_DO_PROJETO/cloudmarket-product
   # (Repita para user-service, order-service, api-gateway e frontend)
   ```

4. **Aplicar os Manifestos no Cluster:**
   ```bash
   kubectl apply -f k8s/deployments.yaml
   kubectl apply -f k8s/services.yaml
   ```

5. **Acessar a Aplicação:**
   O K8s vai provisionar um Load Balancer para o Frontend. Descubra o IP externo com:
   ```bash
   kubectl get services
   ```
   Acesse o IP público fornecido no navegador!

---

## 📈 Fase 10: Melhorias, Escalabilidade e Testes

### 1. Testes de Carga (k6)
Na pasta `/load-tests` está o script para testar o limite da arquitetura simulando múltiplos clientes simultâneos.
* **Rodando o Teste:** Instale o k6 (https://k6.io/) e execute:
  ```bash
  k6 run load-tests/script.js
  ```
  *(O teste verifica se 95% das requisições respondem em menos de 500ms e falham em menos de 1%).*

### 2. Auto-scaling (HPA)
No Kubernetes, criamos o manifesto `/k8s/hpa.yaml`. Ele configura o **Horizontal Pod Autoscaler**, garantindo que:
* Se o uso de CPU de qualquer microsserviço ou do Gateway ultrapassar **70%** (ex: durante a Black Friday), o GKE automaticamente criará novas réplicas (pods) até um limite de 10.
* Quando o tráfego diminuir, ele destrói os containers extras economizando recursos.
* **Para ativar:** `kubectl apply -f k8s/hpa.yaml`

### 3. Monitoramento Avançado
Como próximos passos para um ambiente de produção real, é recomendado integrar o **Prometheus + Grafana** para visualizar as métricas dos containers, e utilizar o stack **ELK** (Elasticsearch, Logstash, Kibana) para centralizar os logs gerados pelo `morgan` no Gateway.
