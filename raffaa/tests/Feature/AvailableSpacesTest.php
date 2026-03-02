<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Space;
use App\Models\Reservation;
use App\Models\User;

class AvailableSpacesTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_only_available_spaces()
    {
        $user = User::factory()->create();

        $availableSpace = Space::factory()->create([
            'type' => 'bureau',
            'capacity' => 10,
            'is_active' => true
        ]);

        $unavailableSpace = Space::factory()->create([
            'type' => 'bureau',
            'capacity' => 10,
            'is_active' => true
        ]);

        Reservation::create([
            'user_id' => $user->id,
            'space_id' => $unavailableSpace->id,
            'start_date' => '2026-03-10',
            'end_date' => '2026-03-15',
            'total_price' => 500,
            'status' => 'confirmee',
            'is_paid' => false
        ]);

        $response = $this->getJson('/api/spaces/available?start_date=2026-03-12&end_date=2026-03-14');

        $response->assertStatus(200);

        $response->assertJsonFragment([
            'id' => $availableSpace->id
        ]);

        $response->assertJsonMissing([
            'id' => $unavailableSpace->id
        ]);
    }
}
