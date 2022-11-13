<?php

namespace App\Http\Resources;

use App\Http\Resources\Traits\ErrorTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class ErrorResource extends JsonResource
{
    use ErrorTrait;

    /**
     * Create a new resource instance.
     *
     * @param  mixed  $resource
     * @return void
     */
    public function __construct($resource, $errorCode = 422, $errorMessage = 'Error')
    {
        parent::__construct($resource);
        $this->with = $this->setErrorWithProperty($errorCode, $errorMessage);
    }

    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = 'errors';

    /**
     * Customize the response for a request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\JsonResponse  $response
     * @return void
     */
    public function withResponse($request, $response)
    {
        $response->setStatusCode(422);
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
