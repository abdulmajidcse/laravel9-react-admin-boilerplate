<?php

namespace App\Http\Controllers\Auth;

use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'type_of_member' => ['required', 'string', Rule::in(['Buyer', 'Seller'])],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // start db transaction
        DB::beginTransaction();

        try {
            // generate hash password and create new user
            $data['password'] = Hash::make($data['password']);
            $user = User::create($data);

            // set user role
            $role = Role::firstOrCreate(['name' => $data['type_of_member']]);
            UserRole::create(['user_id' => $user->id, 'role_id' => $role->id]);
            
            // db transaction commited
            DB::commit();

            event(new Registered($user));

            Auth::login($user);

            return redirect(RouteServiceProvider::DASHBOARD);
        } catch (\Throwable $th) {
            // db transaction rollback
            DB::rollBack();
            
            return back()->with(['status' => 'Something went wrong', 'statusType' => 'danger']);
        }
    }
}
