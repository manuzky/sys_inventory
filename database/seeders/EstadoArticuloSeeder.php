<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadoArticuloSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('estados_articulo')->insert([
            [
                'nombre' => 'Disponible',
                'descripcion' => 'Artículo disponible para su utilización.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Asignado',
                'descripcion' => 'Artículo actualmente asignado a un usuario o área.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'En Mantenimiento',
                'descripcion' => 'Artículo que se encuentra en proceso de mantenimiento.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Dañado',
                'descripcion' => 'Artículo que presenta daños y no se encuentra disponible.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Baja',
                'descripcion' => 'Artículo retirado definitivamente del inventario.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}