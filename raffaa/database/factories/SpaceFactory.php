<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SpaceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company . ' Space',
            'surface' => $this->faker->numberBetween(20, 200),
            'capacity' => $this->faker->numberBetween(2, 50),
            'type' => 'bureau_prive',
            'price_per_day' => $this->faker->numberBetween(5000, 50000),
            'is_active' => true,
        ];
    }
}
