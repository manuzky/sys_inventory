<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateReferenciaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $referencia = $this->route('referencia');

        return [
            'codigo' => [
                'required',
                'string',
                'size:3',
                'regex:/^[A-Za-z]{3}$/',
                Rule::unique('referencias', 'codigo')->ignore($referencia->id),
            ],
            'descripcion' => [
                'nullable',
                'string',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'codigo.required' => 'El código es obligatorio.',
            'codigo.size' => 'El código debe tener exactamente 3 letras.',
            'codigo.regex' => 'El código solo puede contener letras.',
            'codigo.unique' => 'Este código ya está registrado.',
            'descripcion.string' => 'La descripción debe ser un texto válido.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'codigo' => strtoupper($this->codigo ?? ''),
        ]);
    }
}