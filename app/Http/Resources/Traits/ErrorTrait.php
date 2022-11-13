<?php

namespace App\Http\Resources\Traits;

trait ErrorTrait
{
    public function setErrorWithProperty($errorCode = 422, $errorMessage = 'Error')
    {
        return [
            'errorCode' => $errorCode,
            'errorMessage' => $errorMessage,
        ];
    }
}
