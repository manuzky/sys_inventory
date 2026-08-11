<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UbicacionSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ubicaciones')->insert([
            [
                'nombre' => 'Almacén Principal',
                'descripcion' => 'Almacén principal de inventario.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Oficina Administrativa',
                'descripcion' => 'Área administrativa.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Sala de Servidores',
                'descripcion' => 'Área destinada a infraestructura tecnológica.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Laboratorio de Computación',
                'descripcion' => 'Laboratorio destinado a equipos informáticos.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Depósito Secundario',
                'descripcion' => 'Área secundaria para almacenamiento.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}