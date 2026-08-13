<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSalidaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fecha' => ['required', 'date'],
            'motivo' => ['required', 'string', 'max:255'],
            'observaciones' => ['nullable', 'string'],

            'detalles' => ['required', 'array', 'min:1'],

            'detalles.*.articulo_id' => [
                'required',
                'exists:articulos,id',
                'distinct',
            ],

            'detalles.*.cantidad' => [
                'required',
                'numeric',
                'gt:0',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'detalles.required' => 'Debe agregar al menos un artículo.',
            'detalles.min' => 'Debe agregar al menos un artículo.',
            'detalles.*.articulo_id.distinct' => 'No puede repetir un mismo artículo.',
        ];
    }
}