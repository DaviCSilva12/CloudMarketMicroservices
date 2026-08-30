<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_a_user(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'secret123'
        ];

        $response = $this->postJson('/api/users', $payload);

        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'John Doe', 'email' => 'john@example.com'])
                 ->assertJsonMissing(['password' => 'secret123']) // Garante que a senha não foi exposta!
                 ->assertJsonMissing(['password']); // Garante que o hash da senha não vazou

        $this->assertDatabaseHas('users', ['email' => 'john@example.com']);
        
        // Verifica se a senha foi hasheada no banco
        $user = User::where('email', 'john@example.com')->first();
        $this->assertTrue(password_verify('secret123', $user->password));
    }

    public function test_cannot_create_user_with_existing_email(): void
    {
        User::factory()->create(['email' => 'john@example.com']);

        $payload = [
            'name' => 'John Clone',
            'email' => 'john@example.com',
            'password' => 'secret123'
        ];

        $response = $this->postJson('/api/users', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    public function test_can_show_a_user_without_exposing_password(): void
    {
        $user = User::factory()->create();

        $response = $this->getJson('/api/users/' . $user->id);

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => $user->name, 'email' => $user->email])
                 ->assertJsonMissing(['password' => $user->password]); // NUNCA expor hash da senha
    }
}
