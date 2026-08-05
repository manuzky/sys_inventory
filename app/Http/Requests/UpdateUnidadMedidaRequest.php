<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUnidadMedidaRequest extends FormRequest
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
                Rule::unique('unidad_medidas','nombre')
                    ->ignore($this->unidadMedida->id),
            ],

            'abreviatura'=>[
                'required',
                'string',
                'max:20',
                Rule::unique('unidad_medidas','abreviatura')
                    ->ignore($this->unidadMedida->id),
            ],

            'estado'=>[
                'required',
                'boolean',
            ],
        ];
    }
}