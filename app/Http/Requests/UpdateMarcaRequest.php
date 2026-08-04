<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMarcaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'nombre' => [
                'required',
                'string',
                'max:255',
                Rule::unique('marcas', 'nombre')
                    ->ignore($this->marca)
            ],

            'descripcion' => [
                'nullable',
                'string'
            ],

            'estado' => [
                'required',
                'boolean'
            ],
        ];
    }
}