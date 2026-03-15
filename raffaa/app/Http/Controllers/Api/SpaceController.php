<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSpaceRequest;
use App\Http\Requests\UpdateSpaceRequest;
use App\Models\Reservation;
use App\Models\Space;
use Illuminate\Http\Request;

class SpaceController extends Controller
{
    /**
     * Liste des espaces
     * ?per_page=10
     * ?search=nom
     * ?type=bureau
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 15);

        $spaces = Space::with('images','equipements')->when($request->search, function ($query) use ($request) {
            $query->where('name', 'like', '%' . $request->search . '%');
        })
            ->when($request->type, function ($query) use ($request) {
                $query->where('type', $request->type);
            })
            ->when($request->is_active !== null, function ($query) use ($request) {
                $query->where('is_active', $request->is_active);
            })
            ->paginate($perPage);


        return response()->json($spaces);
    }

    /**
     * Créer un espace
     */
    public function store(StoreSpaceRequest $request)
    {
        $validated = $request->validated();

        $space = Space::create($validated);

        if (isset($validated['equipment_ids'])) {
            $space->equipment()->sync($validated['equipment_ids']);
        }

        return response()->json([
            'success' => true,
            'space' => $space,
            'message' => 'Espace créé avec succès'
        ], 201);
    }

    /**
     * Afficher un espace
     */
    public function show(Space $space)
    {
        return response()->json($space);
    }

    /**
     * Mettre à jour un espace
     */
    public function update(UpdateSpaceRequest $request, Space $space)
    {
        $validated = $request->validated();

        $space->update($validated);

        if ($request->has('equipments')) {
            $space->equipments()->sync($request->equipments);
        }


        return response()->json([
            'success' => true,
            'space' => $space,
            'message' => 'Espace mis à jour'
        ]);
    }

    /**
     * Supprimer un espace
     */
    public function destroy(Space $space)
    {
        $space->delete();

        return response()->json([
            'success' => true,
            'message' => 'Espace supprimé'
        ]);
    }

    public function availableSpaces(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'type' => 'nullable|string',
            'capacity_min' => 'nullable|integer'
        ]);

        $startDate = $request->start_date;
        $endDate = $request->end_date;

        $unavailableSpaceIds = Reservation::where(function ($query) use ($startDate, $endDate) {
                $query->where('start_date', '<=', $endDate)
                    ->where('end_date', '>=', $startDate);
            })
            ->whereIn('status', ['en_attente', 'confirmee'])
            ->pluck('space_id')
            ->toArray();

        $spaces = Space::where('is_active', true)
            ->whereNotIn('id', $unavailableSpaceIds);

        if ($request->type) {
            $spaces->where('type', $request->type);
        }

        if ($request->capacity_min) {
            $spaces->where('capacity', '>=', $request->capacity_min);
        }

        return response()->json($spaces->get());
    }

    public function syncEquipements(Request $request, $id) {
    $space = Space::findOrFail($id);
    $space->equipements()->sync($request->equipement_ids ?? []);
    return response()->json(['success' => true]);
}
}
