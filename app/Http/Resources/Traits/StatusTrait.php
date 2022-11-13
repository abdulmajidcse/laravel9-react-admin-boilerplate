<?php

namespace App\Http\Resources\Traits;

trait StatusTrait
{
    public function setStatusWithProperty($statusCode = 200, $statusMessage = 'Success')
    {
        return [
            'statusCode' => $statusCode,
            'statusMessage' => $statusMessage,
        ];
    }
}
