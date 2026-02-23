<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Models\Space;
use Carbon\Carbon;
class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->valide([
            'space_id' => 'required|exists:spaces,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_day'
        ]);

        $space = Space::findOrFail($validated['space_id']);

        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);
        $nbDays = $startDate->diffInDays($endDate) + 1;
        $totalPrice = $nbDays *$space->price_per_day;

        $reservation = Reservation::create([
            'user_id' => auth()->id(),
            'space_id' => $validated['space_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'total_price' => $totalPrice,
            'status' => 'en_attente',
            'is_paid' => false,
        ]);

        return response()-> json($reservation->load('space','user'),201);
    }



    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
