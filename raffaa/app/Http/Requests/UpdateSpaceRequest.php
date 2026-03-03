<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSpaceRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255',
            'surface' => 'sometimes|numeric',
            'capacity' => 'sometimes|integer',
            'type' => 'sometimes|in:bureau,salle_reunion,conference',
            'price_per_day' => 'sometimes|numeric',
            'is_active' => 'boolean'
        ];
    }
}
