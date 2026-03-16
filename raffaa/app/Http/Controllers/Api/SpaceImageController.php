<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SpaceImage;
use App\Models\Space;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Support\Facades\Storage;


class SpaceImageController extends Controller
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
    public function store(Request $request, $spaceId)
    {
        $validated = $request->validate([
            'image' => 'required|image|max:5120|mimes:jpeg,jpg,png,webp',
            'alt_text' => 'nullable|string|max:225',
            'position' => 'nullable|integer',
        ]);

        $space = Space::findOrFail($spaceId);

        if (!$request->hasFile('image')) {
            return response()->json(['message' => 'Aucune image envoyée'], 400);
        }


        $image = $request->file('image');
        $imageName = time() . '_' . uniqid() . '.webp';
        $imagePath = 'spaces/' . $imageName;


        $img = \Intervention\Image\Facades\Image::make($image);
        $img->encode('webp', 80);

        \Storage::disk('public')->put($imagePath, (string) $img);

        $spaceImage = SpaceImage::create([
            'space_id' => $space->id,
            'filename' => $imagePath,
            'alt_text' => $request->input('alt_text', 'Image de ' . $space->name),
            'position' => $request->input('position', SpaceImage::where('space_id', $spaceId)->max('position') + 1),
        ]);

        return response()->json([
            'message' => 'Image ajoutée avec succès',
            'url' => asset('storage/' . $imagePath),
            'data' => $spaceImage,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(SpaceImage $spaceImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SpaceImage $spaceImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SpaceImage $spaceImage)
    {
        if (auth()->user()?->role !== 'admin') {
            return response()->json(["message" => "Accès réservé aux administrateurs"], 403);
        }
        ;
        if (Storage::disk('public')->exists($spaceImage->filename)) {
            Storage::disk('public')->delete($spaceImage->filename);
        }
        $spaceImage->delete();

        return response()->json(["message" => "image supprimé avec succès"], 204);
    }
}
