<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function __construct(protected ProductService $productService)
    {}

    /**
     * Exibe uma lista do recurso.
     */
    public function index(): JsonResponse
    {
        $products = $this->productService->getAllProducts(15);
        return response()->json($products);
    }

    /**
     * Armazena um recurso recém-criado no banco.
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        try {
            $product = $this->productService->createProduct($request->validated());
            return response()->json($product, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Exibe o recurso especificado.
     */
    public function show(int $id): JsonResponse
    {
        $product = $this->productService->getProductById($id);
        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    /**
     * Atualiza o recurso especificado no banco.
     */
    public function update(UpdateProductRequest $request, int $id): JsonResponse
    {
        try {
            $updated = $this->productService->updateProduct($id, $request->validated());
            
            if (!$updated) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            return response()->json(['message' => 'Product updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove o recurso especificado do banco.
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->productService->deleteProduct($id);
        
        if (!$deleted) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json([], 204);
    }
}
