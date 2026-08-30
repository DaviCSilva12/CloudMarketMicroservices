<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService)
    {}

    public function store(StoreOrderRequest $request): JsonResponse
    {
        try {
            $order = $this->orderService->createOrder($request->validated());
            return response()->json($order, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\App\Exceptions\ProductServiceUnavailableException $e) {
            return response()->json(['error' => 'Product Service is currently unavailable. Please try again later.'], 503);
        }
    }

    public function show(int $id): JsonResponse
    {
        $order = $this->orderService->getOrderById($id);
        
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    public function userOrders(int $userId): JsonResponse
    {
        $orders = $this->orderService->getOrdersByUserId($userId);
        return response()->json($orders);
    }
}
