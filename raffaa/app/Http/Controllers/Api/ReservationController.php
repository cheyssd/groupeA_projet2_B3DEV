<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Space;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReservationController extends Controller
{
    /**
     * Liste des réservations
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 15);

        $reservations = Reservation::with(['user', 'space'])
            ->when($request->user_id, function ($query) use ($request) {
                $query->where('user_id', $request->user_id);
            })
            ->paginate($perPage);

        return response()->json($reservations);
    }

    /**
     * Créer une réservation
     */
    public function store(Request $request)
    {
        dd('RESERVATION CONTROLLER OK');

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'space_id' => 'required|exists:spaces,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date'
        ]);

        $space = Space::findOrFail($validated['space_id']);

        // Vérifier disponibilité
        $conflict = Reservation::where('space_id', $validated['space_id'])
            ->where(function ($query) use ($validated) {
                $query->whereBetween('start_date', [$validated['start_date'], $validated['end_date']])
                    ->orWhereBetween('end_date', [$validated['start_date'], $validated['end_date']]);
            })
            ->exists();

        if ($conflict) {
            return response()->json([
                'success' => false,
                'message' => 'Espace déjà réservé pour ces dates'
            ], 422);
        }

        // Calcul prix
        $days = Carbon::parse($validated['start_date'])
            ->diffInDays(Carbon::parse($validated['end_date'])) + 1;

        $totalPrice = $days * $space->price_per_day;

        $reservation = Reservation::create([
            'user_id' => $validated['user_id'],
            'space_id' => $validated['space_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'total_price' => $totalPrice,
            'status' => 'en_attente',
            'is_paid' => false
        ]);

        return response()->json([
            'success' => true,
            'reservation' => $reservation,
            'message' => 'Réservation créée avec succès'
        ], 201);
    }

    /**
     * Afficher une réservation
     */
    public function show(Reservation $reservation)
    {
        return response()->json($reservation->load(['user', 'space']));
    }

    /**
     * Mettre à jour une réservation
     */
    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:en_attente,confirmee,annulee',
            'is_paid' => 'boolean'
        ]);

        $reservation->update($validated);

        return response()->json([
            'success' => true,
            'reservation' => $reservation,
            'message' => 'Réservation mise à jour'
        ]);
    }

    /**
     * Supprimer une réservation
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Réservation supprimée'
        ]);
    }
}
