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
            ['name' => 'Soft chairs', 'description' => 'Comfortable soft chairs', 'price' => 19.00, 'stock' => 50],
            ['name' => 'Sofa & chair', 'description' => 'Sofa and chair set', 'price' => 19.00, 'stock' => 30],
            ['name' => 'Kitchen mixer', 'description' => 'High power kitchen mixer', 'price' => 100.00, 'stock' => 20],
            ['name' => 'Smart watches', 'description' => 'Latest smart watches', 'price' => 19.00, 'stock' => 100],
            ['name' => 'Coffee maker', 'description' => 'Automatic coffee maker', 'price' => 10.00, 'stock' => 15],
            ['name' => 'Home appliance', 'description' => 'Various home appliances', 'price' => 90.00, 'stock' => 45],
            ['name' => 'Plant pot', 'description' => 'Decorative plant pot', 'price' => 19.00, 'stock' => 80],
            ['name' => 'Sofa & chair', 'description' => 'Sofa and chair (alternate)', 'price' => 19.00, 'stock' => 25],
            // Adicionando novos itens para compra como solicitado
            ['name' => 'Dining Table', 'description' => 'Elegant dining table', 'price' => 150.00, 'stock' => 10],
            ['name' => 'Modern Lamp', 'description' => 'Modern LED lamp', 'price' => 45.00, 'stock' => 40],
            ['name' => 'Wall Clock', 'description' => 'Vintage wall clock', 'price' => 25.00, 'stock' => 60],
            ['name' => 'Bookshelf', 'description' => 'Wooden bookshelf', 'price' => 85.00, 'stock' => 15]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
