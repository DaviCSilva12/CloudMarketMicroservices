<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['name' => 'Soft chairs', 'description' => 'Comfortable soft chairs', 'price' => 19.00, 'stock' => 50, 'image' => 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=150&auto=format&fit=crop'],
            ['name' => 'Sofa & chair', 'description' => 'Sofa and chair set', 'price' => 19.00, 'stock' => 30, 'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=150&auto=format&fit=crop'],
            ['name' => 'Kitchen mixer', 'description' => 'High power kitchen mixer', 'price' => 100.00, 'stock' => 20, 'image' => 'https://images.unsplash.com/photo-1593998066526-65fcab3021a2?q=80&w=150&auto=format&fit=crop'],
            ['name' => 'Smart watches', 'description' => 'Latest smart watches', 'price' => 19.00, 'stock' => 100, 'image' => 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=150&auto=format&fit=crop'],
            ['name' => 'Coffee maker', 'description' => 'Automatic coffee maker', 'price' => 10.00, 'stock' => 15, 'image' => 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=150&auto=format&fit=crop'],
            ['name' => 'Home appliance', 'description' => 'Various home appliances', 'price' => 90.00, 'stock' => 45, 'image' => 'https://images.unsplash.com/photo-1585223199586-a3bd8d23469b?q=80&w=150&auto=format&fit=crop'],
            ['name' => 'Plant pot', 'description' => 'Decorative plant pot', 'price' => 19.00, 'stock' => 80, 'image' => 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=150&auto=format&fit=crop'],
            ['name' => 'Sofa & chair', 'description' => 'Sofa and chair (alternate)', 'price' => 19.00, 'stock' => 25, 'image' => 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=150&auto=format&fit=crop'],
            // Adicionando novos itens para compra como solicitado
            ['name' => 'Dining Table', 'description' => 'Elegant dining table', 'price' => 150.00, 'stock' => 10, 'image' => 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=150&auto=format&fit=crop'],
            ['name' => 'Modern Lamp', 'description' => 'Modern LED lamp', 'price' => 45.00, 'stock' => 40, 'image' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=150&auto=format&fit=crop'],
            ['name' => 'Wall Clock', 'description' => 'Vintage wall clock', 'price' => 25.00, 'stock' => 60, 'image' => 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=150&auto=format&fit=crop'],
            ['name' => 'Bookshelf', 'description' => 'Wooden bookshelf', 'price' => 85.00, 'stock' => 15, 'image' => 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=150&auto=format&fit=crop']
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
