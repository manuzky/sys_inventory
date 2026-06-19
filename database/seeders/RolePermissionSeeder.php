<?php

namespace Database\Seeders;

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
            [
                'name' => 'personnel.view',
                'display_name' => 'Ver Personal',
            ],
            [
                'name' => 'personnel.create',
                'display_name' => 'Crear Personal',
            ],
            [
                'name' => 'personnel.edit',
                'display_name' => 'Editar Personal',
            ],
            [
                'name' => 'personnel.delete',
                'display_name' => 'Eliminar Personal',
            ],
            [
                'name' => 'personnel.toggle-status',
                'display_name' => 'Activar o Desactivar Personal',
            ],

            [
                'name' => 'users.view',
                'display_name' => 'Ver Usuarios',
            ],
            [
                'name' => 'users.create',
                'display_name' => 'Crear Usuarios',
            ],
            [
                'name' => 'users.edit',
                'display_name' => 'Editar Usuarios',
            ],
            [
                'name' => 'users.disable',
                'display_name' => 'Deshabilitar Usuarios',
            ],

            [
                'name' => 'roles.view',
                'display_name' => 'Ver Roles',
            ],
            [
                'name' => 'roles.create',
                'display_name' => 'Crear Roles',
            ],
            [
                'name' => 'roles.edit',
                'display_name' => 'Editar Roles',
            ],
            [
                'name' => 'roles.delete',
                'display_name' => 'Eliminar Roles',
            ],

            [
                'name' => 'positions.view',
                'display_name' => 'Ver Cargos',
            ],
            [
                'name' => 'positions.create',
                'display_name' => 'Crear Cargos',
            ],
            [
                'name' => 'positions.edit',
                'display_name' => 'Editar Cargos',
            ],
            [
                'name' => 'positions.delete',
                'display_name' => 'Eliminar Cargos',
            ],

            [
                'name' => 'permissions.view',
                'display_name' => 'Ver Permisos',
            ],
            [
                'name' => 'permissions.create',
                'display_name' => 'Crear Permisos',
            ],
            [
                'name' => 'permissions.edit',
                'display_name' => 'Editar Permisos',
            ],
            [
                'name' => 'permissions.delete',
                'display_name' => 'Eliminar Permisos',
            ],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission['name']],
                [
                    'display_name' => $permission['display_name'],
                    'guard_name' => 'web',
                ]
            );
        }

        // ROLES
        $superAdmin = Role::firstOrCreate([
            'name' => 'Super Admin',
            'guard_name' => 'web',
        ]);

        // Super Admin tiene todo
        $superAdmin->syncPermissions(Permission::all());
    }
}