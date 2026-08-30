<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase; // Reseta o banco de dados (em memória) a cada teste

    public function test_can_list_paginated_products(): void
    {
        Product::factory()->count(20)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
                 ->assertJsonCount(15, 'data') // Paginação padrão é 15
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['id', 'name', 'price', 'stock']
                     ],
                     'current_page',
                     'last_page',
                     'total'
                 ]);
    }

    public function test_can_create_a_product(): void
    {
        $payload = [
            'name' => 'Teclado Mecânico',
            'description' => 'Switch red',
            'price' => 349.90,
            'stock' => 15
        ];

        $response = $this->postJson('/api/products', $payload);

        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'Teclado Mecânico']);

        $this->assertDatabaseHas('products', ['name' => 'Teclado Mecânico']);
    }

    public function test_cannot_create_product_with_negative_price(): void
    {
        $payload = [
            'name' => 'Produto Inválido',
            'price' => -10.00,
            'stock' => 5
        ];

        $response = $this->postJson('/api/products', $payload);

        // Deve retornar 422 Unprocessable Entity (Falha de Validação do FormRequest)
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['price']);
    }

    public function test_cannot_create_product_with_negative_stock(): void
    {
        $payload = [
            'name' => 'Produto Sem Estoque',
            'price' => 100.00,
            'stock' => -5
        ];

        $response = $this->postJson('/api/products', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['stock']);
    }

    public function test_can_show_a_product(): void
    {
        $product = Product::factory()->create();

        $response = $this->getJson('/api/products/' . $product->id);

        $response->assertStatus(200)
                 ->assertJsonFragment(['id' => $product->id, 'name' => $product->name]);
    }

    public function test_returns_404_when_showing_non_existent_product(): void
    {
        $response = $this->getJson('/api/products/9999');

        $response->assertStatus(404);
    }

    public function test_can_update_a_product(): void
    {
        $product = Product::factory()->create(['stock' => 10]);

        $payload = [
            'stock' => 25 // Atualizando apenas o estoque
        ];

        $response = $this->putJson('/api/products/' . $product->id, $payload);

        $response->assertStatus(200);
        $this->assertDatabaseHas('products', ['id' => $product->id, 'stock' => 25]);
    }

    public function test_can_delete_a_product(): void
    {
        $product = Product::factory()->create();

        $response = $this->deleteJson('/api/products/' . $product->id);

        $response->assertStatus(204); // No Content
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }
}
