<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProveedorRequest extends FormRequest
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
                'unique:proveedores,nombre'
            ],

            'rif' => [
                'required',
                'string',
                'max:50',
                'unique:proveedores,rif'
            ],

            'telefono' => [
                'nullable',
                'string',
                'max:50'
            ],

            'email' => [
                'nullable',
                'email',
                'max:255'
            ],

            'direccion' => [
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
