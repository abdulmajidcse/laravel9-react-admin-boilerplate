<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class AuthenticatedUserController extends Controller
{
    public function user()
    {
        return new UserResource(auth()->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return new SuccessResource([], 200, 'Logout Successfully');
    }
}
