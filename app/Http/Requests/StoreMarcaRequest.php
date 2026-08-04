<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMarcaRequest extends FormRequest
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
                'unique:marcas,nombre'
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