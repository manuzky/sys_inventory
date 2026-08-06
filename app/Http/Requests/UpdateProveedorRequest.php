<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProveedorRequest extends FormRequest
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
                Rule::unique('proveedores','nombre')
                    ->ignore($this->proveedor)
            ],

            'rif' => [
                'required',
                'string',
                'max:50',
                Rule::unique('proveedores','rif')
                    ->ignore($this->proveedor)
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
