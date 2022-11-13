<?php

namespace App\Http\Resources;

use App\Http\Resources\Traits\StatusTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class SuccessResource extends JsonResource
{
    use StatusTrait;

    /**
     * Create a new resource instance.
     *
     * @param  mixed  $resource
     * @return void
     */
    public function __construct($resource, $statusCode = 200, $statusMessage = 'Success')
    {
        parent::__construct($resource);
        $this->with = $this->setStatusWithProperty($statusCode, $statusMessage);
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
