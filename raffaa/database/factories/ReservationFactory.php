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
            'user_id' => 1, // pour test jai preciser ici
            'space_id' => 1,
            'start_date' => now(),
            'end_date' => now()->addDays(2),
            'total_price' => 300,
            'status' => 'en_attente',
            'is_paid' => false,
        ];
    }
}
