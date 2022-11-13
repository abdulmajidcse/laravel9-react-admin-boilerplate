<?php

namespace App\Http\Resources;

use App\Http\Resources\Traits\StatusTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d h:i A'),
            'updated_at' => $this->updated_at->format('Y-m-d h:i A'),
            'roles' => RoleResource::collection($this->roles),
        ];

        if ($request->has('needApiToken')) {
            $token = $this->createToken('api');
            $data['token'] = $token->plainTextToken;
        }

        return $data;
    }
}
