# Stage 1: Build da aplicação React/Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm ci

# Copia o código e faz a build de produção
COPY . .
RUN npm run build

# Stage 2: Servidor Web Nginx para arquivos estáticos
FROM nginx:alpine

# Remove configurações padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos gerados no Stage 1 para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia uma configuração customizada do Nginx para suportar React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
