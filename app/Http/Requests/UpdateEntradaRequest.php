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

            // Detalles de la factura
            'detalles' => ['required', 'array', 'min:1'],
            'detalles.*.id' => ['nullable', 'integer'],
            'detalles.*.articulo_id' => ['required', 'integer', 'exists:articulos,id'],
            'detalles.*.cantidad' => ['required', 'numeric', 'gt:0'],

            // Unidades individuales
            'detalles.*.unidades' => ['nullable', 'array'],
            'detalles.*.unidades.*.id' => ['nullable', 'integer'],
            'detalles.*.unidades.*.serial' => ['nullable', 'string', 'max:255'],
            'detalles.*.unidades.*.ubicacion_id' => ['required', 'integer', 'exists:ubicaciones,id'],
            'detalles.*.unidades.*.estado_id' => ['required', 'integer', 'exists:estados_articulo,id'],
        ];
    }
}