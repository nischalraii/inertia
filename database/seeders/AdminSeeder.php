<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if the admin role exists and create if it doesn't
        $adminRole = Role::where('name','admin')->first();

        // Use updateOrCreate to avoid duplicate entries
        $adminUser = User::updateOrCreate(
            ['email' => 'admin@admin.com'], // Search by email
            [
                'name' => 'Admin User',
                'password' => bcrypt('admin123'), // Make sure to hash the password securely
            ]
        );

        // Attach the admin role to the user if it isn't already attached
        if ($adminRole) {
            $adminUser->roles()->syncWithoutDetaching([$adminRole->id]);
        }
    }
}
