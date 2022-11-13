<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::transaction(function () {
            $superAdmin = User::create([
                'name' => 'Administrator',
                'email' => 'super_admin@gmail.com',
                'password' => bcrypt(12345678),
            ]);

            $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);
            UserRole::create(['user_id' => $superAdmin->id, 'role_id' => $superAdminRole->id]);
        });
    }
}
