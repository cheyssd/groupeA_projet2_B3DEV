<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipement;
use Illuminate\Http\Request;

class EquipementController extends Controller
{
    public function index() {
        return response()->json(Equipement::all());
    }

    public function store(Request $request) {
        $request->validate(['name' => 'required|string|max:255']);
        return response()->json(Equipement::create($request->only('name')), 201);
    }

    public function update(Request $request, $id) {
        $eq = Equipement::findOrFail($id);
        $request->validate(['name' => 'required|string|max:255']);
        $eq->update($request->only('name'));
        return response()->json($eq);
    }

    public function destroy($id) {
        Equipement::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }
}
