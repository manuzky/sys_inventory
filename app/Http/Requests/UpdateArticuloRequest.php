<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateArticuloRequest extends FormRequest
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
            'unidad_medida_id' => ['required', 'exists:unidad_medidas,id'],

            'tipo_articulo' => ['required', 'string', 'max:255'],
            'nombre' => ['required', 'string', 'max:255'],
            'modelo' => ['nullable', 'string', 'max:255'],
            'descripcion' => ['nullable', 'string'],

            'control_individual' => ['required', 'boolean'],
            'maneja_serial' => [ 'required', 'boolean',
                function ($attribute, $value, $fail) {
                    if ($value && !request()->boolean('control_individual')) {
                        $fail('Un artículo que maneja serial debe tener control individual.');
                    }
                },
            ],

            'stock_minimo' => ['nullable', 'integer', 'min:0'],
        ];
    }
}