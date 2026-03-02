<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SpaceImage>
 */
class SpaceImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'name' => $this->faker->company . ' Space',
        'surface' => $this->faker->numberBetween(20, 200),
        'capacity' => $this->faker->numberBetween(2, 50),
        'type' => 'bureau',
        'price_per_day' => 100,
        'is_active' => true,
    ];
}
}
