<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Space;
use App\Models\Reservation;

class AdminReservationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_update_reservation_status()
    {
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);

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

        /** @var \App\Models\User $admin */
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);
        $response = $this->actingAs($admin, 'sanctum')
            ->patchJson('/api/reservations/' . $reservation->id . '/status', [
                'status' => 'confirmee'
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('reservations', [
            'id' => $reservation->id,
            'status' => 'confirmee'
        ]);
    }

    public function test_non_admin_cannot_update_status()
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
            ->patchJson('/api/reservations/' . $reservation->id . '/status', [
                'status' => 'confirmee'
            ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_mark_reservation_as_paid()
    {
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);

        $user = User::factory()->create();
        $space = Space::factory()->create();

        $reservation = Reservation::create([
            'user_id' => $user->id,
            'space_id' => $space->id,
            'start_date' => '2026-03-10',
            'end_date' => '2026-03-12',
            'total_price' => 300,
            'status' => 'confirmee',
            'is_paid' => false
        ]);

        /** @var \App\Models\User $admin */
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);
        $response = $this->actingAs($admin, 'sanctum')
            ->patchJson('/api/reservations/' . $reservation->id . '/paid');

        $response->assertStatus(200);

        $this->assertDatabaseHas('reservations', [
            'id' => $reservation->id,
            'is_paid' => true
        ]);
    }
}
