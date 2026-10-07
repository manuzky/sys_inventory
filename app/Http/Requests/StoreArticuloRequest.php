<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticuloRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'categoria_id' => ['required', 'exists:categorias,id'],
            'marca_id' => ['required', 'exists:marcas,id'],

            'nombre' => ['required', 'string', 'max:255'],
            'modelo' => ['required', 'string', 'max:255'],
            'descripcion' => ['nullable', 'string'],
            'referencia_id' => ['nullable', 'exists:referencias,id,estado,1', 'required_if:control_individual,1'],

            'control_individual' => ['required', 'boolean'],
            'maneja_serial' => [ 'required', 'boolean',
                function ($attribute, $value, $fail) {
                    if ($value && !request()->boolean('control_individual')) {
                        $fail('Un artículo que maneja serial debe tener control individual.');
                    }
                },
            ],

            'stock_minimo' => ['required', 'integer', 'min:0'],
        ];
    }
}