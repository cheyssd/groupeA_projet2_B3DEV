<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Space;
use App\Models\User;
use Illuminate\Http\Request;
class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function dashboard()
    {
        return response()->json([
            'total_spaces' => Space::count(),
            'active_spaces' => Space::where('is_active', true)->count(),
            'total_users' => User::count(),
            'total_reservations' => Reservation::count(),
            'pending_reservations' => Reservation::where('status', 'en_attente')->count(),
            'comfirmed_reservations' => Reservation::where('status', 'comfirme')->count(),
            'total_revenue' => Reservation::where('is_paid', true)->sum('total_price'),
            'recent_reservations' => Reservation::with(['user', 'space'])
                ->latest()
                ->take(10)
                ->get(),

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
