<?php

namespace App\Http\Requests;

use App\Models\Articulo;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreEntradaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'articulo_id' => ['required', 'integer', 'exists:articulos,id'],
            'proveedor_id' => ['required', 'integer', 'exists:proveedores,id'],
            'cantidad' => ['required', 'numeric', 'gt:0'],
            'numero_documento' => ['nullable', 'string', 'max:255'],
            'fecha' => ['required', 'date'],
            'observaciones' => ['nullable', 'string'],

            'unidades' => ['nullable', 'array'],
            'unidades.*.identificador' => ['required', 'string', 'max:255'],
            'unidades.*.serial' => ['nullable', 'string', 'max:255'],
            'unidades.*.ubicacion_id' => ['required', 'integer', 'exists:ubicaciones,id'],
            'unidades.*.estado_id' => ['required', 'integer', 'exists:estados_articulo,id'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $articulo = Articulo::find($this->input('articulo_id'));

            if (!$articulo) {
                return;
            }

            $cantidad = $this->input('cantidad');
            $unidades = $this->input('unidades', []);

            if (!$articulo->control_individual) {
                if (!empty($unidades)) {
                    $validator->errors()->add(
                        'unidades',
                        'Este artículo no maneja unidades individuales.'
                    );
                }

                return;
            }

            if (!is_numeric($cantidad) || floor((float) $cantidad) != (float) $cantidad) {
                $validator->errors()->add(
                    'cantidad',
                    'La cantidad debe ser un número entero para artículos con control individual.'
                );

                return;
            }

            $cantidad = (int) $cantidad;

            if (count($unidades) !== $cantidad) {
                $validator->errors()->add(
                    'unidades',
                    'Debe registrar exactamente una unidad por cada cantidad ingresada.'
                );

                return;
            }

            $identificadores = collect($unidades)
                ->pluck('identificador')
                ->filter()
                ->map(fn ($identificador) => mb_strtolower(trim($identificador)))
                ->values();

            if ($identificadores->duplicates()->isNotEmpty()) {
                $validator->errors()->add(
                    'unidades',
                    'No puede haber identificadores repetidos dentro de la misma entrada.'
                );
            }

            if ($articulo->maneja_serial) {
                foreach ($unidades as $index => $unidad) {
                    if (empty($unidad['serial'])) {
                        $validator->errors()->add(
                            "unidades.{$index}.serial",
                            'El serial es obligatorio para este artículo.'
                        );
                    }
                }

                $seriales = collect($unidades)
                    ->pluck('serial')
                    ->filter()
                    ->map(fn ($serial) => mb_strtolower(trim($serial)))
                    ->values();

                if ($seriales->duplicates()->isNotEmpty()) {
                    $validator->errors()->add(
                        'unidades',
                        'No puede haber seriales repetidos dentro de la misma entrada.'
                    );
                }
            }
        });
    }
}