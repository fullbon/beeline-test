<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAgreementRequest extends FormRequest
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'region' => ['required', 'string', 'max:255'],
            'branch' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'started_at' => ['required', 'date'],
            'finished_at' => ['required', 'date', 'after:started_at'],
            'comment' => ['nullable', 'string', 'max:255'],
        ];
    }
}
