<?php

namespace App\Http\Controllers\Api\Auth;

use App\Rules\ValidPassword;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\SuccessResource;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateProfile(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email,' . auth()->id(),
        ]);

        if ($validation->fails()) {
            return new ErrorResource($validation->getMessageBag());
        }

        $data = $validation->validated();

        //save name and email
        auth()->user()->update($data);

        return new SuccessResource([], 200, 'Profile Updated.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'old_password' => ['required', 'min:8', new ValidPassword],
            'new_password' => 'required|confirmed|min:8',
        ]);

        if ($validation->fails()) {
            return new ErrorResource($validation->getMessageBag());
        }

        $data = $validation->validated();
        $data['password'] = Hash::make($data['new_password']);

        //save name and email
        auth()->user()->update($data);

        return new SuccessResource([], 200, 'Password Changed.');
    }
}
