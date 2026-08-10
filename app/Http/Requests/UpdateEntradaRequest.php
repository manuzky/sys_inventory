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
            'proveedores_id' => ['required','exists:proveedores,id'],
            'fecha' => ['required','date'],
            'tipo_documento' => ['required','string','max:50'],
            'numero_documento' => ['required','string','max:100'],
            'observacion' => ['nullable','string'],
            'detalles' => ['required','array','min:1'],
            'detalles.*.articulo_id' => ['required','exists:articulos,id'],
            'detalles.*.cantidad' => ['required','numeric','gt:0'],
            'detalles.*.costo' => ['required','numeric','gte:0'],
        ];
    }
}