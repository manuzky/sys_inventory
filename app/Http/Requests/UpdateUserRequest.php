<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user')?->id;

        return [
            'username' => [
                'required',
                'string',
                'max:255',
                'unique:users,username,' . $userId,
            ],

            'role' => ['required', 'exists:roles,name'],

            'personnel_id' => [
                'required',
                'exists:personnels,id',
                Rule::unique('users', 'personnel_id')->ignore($userId),
            ],

            'change_password' => ['boolean'],

            'password' => [
                'nullable',
                'string',
                'min:8',
                'confirmed',
            ],
        ];
    }
}
