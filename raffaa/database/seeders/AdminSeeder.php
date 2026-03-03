<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Admin 1
        User::updateOrCreate(
            ['email' => 'admin@ecowork.com'],
            [
                'firstname' => 'Admin',
                'lastname' => 'Main',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'accepted_tos' => true,
            ]
        );

        // Admin 2
        User::updateOrCreate(
            ['email' => 'superadmin@ecowork.com'],
            [
                'firstname' => 'Super',
                'lastname' => 'Admin',
                'password' => Hash::make('superpass123'),
                'role' => 'admin',
                'accepted_tos' => true,
            ]
        );
    }
}
