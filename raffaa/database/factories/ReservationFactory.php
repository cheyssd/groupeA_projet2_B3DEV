<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()->id,
            'space_id' => \App\Models\Space::inRandomOrder()->first()->id,
            'status' => fake()->randomElement(['en_attente', 'confirmee', 'annulee']),
            'start_date' => fake()->dateTimeBetween('now', '+1 month'),
            'end_date' => fake()->dateTimeBetween('+1 month', '+2 months'),
            'total_price' => fake()->randomFloat(2, 100, 1000),
            'is_paid' => fake()->boolean(),
        ];
    }
}
