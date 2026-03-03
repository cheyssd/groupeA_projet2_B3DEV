<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ReservationConfirmed;
use App\Services\ReservationService;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    protected $reservationService;

    public function __construct(ReservationService $reservationService)
    {
        $this->reservationService = $reservationService;
    }

    /**
     * Liste des réservations
     */


    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 15);

        $reservations = Reservation::with(['user', 'space'])
            ->where('user_id', Auth::id())
            ->paginate($perPage);

        return response()->json($reservations);
    }
    /**
     * Créer une réservation
     */
    public function store(Request $request)
    {



        $validated = $request->validate([
            'space_id' => 'required|exists:spaces,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date'
        ]);

        try {
            $reservation = $this->reservationService->createReservation(
                Auth::id(),
                $validated['space_id'],
                $validated['start_date'],
                $validated['end_date']
            );

            return response()->json([
                'success' => true,
                'reservation' => $reservation,
                'message' => 'Réservation créée avec succès'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Afficher une réservation
     */
    public function show(Reservation $reservation)
    {
        if ($reservation->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Accès refusé'
            ], 403);
        }

        return response()->json($reservation->load(['user', 'space']));
    }

    /**
     * Mettre à jour une réservation
     */
    // public function update(Request $request, Reservation $reservation)
    // {
    //     $validated = $request->validate([
    //         'status' => 'sometimes|in:en_attente,confirmee,annulee',
    //         'is_paid' => 'boolean'
    //     ]);

    //     $reservation->update($validated);

    //     return response()->json([
    //         'success' => true,
    //         'reservation' => $reservation,
    //         'message' => 'Réservation mise à jour'
    //     ]);
    // }

    /**
     * Supprimer une réservation
     */
   public function destroy(Reservation $reservation)
{
    if ($reservation->user_id !== Auth::id() ) {
        return response()->json([
            'message' => 'Accès refusé'
        ], 403);
    }

    $reservation->delete();

    return response()->json([
        'success' => true,
        'message' => 'Réservation supprimée'
    ]);
}


    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:en_attente,confirmee,annulee'
        ]);

        $reservation = Reservation::findOrFail($id);

        $reservation->update([
            'status' => $request->status
        ]);

        if ($request->status === 'confirmee') {

    $reservation->load('user', 'space');

    Mail::to($reservation->user->email)
        ->send(new ReservationConfirmed($reservation));
}

        return response()->json([
            'success' => true,
            'reservation' => $reservation,
            'message' => 'Statut mis à jour'
        ]);
    }

    public function markAsPaid($id)
    {
        $reservation = Reservation::findOrFail($id);

        if ($reservation->status !== 'confirmee') {
            return response()->json([
                'success' => false,
                'message' => 'La réservation doit être confirmée avant paiement'
            ], 422);
        }

        $reservation->update([
            'is_paid' => true
        ]);

        return response()->json([
            'success' => true,
            'reservation' => $reservation,
            'message' => 'Réservation marquée comme payée'
        ]);
    }
}
