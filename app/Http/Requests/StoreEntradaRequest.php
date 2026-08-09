<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEntradaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'proveedores_id' => [
                'required',
                'exists:proveedores,id',
            ],

            'fecha' => [
                'required',
                'date',
            ],

            'tipo_documento' => [
                'required',
                'string',
                'max:50',
            ],

            'numero_documento' => [
                'required',
                'string',
                'max:100',
            ],

            'observacion' => [
                'nullable',
                'string',
            ],

            'estado' => [
                'required',
                'boolean',
            ],
        ];
    }
}