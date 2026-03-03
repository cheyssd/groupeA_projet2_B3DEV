<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Space>
 */
class SpaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' Coworking',
            'surface' => fake()->randomFloat(2, 20, 200),
            'capacity' => fake()->numberBetween(5, 50),
            'type' => fake()->randomElement(['bureau', 'salle_reunion', 'conference']),
            'price_per_day' => fake()->randomFloat(2, 50, 500),
            'is_active' => true,
        ];
    }
}
