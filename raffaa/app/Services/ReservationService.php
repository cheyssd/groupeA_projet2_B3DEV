<?php

namespace App\Services;
use App\Models\Reservation;
use App\Models\Space;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReservationService
{
    /**
     * Create a new class instance.
     */
    public function isSpaceAvailable($spaceId, $startDate, $endDate)
    {
        $conflict = Reservation::where('space_id', $spaceId)
            ->whereIn('status', ['confirmee', 'en_attente'])
            ->where(function ($query) use ($startDate, $endDate) {
                $query->where('start_date', '<=', $endDate)
                    ->where('end_date', '>=', $startDate);
            })

            ->exists();

        return !$conflict;

    }

    public function calculateTotalPrice($spaceId, $startDate, $endDate)
    {
        $space = Space::findOrFail($spaceId);

        $days = Carbon::parse($startDate)
            ->diffInDays(Carbon::parse($endDate)) + 1;

        return $days * $space->price_per_day;

    }

    public function createReservation($userId, $spaceId, $startDate, $endDate)
    {
        
        return DB::transaction(function () use ($userId, $spaceId, $startDate, $endDate) {
            if (!$this->isSpaceAvailable($spaceId, $startDate, $endDate)) {
                throw new \Exception('Espace non disponible pour les dates sélectionnées');
            }

            $totalPrice = $this->calculateTotalPrice($spaceId, $startDate, $endDate);

            return Reservation::create([
                'user_id' => $userId,
                'space_id' => $spaceId,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'total_price' => $totalPrice,
                'status' => 'en_attente',
                'is_paid' => false
            ]);
        });
    }
}
