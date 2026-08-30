<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Exceptions\ProductServiceUnavailableException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;

class ProductServiceClient
{
    protected string $baseUrl;

    public function __construct()
    {
        // Em produção, isso viria de configuração (ex: http://product-service:8000/api)
        $this->baseUrl = env('PRODUCT_SERVICE_URL', 'http://product-service:8000/api');
    }

    /**
     * @throws ProductServiceUnavailableException
     * @return array|null Retorna os dados do produto ou nulo se não encontrado
     */
    public function getProduct(int $productId): ?array
    {
        try {
            $response = Http::timeout(3)
                            ->retry(2, 100, throw: false)
                            ->get("{$this->baseUrl}/products/{$productId}");

            if ($response->status() === 404) {
                return null;
            }

            $response->throw();

            return $response->json();
        } catch (ConnectionException | RequestException $e) {
            throw new ProductServiceUnavailableException();
        }
    }
}
