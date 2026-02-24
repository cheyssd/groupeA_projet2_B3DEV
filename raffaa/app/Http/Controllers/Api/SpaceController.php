<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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

        $spaces = Space::with('equipments')->when($request->search, function ($query) use ($request) {
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surface' => 'required|numeric',
            'capacity' => 'required|integer',
            'type' => 'required|in:bureau,salle_reunion,conference',
            'price_per_day' => 'required|numeric',
            'is_active' => 'boolean',
            'equipment_ids' => 'nullable|array',
            'equipment_ids.*' => 'exists:equipment,id'
        ]);

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
    public function update(Request $request, Space $space)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'surface' => 'sometimes|numeric',
            'capacity' => 'sometimes|integer',
            'type' => 'sometimes|in:bureau,salle_reunion,conference',
            'price_per_day' => 'sometimes|numeric',
            'is_active' => 'boolean'
        ]);

        $space->update($validated);

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
}
