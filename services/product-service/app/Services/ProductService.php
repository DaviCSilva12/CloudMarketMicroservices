<?php

namespace App\Services;

use App\Repositories\Interfaces\ProductRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use InvalidArgumentException;

class ProductService
{
    public function __construct(
        protected ProductRepositoryInterface $productRepository
    ) {}

    public function getAllProducts(int $perPage = 15): LengthAwarePaginator
    {
        return $this->productRepository->getAllPaginated($perPage);
    }

    public function getProductById(int $id)
    {
        return $this->productRepository->findById($id);
    }

    public function createProduct(array $data)
    {
        $this->validateBusinessRules($data);
        return $this->productRepository->create($data);
    }

    public function updateProduct(int $id, array $data): bool
    {
        $this->validateBusinessRules($data);
        return $this->productRepository->update($id, $data);
    }

    public function deleteProduct(int $id): bool
    {
        return $this->productRepository->delete($id);
    }

    protected function validateBusinessRules(array $data): void
    {
        if (isset($data['price']) && $data['price'] < 0) {
            throw new InvalidArgumentException("O preço do produto não pode ser negativo.");
        }

        if (isset($data['stock']) && $data['stock'] < 0) {
            throw new InvalidArgumentException("O estoque do produto não pode ser negativo.");
        }
    }
}
