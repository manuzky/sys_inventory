<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateArticuloRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $articulo = $this->route('articulo');

        return [
            'categoria_id' => ['required','exists:categorias,id'],
            'marca_id' => ['required','exists:marcas,id'],
            'unidad_medida_id' => ['required','exists:unidad_medidas,id'],
            'ubicacion_id' => ['required','exists:ubicaciones,id'],
            'estado_id' => ['required','exists:estados_articulo,id'],
            'tipo_articulo' => ['required','string','max:50'],
            'codigo' => ['required','string','max:100',Rule::unique('articulos','codigo')->ignore($articulo)],
            'codigo_patrimonial' => ['nullable','string','max:100',Rule::unique('articulos','codigo_patrimonial')->ignore($articulo)],
            'serial' => ['nullable','string','max:100',Rule::unique('articulos','serial')->ignore($articulo)],
            'nombre' => ['required','string','max:255'],
            'descripcion' => ['nullable','string'],
            'cantidad' => ['required','numeric','min:0'],
            'stock_minimo' => ['required','numeric','min:0'],
            'fecha_adquisicion' => ['nullable','date'],
        ];
    }
}