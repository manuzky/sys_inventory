<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Super Admin',
            'username' => 'admin',
            'email' => 'admin@system.com',
            'password' => Hash::make('123456'),
            'active' => true,
        ]);

        // Luego le asignamos rol (lo creamos abajo)
        $user->assignRole('Super Admin');
    }
}
