<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Space;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
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

    // ─── Users ───────────────────────────────────────────────────────────────

    public function users(Request $request)
    {
        $perPage = $request->query('per_page', 15);
        $search  = $request->query('search');
        $role    = $request->query('role');

        $users = User::query()
            ->when($search, fn($q) => $q->where('firstname', 'like', "%$search%")
                ->orWhere('lastname', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%"))
            ->when($role, fn($q) => $q->where('role', $role))
            ->paginate($perPage);

        return response()->json($users);
    }

    public function showUser($id)
    {
        return response()->json(User::findOrFail($id));
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->only([
            'firstname', 'lastname', 'email', 'role', 'phone', 'address'
        ]));

        return response()->json([
            'success' => true,
            'user'    => $user,
            'message' => 'Utilisateur mis à jour'
        ]);
    }

    public function deleteUser($id)
    {
        User::findOrFail($id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur supprimé'
        ]);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
