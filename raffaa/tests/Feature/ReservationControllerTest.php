<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Space;
use App\Models\Reservation;

class ReservationControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_reservation()
    {
        $user = User::factory()->create();
        $space = Space::factory()->create();

        /** @var \App\Models\User $user */
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/reservations', [
                'space_id' => $space->id,
                'start_date' => '2026-03-10',
                'end_date' => '2026-03-12'
            ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('reservations', [
            'user_id' => $user->id,
            'space_id' => $space->id
        ]);
    }

    public function test_guest_cannot_create_reservation()
    {
        $space = Space::factory()->create();

        $response = $this->postJson('/api/reservations', [
            'space_id' => $space->id,
            'start_date' => '2026-03-10',
            'end_date' => '2026-03-12'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_cannot_view_other_user_reservation()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $space = Space::factory()->create();

        $reservation = Reservation::create([
            'user_id' => $user1->id,
            'space_id' => $space->id,
            'start_date' => '2026-03-10',
            'end_date' => '2026-03-12',
            'total_price' => 300,
            'status' => 'en_attente',
            'is_paid' => false
        ]);

        /** @var \App\Models\User $user2 */
        $user2 = User::factory()->create();
        $response = $this->actingAs($user2, 'sanctum')
            ->getJson('/api/reservations/' . $reservation->id);

        $response->assertStatus(403);
    }

    public function test_user_can_delete_own_reservation()
    {
        $user = User::factory()->create();
        $space = Space::factory()->create();

        $reservation = Reservation::create([
            'user_id' => $user->id,
            'space_id' => $space->id,
            'start_date' => '2026-03-10',
            'end_date' => '2026-03-12',
            'total_price' => 300,
            'status' => 'en_attente',
            'is_paid' => false
        ]);

        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->deleteJson('/api/reservations/' . $reservation->id);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('reservations', [
            'id' => $reservation->id
        ]);
    }
}
