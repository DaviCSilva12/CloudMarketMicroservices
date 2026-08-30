const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Configurações Globais
app.use(cors()); // Habilita requisições cross-origin (React no futuro)
app.use(morgan('combined')); // Logs detalhados de todas as requisições

// Variáveis de Ambiente para os Microsserviços
// Quando rodando via Docker Compose, os nomes dos hosts serão os nomes dos containers
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:8001';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:8002';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:8003';

/**
 * Função utilitária para criar o proxy com tratamento de erros.
 * Garante que se o serviço de destino estiver fora do ar, o Gateway não quebra
 * e retorna um belo 502 Bad Gateway para o cliente.
 */
const createProxy = (target) => {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        onError: (err, req, res) => {
            console.error(`[Gateway Error] Falha ao conectar no microsserviço ${target}:`, err.message);
            res.status(502).json({
                error: 'Bad Gateway',
                message: 'O microsserviço requisitado está temporariamente indisponível.',
            });
        }
    });
};

// Roteamento
app.use('/api/products', createProxy(PRODUCT_SERVICE_URL));
app.use('/api/users', createProxy(USER_SERVICE_URL));
app.use('/api/orders', createProxy(ORDER_SERVICE_URL));

// Endpoint de Healthcheck (Útil para o Kubernetes testar se o Gateway está vivo)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API Gateway Operacional' });
});

// Tratamento de rota não encontrada (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', message: 'Rota não encontrada no Gateway.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway rodando na porta ${PORT}`);
    console.log(`-> Roteando /api/products para ${PRODUCT_SERVICE_URL}`);
    console.log(`-> Roteando /api/users para ${USER_SERVICE_URL}`);
    console.log(`-> Roteando /api/orders para ${ORDER_SERVICE_URL}`);
});
