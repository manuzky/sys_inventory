<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // PERMISOS BASE
        $permissions = [
            'personnel.view',
            'personnel.create',
            'personnel.edit',
            'personnel.delete',
            'personnel.toggle-status',

            'users.view',
            'users.create',
            'users.edit',
            'users.disable',

            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',

            'positions.view',
            'positions.create',
            'positions.edit',
            'positions.delete',

            'permissions.view',
            'permissions.create',
            'permissions.edit',
            'permissions.delete',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // ROLES
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']);

        // Super Admin tiene todo
        $superAdmin->givePermissionTo(Permission::all());
    }
}
