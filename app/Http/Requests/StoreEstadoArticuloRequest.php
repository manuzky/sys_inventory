<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreEstadoArticuloRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre'=>[
                'required',
                'string',
                'max:255',
                'unique:estados_articulo,nombre',
            ],
            'descripcion'=>[
                'nullable',
                'string',
            ],
        ];
    }
}
