<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            PositionSeeder::class,
            PersonnelSeeder::class,
            RolePermissionSeeder::class,
            UserSeeder::class,
            EmergencyContactRelationshipSeeder::class,

            CategoriaSeeder::class,
            MarcaSeeder::class,
            UnidadMedidaSeeder::class,
            UbicacionSeeder::class,
            ProveedorSeeder::class,
            EstadoArticuloSeeder::class,
            ArticuloSeeder::class,
            EntradaSeeder::class,
        ]);
    }
}
