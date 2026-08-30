import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração do Teste de Carga
export const options = {
  stages: [
    { duration: '30s', target: 50 }, // Sobe o tráfego para 50 usuários virtuais em 30 segundos
    { duration: '1m', target: 50 },  // Mantém 50 usuários por 1 minuto
    { duration: '30s', target: 0 },  // Desce o tráfego até 0 nos 30 segundos finais
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem ser respondidas em menos de 500ms
    http_req_failed: ['rate<0.01'],   // Menos de 1% das requisições podem falhar
  },
};

// URL do API Gateway (Local ou GKE)
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // Testando o endpoint de listagem de produtos (que faz a ponte do Gateway para o Product Service)
  const res = http.get(`${BASE_URL}/api/products`);

  check(res, {
    'status é 200': (r) => r.status === 200,
    'resposta não está vazia': (r) => r.body.length > 0,
  });

  // Simula o tempo de leitura do usuário antes de realizar outra ação
  sleep(1);
}
