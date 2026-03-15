<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSpaceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'surface' => 'required|numeric',
            'capacity' => 'required|integer',
            'type' => 'required|in:bureau_prive,espace_partage,salle_reunion,salle_conference',
            'price_per_day' => 'required|numeric',
            'is_active' => 'boolean',
            'equipment_ids' => 'nullable|array',
            'equipment_ids.*' => 'exists:equipements,id'
        ];
    }
}
