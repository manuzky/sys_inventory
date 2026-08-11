<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticuloRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'categoria_id' => ['required','exists:categorias,id'],
            'marca_id' => ['required','exists:marcas,id'],
            'unidad_medida_id' => ['required','exists:unidad_medidas,id'],
            'ubicacion_id' => ['required','exists:ubicaciones,id'],
            'estado_id' => ['required','exists:estados_articulo,id'],
            'tipo_articulo' => ['required','string','max:50'],
            'codigo' => ['required','string','max:100','unique:articulos,codigo'],
            'codigo_patrimonial' => ['nullable','string','max:100','unique:articulos,codigo_patrimonial'],
            'serial' => ['nullable','string','max:100','unique:articulos,serial'],
            'nombre' => ['required','string','max:255'],
            'descripcion' => ['nullable','string'],
            'cantidad' => ['required','numeric','min:0'],
            'stock_minimo' => ['required','numeric','min:0'],
            'fecha_adquisicion' => ['nullable','date'],
        ];
    }
}