<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderService
{
    public function __construct(
        protected ProductServiceClient $productClient
    ) {}

    public function createOrder(array $data)
    {
        // $data contém user_id e items [{product_id, quantity}]
        $items = $data['items'];
        $validatedItems = [];
        $total = 0;

        foreach ($items as $itemData) {
            $product = $this->productClient->getProduct($itemData['product_id']);

            if (!$product) {
                throw ValidationException::withMessages([
                    'items' => "Produto ID {$itemData['product_id']} não existe."
                ]);
            }

            if ($product['stock'] < $itemData['quantity']) {
                throw ValidationException::withMessages([
                    'items' => "Estoque insuficiente para o produto {$product['name']} (ID: {$product['id']})."
                ]);
            }

            $unitPrice = $product['price'];
            $total += $unitPrice * $itemData['quantity'];

            $validatedItems[] = [
                'product_id' => $product['id'],
                'quantity' => $itemData['quantity'],
                'unit_price' => $unitPrice
            ];
        }

        // Criar o pedido dentro de uma transação para garantir integridade local
        return DB::transaction(function () use ($data, $validatedItems, $total) {
            $order = Order::create([
                'user_id' => $data['user_id'],
                'total' => $total,
                'status' => 'pending'
            ]);

            foreach ($validatedItems as $item) {
                $order->items()->create($item);
            }

            return $order->load('items');
        });
    }

    public function getOrderById(int $id)
    {
        return Order::with('items')->find($id);
    }

    public function getOrdersByUserId(int $userId)
    {
        return Order::with('items')->where('user_id', $userId)->get();
    }
}
