<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function download($id)
    {
        $reservation = Reservation::with(['user', 'space'])->findOrFail($id);

        // Vérification sécurité
        if (
            $reservation->user_id !== Auth::id() &&
            Auth::user()->role !== 'admin'
        ) {
            return response()->json([
                'message' => 'Accès refusé'
            ], 403);
        }

        $pdf = Pdf::loadView('pdf.invoice', [
            'reservation' => $reservation
        ]);

        return $pdf->download('facture-reservation-' . $reservation->id . '.pdf');
    }
}
