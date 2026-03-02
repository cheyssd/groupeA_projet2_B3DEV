<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReservationServiceTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    use RefreshDatabase;

    public function test_space_is_available_when_no_reservations()
    {
        $space = \App\Models\Space::factory()->create();

        $service = new \App\Services\ReservationService();

        $available = $service->isSpaceAvailable(
            $space->id,
            '2026-03-10',
            '2026-03-12'
        );

        $this->assertTrue($available);
    }

    public function test_space_is_not_available_when_reserved()
    {
        $user = \App\Models\User::factory()->create();
        $space = \App\Models\Space::factory()->create();

        \App\Models\Reservation::create([
            'user_id' => $user->id,
            'space_id' => $space->id,
            'start_date' => '2026-03-10',
            'end_date' => '2026-03-15',
            'total_price' => 500,
            'status' => 'confirmee',
            'is_paid' => false
        ]);

        $service = new \App\Services\ReservationService();

        $available = $service->isSpaceAvailable(
            $space->id,
            '2026-03-12',
            '2026-03-14'
        );

        $this->assertFalse($available);
    }

    public function test_calculate_total_price_correctly()
    {
        $space = \App\Models\Space::factory()->create([
            'price_per_day' => 50
        ]);

        $service = new \App\Services\ReservationService();

        $price = $service->calculateTotalPrice(
            $space->id,
            '2026-03-01',
            '2026-03-05'
        );

        $this->assertEquals(250, $price);
    }

    public function test_create_reservation_throws_exception_when_unavailable()
    {
        $this->expectException(\Exception::class);

        $user = \App\Models\User::factory()->create();
        $space = \App\Models\Space::factory()->create();

        \App\Models\Reservation::create([
            'user_id' => $user->id,
            'space_id' => $space->id,
            'start_date' => '2026-03-10',
            'end_date' => '2026-03-15',
            'total_price' => 500,
            'status' => 'confirmee',
            'is_paid' => false
        ]);

        $service = new \App\Services\ReservationService();

        $service->createReservation(
            $user->id,
            $space->id,
            '2026-03-12',
            '2026-03-14'
        );
    }
}
