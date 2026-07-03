<?php

namespace Database\Seeders;

use App\Models\Personnel;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $personnel = Personnel::where('id_number', '00000001')->firstOrFail();

        $user = User::create([
            'name' => $personnel->first_name . ' ' . $personnel->last_name,
            'username' => 'admin',
            'email' => $personnel->email,
            'personnel_id' => $personnel->id,
            'password' => Hash::make('password'),
        ]);

        $user->assignRole('Super Admin');
    }
}