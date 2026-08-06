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
            // PERSONNEL
            ['name' => 'personnel.view', 'display_name' => 'Ver Personal'],
            ['name' => 'personnel.create', 'display_name' => 'Crear Personal'],
            ['name' => 'personnel.edit', 'display_name' => 'Editar Personal'],
            ['name' => 'personnel.toggle-status', 'display_name' => 'Activar o Desactivar Personal'],

            // USERS
            ['name' => 'users.view', 'display_name' => 'Ver Usuarios'],
            ['name' => 'users.create', 'display_name' => 'Crear Usuarios'],
            ['name' => 'users.edit', 'display_name' => 'Editar Usuarios'],
            ['name' => 'users.toggle-status', 'display_name' => 'Activar o Desactivar Usuarios'],

            // ROLES
            ['name' => 'roles.view', 'display_name' => 'Ver Roles'],
            ['name' => 'roles.create', 'display_name' => 'Crear Roles'],
            ['name' => 'roles.edit', 'display_name' => 'Editar Roles'],
            ['name' => 'roles.delete', 'display_name' => 'Eliminar Roles'],

            // POSITIONS
            ['name' => 'positions.view', 'display_name' => 'Ver Cargos'],
            ['name' => 'positions.create', 'display_name' => 'Crear Cargos'],
            ['name' => 'positions.edit', 'display_name' => 'Editar Cargos'],
            ['name' => 'positions.delete', 'display_name' => 'Eliminar Cargos'],
            ['name' => 'positions.toggle-status', 'display_name' => 'Activar o Desactivar Cargos'],

            // PERMISSIONS
            ['name' => 'permissions.view', 'display_name' => 'Ver Permisos'],
            ['name' => 'permissions.create', 'display_name' => 'Crear Permisos'],
            ['name' => 'permissions.edit', 'display_name' => 'Editar Permisos'],
            ['name' => 'permissions.delete', 'display_name' => 'Eliminar Permisos'],

            // -----------------------------------------------------------------------------------------------------------------------------

            [ 'name' => 'categorias.view', 'display_name' => 'Ver Categorías', ],
            [ 'name' => 'categorias.create', 'display_name' => 'Crear Categorías', ],
            [ 'name' => 'categorias.edit', 'display_name' => 'Editar Categorías', ],
            [ 'name' => 'categorias.delete', 'display_name' => 'Eliminar Categorías', ],
            [ 'name' => 'categorias.toggle-status', 'display_name' => 'Activar o Desactivar Categorías', ],

            [ 'name' => 'marcas.view', 'display_name' => 'Ver Marca', ],
            [ 'name' => 'marcas.create', 'display_name' => 'Crear Marca', ],
            [ 'name' => 'marcas.edit', 'display_name' => 'Editar Marca', ],
            [ 'name' => 'marcas.delete', 'display_name' => 'Borrar Marca', ],
            [ 'name' => 'marcas.toggle-status', 'display_name' => 'Activar o Desactivar Marca', ],

            [ 'name' => 'unidades-medida.view', 'display_name' => 'Ver Unidades de Medida', ],
            [ 'name' => 'unidades-medida.create', 'display_name' => 'Crear Unidades de Medida', ],
            [ 'name' => 'unidades-medida.edit', 'display_name' => 'Editar Unidades de Medida', ],
            [ 'name' => 'unidades-medida.delete', 'display_name' => 'Eliminar Unidades de Medida', ],
            [ 'name' => 'unidades-medida.toggle-status', 'display_name' => 'Activar o Desactivar Unidades de Medida', ],

            [ 'name' => 'ubicaciones.view', 'display_name' => 'Ver Ubicaciones', ],
            [ 'name' => 'ubicaciones.create', 'display_name' => 'Crear Ubicaciones', ],
            [ 'name' => 'ubicaciones.edit', 'display_name' => 'Editar Ubicaciones', ],
            [ 'name' => 'ubicaciones.delete', 'display_name' => 'Eliminar Ubicaciones', ],
            [ 'name' => 'ubicaciones.toggle-status', 'display_name' => 'Activar o Desactivar Ubicaciones', ],
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