<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categorias')->insert([
            [
                'nombre' => 'Equipos de Computación',
                'descripcion' => 'Equipos informáticos utilizados para las actividades administrativas y técnicas.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Periféricos',
                'descripcion' => 'Dispositivos periféricos para equipos de computación.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Mobiliario',
                'descripcion' => 'Mobiliario utilizado en oficinas y áreas de trabajo.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Material de Oficina',
                'descripcion' => 'Materiales y suministros utilizados en actividades administrativas.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Equipos de Red',
                'descripcion' => 'Equipos utilizados para infraestructura y conectividad de red.',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}