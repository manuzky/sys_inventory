<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEntradaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'proveedor_id' => ['required', 'integer', 'exists:proveedores,id'],
            'numero_documento' => ['required', 'string', 'max:255'],
            'fecha' => ['required', 'date'],
            'observaciones' => ['nullable', 'string'],
        ];
    }
}