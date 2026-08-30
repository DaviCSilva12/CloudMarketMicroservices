<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class OrderApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_order_when_product_service_is_ok(): void
    {
        // Simula (mock) a resposta HTTP do Product Service
        Http::fake([
            '*/products/1' => Http::response(['id' => 1, 'name' => 'Mouse', 'price' => 50.00, 'stock' => 10], 200),
            '*/products/2' => Http::response(['id' => 2, 'name' => 'Teclado', 'price' => 150.00, 'stock' => 5], 200),
        ]);

        $payload = [
            'user_id' => 10,
            'items' => [
                ['product_id' => 1, 'quantity' => 2],
                ['product_id' => 2, 'quantity' => 1],
            ]
        ];

        $response = $this->postJson('/api/orders', $payload);

        $response->assertStatus(201)
                 ->assertJsonFragment(['total' => '250.00', 'status' => 'pending']);
                 
        $this->assertDatabaseHas('orders', ['user_id' => 10, 'total' => 250.00]);
        $this->assertDatabaseHas('order_items', ['product_id' => 1, 'quantity' => 2, 'unit_price' => 50.00]);
    }

    public function test_cannot_create_order_if_product_not_found(): void
    {
        Http::fake([
            '*/products/99' => Http::response(null, 404),
        ]);

        $payload = [
            'user_id' => 10,
            'items' => [['product_id' => 99, 'quantity' => 1]]
        ];

        $response = $this->postJson('/api/orders', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['items']);
    }

    public function test_returns_503_if_product_service_is_down(): void
    {
        Http::fake([
            '*/products/1' => Http::response(null, 500),
        ]);

        $payload = [
            'user_id' => 10,
            'items' => [['product_id' => 1, 'quantity' => 1]]
        ];

        $response = $this->postJson('/api/orders', $payload);

        $response->assertStatus(503)
                 ->assertJsonFragment(['error' => 'Product Service is currently unavailable. Please try again later.']);
    }
}
