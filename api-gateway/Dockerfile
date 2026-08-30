# Usando uma imagem leve e segura baseada em Alpine
FROM node:20-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar o restante do código da aplicação
COPY . .

# Alterar a propriedade dos arquivos para o usuário não root nativo do Node.js
RUN chown -R node:node /app

# Mudar para o usuário não-root (Hardening de Segurança)
USER node

# Expor a porta que o Gateway utilizará
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
