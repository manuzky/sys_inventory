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
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // ROLES
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']);
        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $rrhh = Role::firstOrCreate(['name' => 'RRHH']);

        // Super Admin tiene todo
        $superAdmin->givePermissionTo(Permission::all());

        // Admin parcial
        $admin->givePermissionTo([
            'personnel.view',
            'personnel.create',
            'personnel.edit',
            'users.view',
            'users.create',
            'roles.view',
        ]);

        // RRHH
        $rrhh->givePermissionTo([
            'personnel.view',
            'personnel.create',
            'personnel.edit',
        ]);
    }
}
