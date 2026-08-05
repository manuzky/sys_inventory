<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUnidadMedidaRequest extends FormRequest
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
                'unique:unidad_medidas,nombre',
            ],

            'abreviatura' => [
                'required',
                'string',
                'max:20',
                'unique:unidad_medidas,abreviatura',
            ],

            'estado' => [
                'required',
                'boolean',
            ],
        ];
    }
}