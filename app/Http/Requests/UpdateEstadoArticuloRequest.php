<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEstadoArticuloRequest extends FormRequest
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
                Rule::unique('estados_articulo','nombre')
                    ->ignore($this->estadoArticulo),
            ],
            'descripcion'=>[
                'nullable',
                'string',
            ],
        ];
    }
}
