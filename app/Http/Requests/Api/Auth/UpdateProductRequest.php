<?php

namespace App\Http\Requests\Api\Auth;

use App\Http\Resources\ErrorResource;
use Illuminate\Validation\Rules\File;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:180',
            'image' => ['nullable', File::types(['jpg', 'jpeg', 'png',])->max(5 * 1024)],
            'short_description' => 'required|string|max:190',
            'full_description' => 'required|string',
            'price' => 'required|numeric',
            'category_ids' => 'required|array',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'category_ids' => 'category',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new ValidationException($validator, new ErrorResource($validator->errors()));
    }
}
